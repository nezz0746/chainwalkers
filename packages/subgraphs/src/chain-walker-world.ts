import {
  BiomeRange as BiomeRangeEvent,
  EnforcedOptionSet as EnforcedOptionSetEvent,
  HelpReceived as HelpReceivedEvent,
  HelpSent as HelpSentEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PeerSet as PeerSetEvent,
  Traveled as TraveledEvent,
} from "../generated/ChainWalkerWorld/ChainWalkerWorld";
import {
  BiomeRange,
  EnforcedOptionSet,
  HelpReceived,
  HelpSent,
  OwnershipTransferred,
  PeerSet,
  Traveled,
} from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleBiomeRange(event: BiomeRangeEvent): void {
  let entity = new BiomeRange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.startIndex = event.params.startIndex;
  entity.biomes = changetype<Bytes[]>(event.params.biomes);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEnforcedOptionSet(event: EnforcedOptionSetEvent): void {
  let entity = new EnforcedOptionSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._enforcedOptions = changetype<Bytes[]>(event.params._enforcedOptions);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleHelpReceived(event: HelpReceivedEvent): void {
  let entity = new HelpReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.biomePosition = event.params.biomePosition;
  entity.newGrowthRate = event.params.newGrowthRate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleHelpSent(event: HelpSentEvent): void {
  let entity = new HelpSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.player = event.params.player;
  entity.tribe_position = event.params.tribe.position;
  entity.tribe_population = event.params.tribe.population;
  entity.tribe_timeOfLastMove = event.params.tribe.timeOfLastMove;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePeerSet(event: PeerSetEvent): void {
  let entity = new PeerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.eid = event.params.eid;
  entity.peer = event.params.peer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraveled(event: TraveledEvent): void {
  let entity = new Traveled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.player = event.params.player;
  entity.tribe_position = event.params.tribe.position;
  entity.tribe_population = event.params.tribe.population;
  entity.tribe_timeOfLastMove = event.params.tribe.timeOfLastMove;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
