// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract Population {
    function _computePopulationOverTime(
        uint256 K, // carrying capacity
        uint256 P0, // initial population
        int256 r, // growth rate per second, scaled by 1e18
        uint256 t // seconds elapsed
    ) public pure returns (uint256) {
        if (t == 0) return P0;

        // Calculate linear growth: P0 + (r * t)
        // r is scaled by 1e18, so we need to divide by 1e18
        uint256 population;

        if (r > 0) {
            // Positive growth rate
            uint256 growth = Math.mulDiv(uint256(r), t, 1e18);
            population = P0 + growth;
        } else if (r < 0) {
            // Negative growth rate (population decline)
            uint256 decline = Math.mulDiv(uint256(-r), t, 1e18);
            if (decline >= P0) {
                // Population would go to 0 or below
                population = 0;
            } else {
                population = P0 - decline;
            }
        } else {
            // r == 0, no growth
            population = P0;
        }

        // Cap at carrying capacity (only for positive growth)
        if (r > 0 && population > K) {
            return K;
        }

        return population;
    }

    function _computeMovingPopulation(
        uint256 currentPopulation,
        uint256 numberOfPositionForward
    ) public pure returns (uint256) {
        if (numberOfPositionForward == 0) {
            return currentPopulation;
        }

        // Each position forward reduces population by 20% (multiply by 0.8)
        // We use fixed-point arithmetic: 0.8 = 8/10 = 4/5
        // So we multiply by 4 and divide by 5 for each position

        uint256 newPopulation = currentPopulation;

        for (uint256 i = 0; i < numberOfPositionForward; i++) {
            // Multiply by 4/5 to reduce by 20%
            newPopulation = Math.mulDiv(newPopulation, 4, 5);
        }

        return newPopulation;
    }
}
