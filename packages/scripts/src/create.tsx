#!/usr/bin/env tsx

import { promises as fs } from "fs";
import path from "path";

type Universe = {
  length: number;
  worlds: Record<number, World>;
};

type World = {
  chainId: number;
  biomes: Biome[];
};

type Biome = {
  // lifeRate: a number between -100 and 100 which represent the rate at which a popultaion is growing per year.
  lifeRate: number;
  length: number;
};

class UniverseCreator {
  private worlds: Record<number, World> = {};
  private currentBiomeIndex = 0;

  generate(): Universe {
    const chainIds = [1, 2];
    const length = 1_000_000;

    // Reset state
    this.worlds = {};
    this.currentBiomeIndex = 0;

    // Each world gets ~100 biomes with slight variation
    const biomeCounts = [98, 100]; // Slight variation between worlds
    const maxBiomes = Math.max(...biomeCounts);

    // Pre-calculate biome lengths for each world to ensure they sum to 1,000,000
    const worldBiomeLengths: Record<number, number[]> = {};
    for (let worldIndex = 0; worldIndex < chainIds.length; worldIndex++) {
      const chainId = chainIds[worldIndex];
      worldBiomeLengths[chainId] = this.calculateBiomeLengths(
        biomeCounts[worldIndex],
        length
      );
    }

    // Generate biomes layer by layer to ensure cooperation at each level
    for (let biomeIndex = 0; biomeIndex < maxBiomes; biomeIndex++) {
      this.currentBiomeIndex = biomeIndex;

      // Create biomes for all worlds at this level
      for (let worldIndex = 0; worldIndex < chainIds.length; worldIndex++) {
        const chainId = chainIds[worldIndex];

        // Only create biome if this world should have one at this level
        if (biomeIndex < biomeCounts[worldIndex]) {
          // Initialize world if it doesn't exist
          if (!this.worlds[chainId]) {
            this.worlds[chainId] = {
              chainId,
              biomes: [],
            };
          }

          const biome = this.createBiome(
            chainId,
            worldIndex,
            biomeIndex,
            worldBiomeLengths[chainId]
          );
          this.worlds[chainId].biomes.push(biome);
        }
      }
    }

    return {
      length,
      worlds: this.worlds,
    };
  }

  private calculateBiomeLengths(
    biomeCount: number,
    totalLength: number
  ): number[] {
    const minLength = 10;

    // Create increasing relative sizes (later biomes are longer)
    const relativeSizes: number[] = [];
    for (let i = 0; i < biomeCount; i++) {
      // Exponential growth: later biomes are much longer
      const growthFactor = 1 + i / 20; // Each 20 biomes roughly doubles relative size
      const relativeSize = Math.pow(growthFactor, i / 15);
      relativeSizes.push(relativeSize);
    }

    // Calculate total of relative sizes
    const totalRelativeSize = relativeSizes.reduce(
      (sum, size) => sum + size,
      0
    );

    // Scale to actual lengths that sum to totalLength
    const actualLengths = relativeSizes.map((relativeSize) =>
      Math.floor((relativeSize / totalRelativeSize) * totalLength)
    );

    // Ensure minimum length of 10 for all biomes
    const biomesUnderMin = actualLengths.filter(
      (length) => length < minLength
    ).length;
    const totalDeficit =
      biomesUnderMin * minLength -
      actualLengths
        .filter((length) => length < minLength)
        .reduce((sum, length) => sum + length, 0);

    // Set all biomes under minimum to minimum length
    for (let i = 0; i < actualLengths.length; i++) {
      if (actualLengths[i] < minLength) {
        actualLengths[i] = minLength;
      }
    }

    // Redistribute the deficit by reducing larger biomes proportionally
    if (totalDeficit > 0) {
      const eligibleBiomes = actualLengths
        .map((length, index) => ({ length, index }))
        .filter(({ length }) => length > minLength);

      const totalEligible = eligibleBiomes.reduce(
        (sum, { length }) => sum + length,
        0
      );

      for (const { index } of eligibleBiomes) {
        const reduction = Math.floor(
          (actualLengths[index] / totalEligible) * totalDeficit
        );
        actualLengths[index] = Math.max(
          minLength,
          actualLengths[index] - reduction
        );
      }
    }

    // Final adjustment to ensure exact total
    const currentSum = actualLengths.reduce((sum, length) => sum + length, 0);
    const difference = totalLength - currentSum;

    // Apply difference to the largest biome that can accommodate it
    const largestBiomeIndex = actualLengths.reduce(
      (maxIndex, length, index) =>
        length > actualLengths[maxIndex] ? index : maxIndex,
      0
    );

    actualLengths[largestBiomeIndex] = Math.max(
      minLength,
      actualLengths[largestBiomeIndex] + difference
    );

    return actualLengths;
  }

  private createBiome(
    chainId: number,
    worldIndex: number,
    biomeIndex: number,
    biomeLengths: number[]
  ): Biome {
    const length = biomeLengths[biomeIndex];
    const lifeRate = this.calculateLifeRate(chainId, worldIndex, biomeIndex);

    return {
      lifeRate,
      length,
    };
  }

  private calculateLifeRate(
    chainId: number,
    worldIndex: number,
    biomeIndex: number
  ): number {
    // For 2 chains, ensure strict alternation of signs
    // Pattern: World 1 positive, World 2 negative, then alternate every few biomes
    const alternationPeriod = 3; // Switch signs every 3 biomes
    const cyclePosition = Math.floor(biomeIndex / alternationPeriod) % 2;

    // Determine if this world should be positive or negative
    const shouldBePositive = (worldIndex + cyclePosition) % 2 === 0;

    // Base rate values
    const basePositiveRate = 50;
    const baseNegativeRate = -40;

    let baseLifeRate = shouldBePositive ? basePositiveRate : baseNegativeRate;

    // Calculate difficulty progression (0 to 1, where 1 is maximum difficulty)
    const totalBiomes = 100;
    const difficulty = biomeIndex / totalBiomes;

    // Apply difficulty scaling
    if (baseLifeRate > 0) {
      // Positive rates: approach 0 as difficulty increases (making replenishing harder)
      // Start at base rate, end near 0
      baseLifeRate = Math.max(1, baseLifeRate * (1 - difficulty * 0.98));
    } else {
      // Negative rates: approach -100 as difficulty increases (more damaging)
      // Start at base rate, end near -100
      const maxNegative = -100;
      const progressToMax = difficulty * 0.9; // 90% of the way to -100
      baseLifeRate =
        baseLifeRate + (maxNegative - baseLifeRate) * progressToMax;
    }

    // Add some variation to prevent predictability
    const variation = Math.sin(biomeIndex * 0.5) * 5 * (1 - difficulty * 0.5);
    baseLifeRate += variation;

    // Ensure within bounds
    baseLifeRate = Math.max(-100, Math.min(100, baseLifeRate));

    // Ensure the sign is maintained (critical for alternation)
    if (shouldBePositive && baseLifeRate <= 0) {
      baseLifeRate = 1; // Force positive
    } else if (!shouldBePositive && baseLifeRate >= 0) {
      baseLifeRate = -1; // Force negative
    }

    return Math.round(baseLifeRate);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  const universeCreator = new UniverseCreator();
  const universe = universeCreator.generate();

  // Create worlds directory and write the universe file
  const worldsDir = path.join(process.cwd(), "worlds");
  await fs.mkdir(worldsDir, { recursive: true });

  const filePath = path.join(worldsDir, "universe.json");
  await fs.writeFile(filePath, JSON.stringify(universe, null, 2));

  console.log(`✅ Created universe file: ${filePath}`);
  console.log(
    `📊 Generated ${Object.keys(universe.worlds).length} worlds with strict alternating life rates`
  );

  // Verify alternation pattern for first 20 biomes
  const worlds = Object.values(universe.worlds);
  if (worlds.length >= 2) {
    console.log("🔄 Verifying alternation pattern (first 20 biomes):");
    for (let i = 0; i < Math.min(20, worlds[0].biomes.length); i++) {
      const world1Rate = worlds[0].biomes[i].lifeRate;
      const world2Rate = worlds[1].biomes[i].lifeRate;
      const isAlternating =
        (world1Rate > 0 && world2Rate < 0) ||
        (world1Rate < 0 && world2Rate > 0);
      console.log(
        `  Biome ${i + 1}: World 1: ${world1Rate > 0 ? "+" : ""}${world1Rate}%, World 2: ${world2Rate > 0 ? "+" : ""}${world2Rate}% ${isAlternating ? "✅" : "❌"}`
      );
    }
  }

  // Log summary of each world
  for (const [chainId, world] of Object.entries(universe.worlds)) {
    // Calculate total length to verify it sums to 1,000,000
    const totalLength = world.biomes.reduce(
      (sum, biome) => sum + biome.length,
      0
    );

    console.log(`🌍 World ${chainId}: ${world.biomes.length} biomes`);
    console.log(
      `  📏 Total length: ${totalLength.toLocaleString()} (should be 1,000,000)`
    );

    // Show first 5 biomes
    console.log("  📊 First 5 biomes:");
    for (let i = 0; i < Math.min(5, world.biomes.length); i++) {
      const biome = world.biomes[i];
      console.log(
        `    Biome ${i + 1}: ${biome.lifeRate > 0 ? "+" : ""}${biome.lifeRate}% (${biome.length.toLocaleString()} length)`
      );
    }

    // Show progression samples (every 20th biome)
    if (world.biomes.length > 20) {
      console.log("  🔄 Progression samples (every 20th biome):");
      for (let i = 19; i < world.biomes.length; i += 20) {
        const biome = world.biomes[i];
        console.log(
          `    Biome ${i + 1}: ${biome.lifeRate > 0 ? "+" : ""}${biome.lifeRate}% (${biome.length.toLocaleString()} length)`
        );
      }
    }

    // Show last 5 biomes
    if (world.biomes.length > 5) {
      console.log("  💀 Last 5 biomes (most challenging):");
      for (
        let i = Math.max(0, world.biomes.length - 5);
        i < world.biomes.length;
        i++
      ) {
        const biome = world.biomes[i];
        console.log(
          `    Biome ${i + 1}: ${biome.lifeRate > 0 ? "+" : ""}${biome.lifeRate}% (${biome.length.toLocaleString()} length)`
        );
      }
    }

    console.log("");
  }
}

main().catch(console.error);
