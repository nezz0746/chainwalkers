import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { BiomeRange } from "../generated/schema"
import { BiomeRange as BiomeRangeEvent } from "../generated/ChainWalkerWorld/ChainWalkerWorld"
import { handleBiomeRange } from "../src/chain-walker-world"
import { createBiomeRangeEvent } from "./chain-walker-world-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let startIndex = BigInt.fromI32(234)
    let biomes = ["ethereum.Tuple Not implemented"]
    let newBiomeRangeEvent = createBiomeRangeEvent(startIndex, biomes)
    handleBiomeRange(newBiomeRangeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("BiomeRange created and stored", () => {
    assert.entityCount("BiomeRange", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BiomeRange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startIndex",
      "234"
    )
    assert.fieldEquals(
      "BiomeRange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "biomes",
      "[ethereum.Tuple Not implemented]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
