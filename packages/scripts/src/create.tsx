#!/usr/bin/env tsx

import { promises as fs } from "fs";
import path from "path";
import { base, optimism } from "viem/chains";

type Universe = {
  length: number;
  worlds: Record<number, World>;
};

type World = {
  chainId: number;
  biomes: Biome[]; // Array of growth rates, 200 elements
};

type Biome = {
  // lifeRate: a number between -100 and 100 which represent the rate at which a popultaion is growing per year.
  growthRate: number;
};

class UniverseCreator {
  public worlds: Record<number, World> = {};

  public generateUniverse(): void {
    const chainIds = [base.id, optimism.id];
    const length = 200; // Simple 200 positions per world

    // Reset state
    this.worlds = {};

    // Generate each world with a simple array of rates
    for (let worldIndex = 0; worldIndex < chainIds.length; worldIndex++) {
      const chainId = chainIds[worldIndex];
      this.worlds[chainId] = {
        chainId,
        biomes: this.generateBiomes(length, worldIndex),
      };
    }
  }

  private generateBiomes(length: number, worldIndex: number): Biome[] {
    const biomes: Biome[] = [];
    const bufferSize = 3;
    const bufferGrowthRate = 10;

    // Add buffer biomes at the start
    for (let i = 0; i < bufferSize; i++) {
      biomes.push({ growthRate: bufferGrowthRate });
    }

    // Generate the remaining biomes with the existing logic
    for (let position = bufferSize; position < length; position++) {
      const rate = this.calculateGrowthRate(
        worldIndex,
        position - bufferSize,
        length - bufferSize
      );
      biomes.push({ growthRate: rate });
    }

    return biomes;
  }

  private calculateGrowthRate(
    worldIndex: number,
    position: number,
    totalLength: number
  ): number {
    // For 2 worlds, ensure strict alternation of signs
    // Pattern: World 0 positive, World 1 negative, then alternate every 10 positions
    const alternationPeriod = 10; // Switch signs every 10 positions
    const cyclePosition = Math.floor(position / alternationPeriod) % 2;

    // Determine if this world should be positive or negative
    const shouldBePositive = (worldIndex + cyclePosition) % 2 === 0;

    // Base rate starts moderate and becomes more extreme
    let baseGrowthRate = shouldBePositive ? 25 : -25;

    // Calculate difficulty progression (0 to 1, where 1 is maximum difficulty)
    const difficulty = position / totalLength;

    // Apply difficulty scaling
    if (baseGrowthRate > 0) {
      // Positive rates: approach 0 as difficulty increases (making growth harder)
      // Start at base rate, end near 0
      baseGrowthRate = Math.max(1, baseGrowthRate * (1 - difficulty * 0.98));
    } else {
      // Negative rates: approach -100 as difficulty increases (more damaging)
      // Start at base rate, end near -100
      const maxNegative = -100;
      const progressToMax = difficulty * 0.9; // 90% of the way to -100
      baseGrowthRate =
        baseGrowthRate + (maxNegative - baseGrowthRate) * progressToMax;
    }

    // Add some variation to prevent predictability
    const variation = Math.sin(position * 0.1) * 5 * (1 - difficulty * 0.5);
    baseGrowthRate += variation;

    // Ensure within bounds
    baseGrowthRate = Math.max(-100, Math.min(100, baseGrowthRate));

    // Ensure the sign is maintained (critical for alternation)
    if (shouldBePositive && baseGrowthRate <= 0) {
      baseGrowthRate = 1; // Force positive
    } else if (!shouldBePositive && baseGrowthRate >= 0) {
      baseGrowthRate = -1; // Force negative
    }

    return Math.round(baseGrowthRate);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  const universeCreator = new UniverseCreator();
  universeCreator.generateUniverse();

  // Create worlds directory and write the universe file
  const worldsDir = path.join(process.cwd(), "worlds");
  await fs.mkdir(worldsDir, { recursive: true });

  const universe: Universe = {
    length: 200,
    worlds: universeCreator.worlds,
  };

  const filePath = path.join(worldsDir, "universe.json");
  await fs.writeFile(filePath, JSON.stringify(universe, null, 2));

  console.log(`✅ Created universe file: ${filePath}`);
  console.log(
    `📊 Generated ${Object.keys(universe.worlds).length} worlds with 200 positions each`
  );

  // Verify alternation pattern for first 20 positions
  const worlds = Object.values(universe.worlds);
  if (worlds.length >= 2) {
    console.log("🔄 Verifying alternation pattern (first 20 positions):");
    for (let i = 0; i < Math.min(20, worlds[0].biomes.length); i++) {
      const world1Rate = worlds[0].biomes[i].growthRate;
      const world2Rate = worlds[1].biomes[i].growthRate;
      const isAlternating =
        (world1Rate > 0 && world2Rate < 0) ||
        (world1Rate < 0 && world2Rate > 0);
      console.log(
        `  Position ${i}: World 1: ${world1Rate > 0 ? "+" : ""}${world1Rate}%, World 2: ${world2Rate > 0 ? "+" : ""}${world2Rate}% ${isAlternating ? "✅" : "❌"}`
      );
    }
  }

  // Log summary of each world
  for (const [chainId, world] of Object.entries(universe.worlds)) {
    const totalLength = world.biomes.length;

    console.log(`🌍 World ${chainId}: ${world.biomes.length} positions`);
    console.log(
      `  📏 Total length: ${totalLength.toLocaleString()} (should be 200)`
    );

    // Show first 5 positions
    console.log("  📊 First 5 positions:");
    for (let i = 0; i < Math.min(5, world.biomes.length); i++) {
      const rate = world.biomes[i].growthRate;
      console.log(`    Position ${i}: ${rate > 0 ? "+" : ""}${rate}%`);
    }

    // Show progression samples (every 40th position)
    if (world.biomes.length > 40) {
      console.log("  🔄 Progression samples (every 40th position):");
      for (let i = 39; i < world.biomes.length; i += 40) {
        const rate = world.biomes[i].growthRate;
        console.log(`    Position ${i}: ${rate > 0 ? "+" : ""}${rate}%`);
      }
    }

    // Show last 5 positions
    if (world.biomes.length > 5) {
      console.log("  💀 Last 5 positions (most challenging):");
      for (
        let i = Math.max(0, world.biomes.length - 5);
        i < world.biomes.length;
        i++
      ) {
        const rate = world.biomes[i].growthRate;
        console.log(`    Position ${i}: ${rate > 0 ? "+" : ""}${rate}%`);
      }
    }

    console.log(); // Empty line between worlds
  }
}

main().catch(console.error);
