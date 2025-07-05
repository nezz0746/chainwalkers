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
  Player,
  World,
  Biome,
} from "../generated/schema";
import { Bytes, BigInt } from "@graphprotocol/graph-ts";

function getOrCreatePlayer(playerAddress: Bytes, timestamp: BigInt): Player {
  let player = Player.load(playerAddress);
  if (player == null) {
    player = new Player(playerAddress);
    player.currentPosition = BigInt.fromI32(0);
    player.currentPopulation = BigInt.fromI32(0);
    player.timeOfLastMove = BigInt.fromI32(0);
    player.totalMoves = BigInt.fromI32(0);
    player.totalHelpSent = BigInt.fromI32(0);
    player.firstSeen = timestamp;
    player.lastUpdated = timestamp;
  }
  return player as Player;
}

function getOrCreateWorld(worldAddress: Bytes): World {
  let world = World.load(worldAddress);
  if (world == null) {
    world = new World(worldAddress);
  }
  return world as World;
}

export function handleBiomeRange(event: BiomeRangeEvent): void {
  let entity = new BiomeRange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.startIndex = event.params.startIndex;
  entity.biomes = changetype<Bytes[]>(event.params.biomes);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let world = getOrCreateWorld(event.address);

  const startIndex = event.params.startIndex.toI32();

  for (let j = 0; j < event.params.biomes.length; j++) {
    let globalIndex = startIndex + j;
    let biomeId = world.id
      .toHexString()
      .concat("-")
      .concat(globalIndex.toString());
    let biome = new Biome(Bytes.fromUTF8(biomeId));
    biome.index = globalIndex;
    biome.growthRate = event.params.biomes[j].growthRate;
    biome.world = world.id;
    biome.save();
  }

  world.save();
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

  // Update PlayerEntity
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp);
  player.currentPosition = event.params.tribe.position;
  player.currentPopulation = event.params.tribe.population;
  player.timeOfLastMove = event.params.tribe.timeOfLastMove;
  player.totalHelpSent = player.totalHelpSent.plus(BigInt.fromI32(1));
  player.lastUpdated = event.block.timestamp;
  player.world = event.address;
  player.save();
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

  // Update PlayerEntity
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp);
  player.world = event.address;
  let isNewMove = player.currentPosition.lt(event.params.tribe.position);

  player.currentPosition = event.params.tribe.position;
  player.currentPopulation = event.params.tribe.population;
  player.timeOfLastMove = event.params.tribe.timeOfLastMove;
  player.lastUpdated = event.block.timestamp;

  if (isNewMove) {
    player.totalMoves = player.totalMoves.plus(BigInt.fromI32(1));
  }

  player.save();
}
