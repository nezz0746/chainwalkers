// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// MyOApp imports
import { ChainWalkerWorld, MessagingFee } from "../../contracts/ChainWalkerWorld.sol";

// OApp imports
import { IOAppOptionsType3, EnforcedOptionParam } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { OptionsBuilder } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OptionsBuilder.sol";

// OZ imports
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

// Forge imports
import "forge-std/console.sol";

// DevTools imports
import { TestHelperOz5 } from "@layerzerolabs/test-devtools-evm-foundry/contracts/TestHelperOz5.sol";
import { Population } from "../../contracts/Population.sol";

contract PopulationMock is Population {
    function computePopulationOverTime(uint256 K, uint256 P0, int256 r, uint256 t) public pure returns (uint256) {
        return _computePopulationOverTime(K, P0, r, t);
    }

    function computeMovingPopulation(
        uint256 currentPopulation,
        uint256 numberOfPositionForward
    ) public pure returns (uint256) {
        return _computeMovingPopulation(currentPopulation, numberOfPositionForward);
    }
}

contract MyOAppTest is TestHelperOz5 {
    using OptionsBuilder for bytes;

    uint32 private aEid = 1;
    uint32 private bEid = 2;

    ChainWalkerWorld private aOApp;
    ChainWalkerWorld private bOApp;

    address private userA = address(0x1);
    address private userB = address(0x2);
    uint256 private initialBalance = 100 ether;

    PopulationMock private population;

    function setUp() public virtual override {
        vm.deal(userA, 1000 ether);
        vm.deal(userB, 1000 ether);

        super.setUp();
        setUpEndpoints(2, LibraryType.UltraLightNode);

        aOApp = ChainWalkerWorld(
            _deployOApp(type(ChainWalkerWorld).creationCode, abi.encode(address(endpoints[aEid]), address(this)))
        );

        bOApp = ChainWalkerWorld(
            _deployOApp(type(ChainWalkerWorld).creationCode, abi.encode(address(endpoints[bEid]), address(this)))
        );

        address[] memory oapps = new address[](2);
        oapps[0] = address(aOApp);
        oapps[1] = address(bOApp);
        this.wireOApps(oapps);

        // Initialize the Population contract
        population = new PopulationMock();
    }

    function test_constructor() public {
        assertEq(aOApp.owner(), address(this));
        assertEq(bOApp.owner(), address(this));

        assertEq(address(aOApp.endpoint()), address(endpoints[aEid]));
        assertEq(address(bOApp.endpoint()), address(endpoints[bEid]));
    }

    function testLinearPopulation() public {
        uint256 K = 100_000;
        int256 r = int256(50 * 1e18); // Cast to int256

        uint256 currentPopulation = population.computePopulationOverTime(K, 100, r, 0);
        console.log("populationTotal", currentPopulation);

        for (uint256 i = 1; i <= 10; i++) {
            vm.warp(block.timestamp + 1 minutes);
            currentPopulation = population.computePopulationOverTime(K, currentPopulation, r, 1 minutes);
            console.log("population after", i, "minutes", currentPopulation);
        }
    }

    function testLinearPopulationDecline() public {
        uint256 K = 100_000;
        int256 r = int256(-50 * 1e18); // Cast to int256

        uint256 currentPopulation = population.computePopulationOverTime(K, 100_000, r, 0);
        console.log("populationTotal", currentPopulation);

        for (uint256 i = 1; i <= 10; i++) {
            vm.warp(block.timestamp + 1 minutes);
            currentPopulation = population.computePopulationOverTime(K, currentPopulation, r, 1 minutes);
            console.log("population after", i, "minutes", currentPopulation);
        }
    }

    function testComputePopulationAfterMove() public {
        console.log("=== Testing Population Decrease by 20% per Position ===");

        uint256 initialPopulation = 1000;
        console.log("Initial Population:", initialPopulation);
        console.log("");

        // Test moving 0 positions (should stay the same)
        uint256 pop0 = population.computeMovingPopulation(initialPopulation, 0);
        console.log("0 positions forward: Population =", pop0);
        assertEq(pop0, initialPopulation, "Population should remain the same with 0 moves");

        // Test moving 1-10 positions forward
        for (uint256 i = 1; i <= 10; i++) {
            uint256 newPop = population.computeMovingPopulation(initialPopulation, i);
            console.log(i, "positions forward: Population =", newPop);

            // Verify population decreases with each move
            if (i > 1) {
                uint256 prevPop = population.computeMovingPopulation(initialPopulation, i - 1);
                assertTrue(newPop < prevPop, "Population should decrease with more moves");
            }
        }

        console.log("");
        console.log("=== Testing with Different Starting Populations ===");

        uint256[] memory testPops = new uint256[](4);
        testPops[0] = 100;
        testPops[1] = 5000;
        testPops[2] = 50000;
        testPops[3] = 1000000;

        for (uint256 j = 0; j < testPops.length; j++) {
            uint256 startPop = testPops[j];
            uint256 after1 = population.computeMovingPopulation(startPop, 1);
            uint256 after3 = population.computeMovingPopulation(startPop, 3);
            uint256 after5 = population.computeMovingPopulation(startPop, 5);

            console.log("Starting with", startPop, ":");
            console.log("  After 1 move:", after1);
            console.log("  After 3 moves:", after3);
            console.log("  After 5 moves:", after5);
            console.log("  Reduction %:", ((startPop - after5) * 100) / startPop);
            console.log("---");
        }

        // Test edge case: very small population
        uint256 smallPop = population.computeMovingPopulation(5, 10);
        console.log("Starting with 5, after 10 moves:", smallPop);
        assertTrue(smallPop < 5, "Small population should also decrease");
    }

    function testMovementOverTimeWithPopulationDecrease() public {
        console.log("=== Testing Movement Over Time with Population Decrease ===");

        uint256 initialPopulation = 10000;
        uint256 currentPopulation = initialPopulation;

        console.log("Starting Population:", initialPopulation);
        console.log("Each move reduces population by 20%");
        console.log("");

        // Set initial time
        uint256 startTime = 1000000;
        vm.warp(startTime);

        // Simulate moving forward every hour for 10 hours
        for (uint256 hour = 1; hour <= 10; hour++) {
            // Warp time forward by 1 hour
            vm.warp(startTime + (hour * 1 hours));

            // Simulate moving 1 position forward (20% population decrease)
            currentPopulation = population.computeMovingPopulation(currentPopulation, 1);

            console.log("Hour", hour, "- Time:", block.timestamp);
            console.log("  Population after move:", currentPopulation);
            console.log("  Population loss:", initialPopulation - currentPopulation);
            console.log("  Total reduction %:", ((initialPopulation - currentPopulation) * 100) / initialPopulation);
            console.log("---");

            // Verify population keeps decreasing
            assertTrue(currentPopulation < initialPopulation, "Population should decrease over time");
        }

        console.log("Final population:", currentPopulation);
        console.log("Total journey: 10 moves over 10 hours");

        // Verify this matches direct calculation
        uint256 directCalculation = population.computeMovingPopulation(initialPopulation, 10);
        assertEq(currentPopulation, directCalculation, "Step-by-step should match direct calculation");
    }
}
