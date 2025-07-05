import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  BiomeRange,
  EnforcedOptionSet,
  HelpReceived,
  HelpSent,
  OwnershipTransferred,
  PeerSet,
  Traveled
} from "../generated/ChainWalkerWorld/ChainWalkerWorld"

export function createBiomeRangeEvent(
  startIndex: BigInt,
  biomes: Array<ethereum.Tuple>
): BiomeRange {
  let biomeRangeEvent = changetype<BiomeRange>(newMockEvent())

  biomeRangeEvent.parameters = new Array()

  biomeRangeEvent.parameters.push(
    new ethereum.EventParam(
      "startIndex",
      ethereum.Value.fromUnsignedBigInt(startIndex)
    )
  )
  biomeRangeEvent.parameters.push(
    new ethereum.EventParam("biomes", ethereum.Value.fromTupleArray(biomes))
  )

  return biomeRangeEvent
}

export function createEnforcedOptionSetEvent(
  _enforcedOptions: Array<ethereum.Tuple>
): EnforcedOptionSet {
  let enforcedOptionSetEvent = changetype<EnforcedOptionSet>(newMockEvent())

  enforcedOptionSetEvent.parameters = new Array()

  enforcedOptionSetEvent.parameters.push(
    new ethereum.EventParam(
      "_enforcedOptions",
      ethereum.Value.fromTupleArray(_enforcedOptions)
    )
  )

  return enforcedOptionSetEvent
}

export function createHelpReceivedEvent(
  biomePosition: BigInt,
  newGrowthRate: i32
): HelpReceived {
  let helpReceivedEvent = changetype<HelpReceived>(newMockEvent())

  helpReceivedEvent.parameters = new Array()

  helpReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "biomePosition",
      ethereum.Value.fromUnsignedBigInt(biomePosition)
    )
  )
  helpReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "newGrowthRate",
      ethereum.Value.fromI32(newGrowthRate)
    )
  )

  return helpReceivedEvent
}

export function createHelpSentEvent(
  player: Address,
  tribe: ethereum.Tuple
): HelpSent {
  let helpSentEvent = changetype<HelpSent>(newMockEvent())

  helpSentEvent.parameters = new Array()

  helpSentEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  helpSentEvent.parameters.push(
    new ethereum.EventParam("tribe", ethereum.Value.fromTuple(tribe))
  )

  return helpSentEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPeerSetEvent(eid: BigInt, peer: Bytes): PeerSet {
  let peerSetEvent = changetype<PeerSet>(newMockEvent())

  peerSetEvent.parameters = new Array()

  peerSetEvent.parameters.push(
    new ethereum.EventParam("eid", ethereum.Value.fromUnsignedBigInt(eid))
  )
  peerSetEvent.parameters.push(
    new ethereum.EventParam("peer", ethereum.Value.fromFixedBytes(peer))
  )

  return peerSetEvent
}

export function createTraveledEvent(
  player: Address,
  tribe: ethereum.Tuple
): Traveled {
  let traveledEvent = changetype<Traveled>(newMockEvent())

  traveledEvent.parameters = new Array()

  traveledEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  traveledEvent.parameters.push(
    new ethereum.EventParam("tribe", ethereum.Value.fromTuple(tribe))
  )

  return traveledEvent
}
