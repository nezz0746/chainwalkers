import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type Biome = {
  __typename?: 'Biome';
  growthRate: Scalars['Int']['output'];
  id: Scalars['Bytes']['output'];
  index: Scalars['Int']['output'];
  world: World;
};

export type BiomeRange = {
  __typename?: 'BiomeRange';
  biomes: Array<Scalars['Bytes']['output']>;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  startIndex: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type BiomeRange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BiomeRange_Filter>>>;
  biomes?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  biomes_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  biomes_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  biomes_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  biomes_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  biomes_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BiomeRange_Filter>>>;
  startIndex?: InputMaybe<Scalars['BigInt']['input']>;
  startIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  startIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum BiomeRange_OrderBy {
  Biomes = 'biomes',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  StartIndex = 'startIndex',
  TransactionHash = 'transactionHash'
}

export type Biome_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Biome_Filter>>>;
  growthRate?: InputMaybe<Scalars['Int']['input']>;
  growthRate_gt?: InputMaybe<Scalars['Int']['input']>;
  growthRate_gte?: InputMaybe<Scalars['Int']['input']>;
  growthRate_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  growthRate_lt?: InputMaybe<Scalars['Int']['input']>;
  growthRate_lte?: InputMaybe<Scalars['Int']['input']>;
  growthRate_not?: InputMaybe<Scalars['Int']['input']>;
  growthRate_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  index?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Biome_Filter>>>;
  world?: InputMaybe<Scalars['String']['input']>;
  world_?: InputMaybe<World_Filter>;
  world_contains?: InputMaybe<Scalars['String']['input']>;
  world_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  world_ends_with?: InputMaybe<Scalars['String']['input']>;
  world_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  world_gt?: InputMaybe<Scalars['String']['input']>;
  world_gte?: InputMaybe<Scalars['String']['input']>;
  world_in?: InputMaybe<Array<Scalars['String']['input']>>;
  world_lt?: InputMaybe<Scalars['String']['input']>;
  world_lte?: InputMaybe<Scalars['String']['input']>;
  world_not?: InputMaybe<Scalars['String']['input']>;
  world_not_contains?: InputMaybe<Scalars['String']['input']>;
  world_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  world_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  world_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  world_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  world_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  world_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  world_starts_with?: InputMaybe<Scalars['String']['input']>;
  world_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Biome_OrderBy {
  GrowthRate = 'growthRate',
  Id = 'id',
  Index = 'index',
  World = 'world',
  WorldId = 'world__id'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type EnforcedOptionSet = {
  __typename?: 'EnforcedOptionSet';
  _enforcedOptions: Array<Scalars['Bytes']['output']>;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type EnforcedOptionSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  _enforcedOptions?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _enforcedOptions_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _enforcedOptions_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _enforcedOptions_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _enforcedOptions_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _enforcedOptions_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<EnforcedOptionSet_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<EnforcedOptionSet_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum EnforcedOptionSet_OrderBy {
  EnforcedOptions = '_enforcedOptions',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash'
}

export type HelpReceived = {
  __typename?: 'HelpReceived';
  biomePosition: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newGrowthRate: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type HelpReceived_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HelpReceived_Filter>>>;
  biomePosition?: InputMaybe<Scalars['BigInt']['input']>;
  biomePosition_gt?: InputMaybe<Scalars['BigInt']['input']>;
  biomePosition_gte?: InputMaybe<Scalars['BigInt']['input']>;
  biomePosition_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  biomePosition_lt?: InputMaybe<Scalars['BigInt']['input']>;
  biomePosition_lte?: InputMaybe<Scalars['BigInt']['input']>;
  biomePosition_not?: InputMaybe<Scalars['BigInt']['input']>;
  biomePosition_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newGrowthRate?: InputMaybe<Scalars['Int']['input']>;
  newGrowthRate_gt?: InputMaybe<Scalars['Int']['input']>;
  newGrowthRate_gte?: InputMaybe<Scalars['Int']['input']>;
  newGrowthRate_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  newGrowthRate_lt?: InputMaybe<Scalars['Int']['input']>;
  newGrowthRate_lte?: InputMaybe<Scalars['Int']['input']>;
  newGrowthRate_not?: InputMaybe<Scalars['Int']['input']>;
  newGrowthRate_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<HelpReceived_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum HelpReceived_OrderBy {
  BiomePosition = 'biomePosition',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewGrowthRate = 'newGrowthRate',
  TransactionHash = 'transactionHash'
}

export type HelpSent = {
  __typename?: 'HelpSent';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  player: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  tribe_population: Scalars['BigInt']['output'];
  tribe_position: Scalars['BigInt']['output'];
  tribe_timeOfLastMove: Scalars['BigInt']['output'];
};

export type HelpSent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HelpSent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<HelpSent_Filter>>>;
  player?: InputMaybe<Scalars['Bytes']['input']>;
  player_contains?: InputMaybe<Scalars['Bytes']['input']>;
  player_gt?: InputMaybe<Scalars['Bytes']['input']>;
  player_gte?: InputMaybe<Scalars['Bytes']['input']>;
  player_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  player_lt?: InputMaybe<Scalars['Bytes']['input']>;
  player_lte?: InputMaybe<Scalars['Bytes']['input']>;
  player_not?: InputMaybe<Scalars['Bytes']['input']>;
  player_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  player_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tribe_population?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_population_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_not?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_position?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_not?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_timeOfLastMove?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_timeOfLastMove_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_not?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum HelpSent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Player = 'player',
  TransactionHash = 'transactionHash',
  TribePopulation = 'tribe_population',
  TribePosition = 'tribe_position',
  TribeTimeOfLastMove = 'tribe_timeOfLastMove'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OwnershipTransferred = {
  __typename?: 'OwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type OwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_Filter>>>;
  previousOwner?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum OwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash'
}

export type PeerSet = {
  __typename?: 'PeerSet';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  eid: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  peer: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PeerSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PeerSet_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eid?: InputMaybe<Scalars['BigInt']['input']>;
  eid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eid_not?: InputMaybe<Scalars['BigInt']['input']>;
  eid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PeerSet_Filter>>>;
  peer?: InputMaybe<Scalars['Bytes']['input']>;
  peer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  peer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  peer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  peer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  peer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  peer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  peer_not?: InputMaybe<Scalars['Bytes']['input']>;
  peer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  peer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum PeerSet_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Eid = 'eid',
  Id = 'id',
  Peer = 'peer',
  TransactionHash = 'transactionHash'
}

export type Player = {
  __typename?: 'Player';
  currentPopulation: Scalars['BigInt']['output'];
  currentPosition: Scalars['BigInt']['output'];
  firstSeen: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  lastUpdated: Scalars['BigInt']['output'];
  timeOfLastMove: Scalars['BigInt']['output'];
  totalHelpSent: Scalars['BigInt']['output'];
  totalMoves: Scalars['BigInt']['output'];
  world: World;
};

export type Player_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Player_Filter>>>;
  currentPopulation?: InputMaybe<Scalars['BigInt']['input']>;
  currentPopulation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentPopulation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentPopulation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentPopulation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentPopulation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentPopulation_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentPopulation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentPosition?: InputMaybe<Scalars['BigInt']['input']>;
  currentPosition_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentPosition_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentPosition_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentPosition_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentPosition_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentPosition_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentPosition_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstSeen?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeen_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeen_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeen_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstSeen_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeen_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeen_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeen_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Player_Filter>>>;
  timeOfLastMove?: InputMaybe<Scalars['BigInt']['input']>;
  timeOfLastMove_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timeOfLastMove_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timeOfLastMove_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeOfLastMove_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timeOfLastMove_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timeOfLastMove_not?: InputMaybe<Scalars['BigInt']['input']>;
  timeOfLastMove_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHelpSent?: InputMaybe<Scalars['BigInt']['input']>;
  totalHelpSent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHelpSent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHelpSent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHelpSent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHelpSent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHelpSent_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalHelpSent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMoves?: InputMaybe<Scalars['BigInt']['input']>;
  totalMoves_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMoves_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMoves_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMoves_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMoves_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMoves_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalMoves_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  world?: InputMaybe<Scalars['String']['input']>;
  world_?: InputMaybe<World_Filter>;
  world_contains?: InputMaybe<Scalars['String']['input']>;
  world_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  world_ends_with?: InputMaybe<Scalars['String']['input']>;
  world_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  world_gt?: InputMaybe<Scalars['String']['input']>;
  world_gte?: InputMaybe<Scalars['String']['input']>;
  world_in?: InputMaybe<Array<Scalars['String']['input']>>;
  world_lt?: InputMaybe<Scalars['String']['input']>;
  world_lte?: InputMaybe<Scalars['String']['input']>;
  world_not?: InputMaybe<Scalars['String']['input']>;
  world_not_contains?: InputMaybe<Scalars['String']['input']>;
  world_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  world_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  world_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  world_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  world_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  world_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  world_starts_with?: InputMaybe<Scalars['String']['input']>;
  world_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Player_OrderBy {
  CurrentPopulation = 'currentPopulation',
  CurrentPosition = 'currentPosition',
  FirstSeen = 'firstSeen',
  Id = 'id',
  LastUpdated = 'lastUpdated',
  TimeOfLastMove = 'timeOfLastMove',
  TotalHelpSent = 'totalHelpSent',
  TotalMoves = 'totalMoves',
  World = 'world',
  WorldId = 'world__id'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  biome?: Maybe<Biome>;
  biomeRange?: Maybe<BiomeRange>;
  biomeRanges: Array<BiomeRange>;
  biomes: Array<Biome>;
  enforcedOptionSet?: Maybe<EnforcedOptionSet>;
  enforcedOptionSets: Array<EnforcedOptionSet>;
  helpReceived?: Maybe<HelpReceived>;
  helpReceiveds: Array<HelpReceived>;
  helpSent?: Maybe<HelpSent>;
  helpSents: Array<HelpSent>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  peerSet?: Maybe<PeerSet>;
  peerSets: Array<PeerSet>;
  player?: Maybe<Player>;
  players: Array<Player>;
  traveled?: Maybe<Traveled>;
  traveleds: Array<Traveled>;
  world?: Maybe<World>;
  worlds: Array<World>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBiomeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBiomeRangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBiomeRangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BiomeRange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BiomeRange_Filter>;
};


export type QueryBiomesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Biome_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Biome_Filter>;
};


export type QueryEnforcedOptionSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEnforcedOptionSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EnforcedOptionSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnforcedOptionSet_Filter>;
};


export type QueryHelpReceivedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHelpReceivedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HelpReceived_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HelpReceived_Filter>;
};


export type QueryHelpSentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHelpSentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HelpSent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HelpSent_Filter>;
};


export type QueryOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferred_Filter>;
};


export type QueryPeerSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPeerSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PeerSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PeerSet_Filter>;
};


export type QueryPlayerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPlayersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Player_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Player_Filter>;
};


export type QueryTraveledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTraveledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Traveled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Traveled_Filter>;
};


export type QueryWorldArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWorldsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<World_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<World_Filter>;
};

export type Traveled = {
  __typename?: 'Traveled';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  player: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  tribe_population: Scalars['BigInt']['output'];
  tribe_position: Scalars['BigInt']['output'];
  tribe_timeOfLastMove: Scalars['BigInt']['output'];
};

export type Traveled_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Traveled_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Traveled_Filter>>>;
  player?: InputMaybe<Scalars['Bytes']['input']>;
  player_contains?: InputMaybe<Scalars['Bytes']['input']>;
  player_gt?: InputMaybe<Scalars['Bytes']['input']>;
  player_gte?: InputMaybe<Scalars['Bytes']['input']>;
  player_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  player_lt?: InputMaybe<Scalars['Bytes']['input']>;
  player_lte?: InputMaybe<Scalars['Bytes']['input']>;
  player_not?: InputMaybe<Scalars['Bytes']['input']>;
  player_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  player_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tribe_population?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_population_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_not?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_population_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_position?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_not?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_timeOfLastMove?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tribe_timeOfLastMove_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_not?: InputMaybe<Scalars['BigInt']['input']>;
  tribe_timeOfLastMove_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Traveled_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Player = 'player',
  TransactionHash = 'transactionHash',
  TribePopulation = 'tribe_population',
  TribePosition = 'tribe_position',
  TribeTimeOfLastMove = 'tribe_timeOfLastMove'
}

export type World = {
  __typename?: 'World';
  biomes: Array<Biome>;
  id: Scalars['Bytes']['output'];
  players: Array<Player>;
};


export type WorldBiomesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Biome_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Biome_Filter>;
};


export type WorldPlayersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Player_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Player_Filter>;
};

export type World_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<World_Filter>>>;
  biomes_?: InputMaybe<Biome_Filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<World_Filter>>>;
  players_?: InputMaybe<Player_Filter>;
};

export enum World_OrderBy {
  Biomes = 'biomes',
  Id = 'id',
  Players = 'players'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type BiomeRangeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type BiomeRangeQuery = { __typename?: 'Query', biomeRange?: { __typename?: 'BiomeRange', id: any, startIndex: any, biomes: Array<any>, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type BiomeRangesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BiomeRange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BiomeRange_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type BiomeRangesQuery = { __typename?: 'Query', biomeRanges: Array<{ __typename?: 'BiomeRange', id: any, startIndex: any, biomes: Array<any>, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type EnforcedOptionSetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type EnforcedOptionSetQuery = { __typename?: 'Query', enforcedOptionSet?: { __typename?: 'EnforcedOptionSet', id: any, _enforcedOptions: Array<any>, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type EnforcedOptionSetsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EnforcedOptionSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EnforcedOptionSet_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type EnforcedOptionSetsQuery = { __typename?: 'Query', enforcedOptionSets: Array<{ __typename?: 'EnforcedOptionSet', id: any, _enforcedOptions: Array<any>, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type HelpReceivedQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type HelpReceivedQuery = { __typename?: 'Query', helpReceived?: { __typename?: 'HelpReceived', id: any, biomePosition: any, newGrowthRate: number, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type HelpReceivedsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HelpReceived_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HelpReceived_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type HelpReceivedsQuery = { __typename?: 'Query', helpReceiveds: Array<{ __typename?: 'HelpReceived', id: any, biomePosition: any, newGrowthRate: number, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type HelpSentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type HelpSentQuery = { __typename?: 'Query', helpSent?: { __typename?: 'HelpSent', id: any, player: any, tribe_position: any, tribe_population: any, tribe_timeOfLastMove: any, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type HelpSentsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HelpSent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HelpSent_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type HelpSentsQuery = { __typename?: 'Query', helpSents: Array<{ __typename?: 'HelpSent', id: any, player: any, tribe_position: any, tribe_population: any, tribe_timeOfLastMove: any, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type OwnershipTransferredQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type OwnershipTransferredQuery = { __typename?: 'Query', ownershipTransferred?: { __typename?: 'OwnershipTransferred', id: any, previousOwner: any, newOwner: any, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type OwnershipTransferredsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type OwnershipTransferredsQuery = { __typename?: 'Query', ownershipTransferreds: Array<{ __typename?: 'OwnershipTransferred', id: any, previousOwner: any, newOwner: any, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type PeerSetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type PeerSetQuery = { __typename?: 'Query', peerSet?: { __typename?: 'PeerSet', id: any, eid: any, peer: any, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type PeerSetsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PeerSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PeerSet_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type PeerSetsQuery = { __typename?: 'Query', peerSets: Array<{ __typename?: 'PeerSet', id: any, eid: any, peer: any, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type TraveledQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type TraveledQuery = { __typename?: 'Query', traveled?: { __typename?: 'Traveled', id: any, player: any, tribe_position: any, tribe_population: any, tribe_timeOfLastMove: any, blockNumber: any, blockTimestamp: any, transactionHash: any } | null };

export type TraveledsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Traveled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Traveled_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
}>;


export type TraveledsQuery = { __typename?: 'Query', traveleds: Array<{ __typename?: 'Traveled', id: any, player: any, tribe_position: any, tribe_population: any, tribe_timeOfLastMove: any, blockNumber: any, blockTimestamp: any, transactionHash: any }> };

export type PlayerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
  player_world_world_biomes_skip?: InputMaybe<Scalars['Int']['input']>;
  player_world_world_biomes_first?: InputMaybe<Scalars['Int']['input']>;
  player_world_world_biomes_orderBy?: InputMaybe<Biome_OrderBy>;
  player_world_world_biomes_orderDirection?: InputMaybe<OrderDirection>;
  player_world_world_biomes_where?: InputMaybe<Biome_Filter>;
}>;


export type PlayerQuery = { __typename?: 'Query', player?: { __typename?: 'Player', id: any, currentPosition: any, currentPopulation: any, timeOfLastMove: any, totalMoves: any, totalHelpSent: any, firstSeen: any, lastUpdated: any, world: { __typename?: 'World', id: any, biomes: Array<{ __typename?: 'Biome', id: any, index: number, growthRate: number }> } } | null };

export type PlayersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Player_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Player_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
  players_world_world_biomes_skip?: InputMaybe<Scalars['Int']['input']>;
  players_world_world_biomes_first?: InputMaybe<Scalars['Int']['input']>;
  players_world_world_biomes_orderBy?: InputMaybe<Biome_OrderBy>;
  players_world_world_biomes_orderDirection?: InputMaybe<OrderDirection>;
  players_world_world_biomes_where?: InputMaybe<Biome_Filter>;
}>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: any, currentPosition: any, currentPopulation: any, timeOfLastMove: any, totalMoves: any, totalHelpSent: any, firstSeen: any, lastUpdated: any, world: { __typename?: 'World', id: any, biomes: Array<{ __typename?: 'Biome', id: any, index: number, growthRate: number }> } }> };

export type WorldQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
  world_biomes_skip?: InputMaybe<Scalars['Int']['input']>;
  world_biomes_first?: InputMaybe<Scalars['Int']['input']>;
  world_biomes_orderBy?: InputMaybe<Biome_OrderBy>;
  world_biomes_orderDirection?: InputMaybe<OrderDirection>;
  world_biomes_where?: InputMaybe<Biome_Filter>;
  world_players_skip?: InputMaybe<Scalars['Int']['input']>;
  world_players_first?: InputMaybe<Scalars['Int']['input']>;
  world_players_orderBy?: InputMaybe<Player_OrderBy>;
  world_players_orderDirection?: InputMaybe<OrderDirection>;
  world_players_where?: InputMaybe<Player_Filter>;
}>;


export type WorldQuery = { __typename?: 'Query', world?: { __typename?: 'World', id: any, biomes: Array<{ __typename?: 'Biome', id: any, index: number, growthRate: number }>, players: Array<{ __typename?: 'Player', id: any, currentPosition: any, currentPopulation: any, timeOfLastMove: any, totalMoves: any, totalHelpSent: any, firstSeen: any, lastUpdated: any }> } | null };

export type WorldsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<World_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<World_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
  worlds_biomes_skip?: InputMaybe<Scalars['Int']['input']>;
  worlds_biomes_first?: InputMaybe<Scalars['Int']['input']>;
  worlds_biomes_orderBy?: InputMaybe<Biome_OrderBy>;
  worlds_biomes_orderDirection?: InputMaybe<OrderDirection>;
  worlds_biomes_where?: InputMaybe<Biome_Filter>;
  worlds_players_skip?: InputMaybe<Scalars['Int']['input']>;
  worlds_players_first?: InputMaybe<Scalars['Int']['input']>;
  worlds_players_orderBy?: InputMaybe<Player_OrderBy>;
  worlds_players_orderDirection?: InputMaybe<OrderDirection>;
  worlds_players_where?: InputMaybe<Player_Filter>;
}>;


export type WorldsQuery = { __typename?: 'Query', worlds: Array<{ __typename?: 'World', id: any, biomes: Array<{ __typename?: 'Biome', id: any, index: number, growthRate: number }>, players: Array<{ __typename?: 'Player', id: any, currentPosition: any, currentPopulation: any, timeOfLastMove: any, totalMoves: any, totalHelpSent: any, firstSeen: any, lastUpdated: any }> }> };

export type BiomeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
  biome_world_world_players_skip?: InputMaybe<Scalars['Int']['input']>;
  biome_world_world_players_first?: InputMaybe<Scalars['Int']['input']>;
  biome_world_world_players_orderBy?: InputMaybe<Player_OrderBy>;
  biome_world_world_players_orderDirection?: InputMaybe<OrderDirection>;
  biome_world_world_players_where?: InputMaybe<Player_Filter>;
}>;


export type BiomeQuery = { __typename?: 'Query', biome?: { __typename?: 'Biome', id: any, index: number, growthRate: number, world: { __typename?: 'World', id: any, players: Array<{ __typename?: 'Player', id: any, currentPosition: any, currentPopulation: any, timeOfLastMove: any, totalMoves: any, totalHelpSent: any, firstSeen: any, lastUpdated: any }> } } | null };

export type BiomesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Biome_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Biome_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError: _SubgraphErrorPolicy_;
  biomes_world_world_players_skip?: InputMaybe<Scalars['Int']['input']>;
  biomes_world_world_players_first?: InputMaybe<Scalars['Int']['input']>;
  biomes_world_world_players_orderBy?: InputMaybe<Player_OrderBy>;
  biomes_world_world_players_orderDirection?: InputMaybe<OrderDirection>;
  biomes_world_world_players_where?: InputMaybe<Player_Filter>;
}>;


export type BiomesQuery = { __typename?: 'Query', biomes: Array<{ __typename?: 'Biome', id: any, index: number, growthRate: number, world: { __typename?: 'World', id: any, players: Array<{ __typename?: 'Player', id: any, currentPosition: any, currentPopulation: any, timeOfLastMove: any, totalMoves: any, totalHelpSent: any, firstSeen: any, lastUpdated: any }> } }> };


export const BiomeRangeDocument = gql`
    query biomeRange($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  biomeRange(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    startIndex
    biomes
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const BiomeRangesDocument = gql`
    query biomeRanges($skip: Int, $first: Int, $orderBy: BiomeRange_orderBy, $orderDirection: OrderDirection, $where: BiomeRange_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  biomeRanges(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    startIndex
    biomes
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const EnforcedOptionSetDocument = gql`
    query enforcedOptionSet($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  enforcedOptionSet(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    _enforcedOptions
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const EnforcedOptionSetsDocument = gql`
    query enforcedOptionSets($skip: Int, $first: Int, $orderBy: EnforcedOptionSet_orderBy, $orderDirection: OrderDirection, $where: EnforcedOptionSet_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  enforcedOptionSets(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    _enforcedOptions
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const HelpReceivedDocument = gql`
    query helpReceived($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  helpReceived(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    biomePosition
    newGrowthRate
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const HelpReceivedsDocument = gql`
    query helpReceiveds($skip: Int, $first: Int, $orderBy: HelpReceived_orderBy, $orderDirection: OrderDirection, $where: HelpReceived_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  helpReceiveds(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    biomePosition
    newGrowthRate
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const HelpSentDocument = gql`
    query helpSent($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  helpSent(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    player
    tribe_position
    tribe_population
    tribe_timeOfLastMove
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const HelpSentsDocument = gql`
    query helpSents($skip: Int, $first: Int, $orderBy: HelpSent_orderBy, $orderDirection: OrderDirection, $where: HelpSent_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  helpSents(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    player
    tribe_position
    tribe_population
    tribe_timeOfLastMove
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const OwnershipTransferredDocument = gql`
    query ownershipTransferred($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  ownershipTransferred(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    previousOwner
    newOwner
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const OwnershipTransferredsDocument = gql`
    query ownershipTransferreds($skip: Int, $first: Int, $orderBy: OwnershipTransferred_orderBy, $orderDirection: OrderDirection, $where: OwnershipTransferred_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  ownershipTransferreds(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    previousOwner
    newOwner
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const PeerSetDocument = gql`
    query peerSet($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  peerSet(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    eid
    peer
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const PeerSetsDocument = gql`
    query peerSets($skip: Int, $first: Int, $orderBy: PeerSet_orderBy, $orderDirection: OrderDirection, $where: PeerSet_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  peerSets(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    eid
    peer
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const TraveledDocument = gql`
    query traveled($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  traveled(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    player
    tribe_position
    tribe_population
    tribe_timeOfLastMove
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const TraveledsDocument = gql`
    query traveleds($skip: Int, $first: Int, $orderBy: Traveled_orderBy, $orderDirection: OrderDirection, $where: Traveled_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!) {
  traveleds(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    player
    tribe_position
    tribe_population
    tribe_timeOfLastMove
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    `;
export const PlayerDocument = gql`
    query player($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!, $player_world_world_biomes_skip: Int, $player_world_world_biomes_first: Int, $player_world_world_biomes_orderBy: Biome_orderBy, $player_world_world_biomes_orderDirection: OrderDirection, $player_world_world_biomes_where: Biome_filter) {
  player(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    currentPosition
    currentPopulation
    timeOfLastMove
    totalMoves
    totalHelpSent
    firstSeen
    lastUpdated
    world {
      id
      biomes(
        skip: $player_world_world_biomes_skip
        first: $player_world_world_biomes_first
        orderBy: $player_world_world_biomes_orderBy
        orderDirection: $player_world_world_biomes_orderDirection
        where: $player_world_world_biomes_where
      ) {
        id
        index
        growthRate
      }
    }
  }
}
    `;
export const PlayersDocument = gql`
    query players($skip: Int, $first: Int, $orderBy: Player_orderBy, $orderDirection: OrderDirection, $where: Player_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!, $players_world_world_biomes_skip: Int, $players_world_world_biomes_first: Int, $players_world_world_biomes_orderBy: Biome_orderBy, $players_world_world_biomes_orderDirection: OrderDirection, $players_world_world_biomes_where: Biome_filter) {
  players(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    currentPosition
    currentPopulation
    timeOfLastMove
    totalMoves
    totalHelpSent
    firstSeen
    lastUpdated
    world {
      id
      biomes(
        skip: $players_world_world_biomes_skip
        first: $players_world_world_biomes_first
        orderBy: $players_world_world_biomes_orderBy
        orderDirection: $players_world_world_biomes_orderDirection
        where: $players_world_world_biomes_where
      ) {
        id
        index
        growthRate
      }
    }
  }
}
    `;
export const WorldDocument = gql`
    query world($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!, $world_biomes_skip: Int, $world_biomes_first: Int, $world_biomes_orderBy: Biome_orderBy, $world_biomes_orderDirection: OrderDirection, $world_biomes_where: Biome_filter, $world_players_skip: Int, $world_players_first: Int, $world_players_orderBy: Player_orderBy, $world_players_orderDirection: OrderDirection, $world_players_where: Player_filter) {
  world(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    biomes(
      skip: $world_biomes_skip
      first: $world_biomes_first
      orderBy: $world_biomes_orderBy
      orderDirection: $world_biomes_orderDirection
      where: $world_biomes_where
    ) {
      id
      index
      growthRate
    }
    players(
      skip: $world_players_skip
      first: $world_players_first
      orderBy: $world_players_orderBy
      orderDirection: $world_players_orderDirection
      where: $world_players_where
    ) {
      id
      currentPosition
      currentPopulation
      timeOfLastMove
      totalMoves
      totalHelpSent
      firstSeen
      lastUpdated
    }
  }
}
    `;
export const WorldsDocument = gql`
    query worlds($skip: Int, $first: Int, $orderBy: World_orderBy, $orderDirection: OrderDirection, $where: World_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!, $worlds_biomes_skip: Int, $worlds_biomes_first: Int, $worlds_biomes_orderBy: Biome_orderBy, $worlds_biomes_orderDirection: OrderDirection, $worlds_biomes_where: Biome_filter, $worlds_players_skip: Int, $worlds_players_first: Int, $worlds_players_orderBy: Player_orderBy, $worlds_players_orderDirection: OrderDirection, $worlds_players_where: Player_filter) {
  worlds(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    biomes(
      skip: $worlds_biomes_skip
      first: $worlds_biomes_first
      orderBy: $worlds_biomes_orderBy
      orderDirection: $worlds_biomes_orderDirection
      where: $worlds_biomes_where
    ) {
      id
      index
      growthRate
    }
    players(
      skip: $worlds_players_skip
      first: $worlds_players_first
      orderBy: $worlds_players_orderBy
      orderDirection: $worlds_players_orderDirection
      where: $worlds_players_where
    ) {
      id
      currentPosition
      currentPopulation
      timeOfLastMove
      totalMoves
      totalHelpSent
      firstSeen
      lastUpdated
    }
  }
}
    `;
export const BiomeDocument = gql`
    query biome($id: ID!, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!, $biome_world_world_players_skip: Int, $biome_world_world_players_first: Int, $biome_world_world_players_orderBy: Player_orderBy, $biome_world_world_players_orderDirection: OrderDirection, $biome_world_world_players_where: Player_filter) {
  biome(id: $id, block: $block, subgraphError: $subgraphError) {
    id
    index
    growthRate
    world {
      id
      players(
        skip: $biome_world_world_players_skip
        first: $biome_world_world_players_first
        orderBy: $biome_world_world_players_orderBy
        orderDirection: $biome_world_world_players_orderDirection
        where: $biome_world_world_players_where
      ) {
        id
        currentPosition
        currentPopulation
        timeOfLastMove
        totalMoves
        totalHelpSent
        firstSeen
        lastUpdated
      }
    }
  }
}
    `;
export const BiomesDocument = gql`
    query biomes($skip: Int, $first: Int, $orderBy: Biome_orderBy, $orderDirection: OrderDirection, $where: Biome_filter, $block: Block_height, $subgraphError: _SubgraphErrorPolicy_!, $biomes_world_world_players_skip: Int, $biomes_world_world_players_first: Int, $biomes_world_world_players_orderBy: Player_orderBy, $biomes_world_world_players_orderDirection: OrderDirection, $biomes_world_world_players_where: Player_filter) {
  biomes(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
    subgraphError: $subgraphError
  ) {
    id
    index
    growthRate
    world {
      id
      players(
        skip: $biomes_world_world_players_skip
        first: $biomes_world_world_players_first
        orderBy: $biomes_world_world_players_orderBy
        orderDirection: $biomes_world_world_players_orderDirection
        where: $biomes_world_world_players_where
      ) {
        id
        currentPosition
        currentPopulation
        timeOfLastMove
        totalMoves
        totalHelpSent
        firstSeen
        lastUpdated
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    biomeRange(variables: BiomeRangeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<BiomeRangeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BiomeRangeQuery>({ document: BiomeRangeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'biomeRange', 'query', variables);
    },
    biomeRanges(variables: BiomeRangesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<BiomeRangesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BiomeRangesQuery>({ document: BiomeRangesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'biomeRanges', 'query', variables);
    },
    enforcedOptionSet(variables: EnforcedOptionSetQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<EnforcedOptionSetQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EnforcedOptionSetQuery>({ document: EnforcedOptionSetDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'enforcedOptionSet', 'query', variables);
    },
    enforcedOptionSets(variables: EnforcedOptionSetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<EnforcedOptionSetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EnforcedOptionSetsQuery>({ document: EnforcedOptionSetsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'enforcedOptionSets', 'query', variables);
    },
    helpReceived(variables: HelpReceivedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HelpReceivedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelpReceivedQuery>({ document: HelpReceivedDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'helpReceived', 'query', variables);
    },
    helpReceiveds(variables: HelpReceivedsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HelpReceivedsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelpReceivedsQuery>({ document: HelpReceivedsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'helpReceiveds', 'query', variables);
    },
    helpSent(variables: HelpSentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HelpSentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelpSentQuery>({ document: HelpSentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'helpSent', 'query', variables);
    },
    helpSents(variables: HelpSentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HelpSentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelpSentsQuery>({ document: HelpSentsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'helpSents', 'query', variables);
    },
    ownershipTransferred(variables: OwnershipTransferredQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<OwnershipTransferredQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OwnershipTransferredQuery>({ document: OwnershipTransferredDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ownershipTransferred', 'query', variables);
    },
    ownershipTransferreds(variables: OwnershipTransferredsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<OwnershipTransferredsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OwnershipTransferredsQuery>({ document: OwnershipTransferredsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ownershipTransferreds', 'query', variables);
    },
    peerSet(variables: PeerSetQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PeerSetQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PeerSetQuery>({ document: PeerSetDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'peerSet', 'query', variables);
    },
    peerSets(variables: PeerSetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PeerSetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PeerSetsQuery>({ document: PeerSetsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'peerSets', 'query', variables);
    },
    traveled(variables: TraveledQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<TraveledQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TraveledQuery>({ document: TraveledDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'traveled', 'query', variables);
    },
    traveleds(variables: TraveledsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<TraveledsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TraveledsQuery>({ document: TraveledsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'traveleds', 'query', variables);
    },
    player(variables: PlayerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PlayerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayerQuery>({ document: PlayerDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'player', 'query', variables);
    },
    players(variables: PlayersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PlayersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayersQuery>({ document: PlayersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'players', 'query', variables);
    },
    world(variables: WorldQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorldQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorldQuery>({ document: WorldDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'world', 'query', variables);
    },
    worlds(variables: WorldsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorldsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorldsQuery>({ document: WorldsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'worlds', 'query', variables);
    },
    biome(variables: BiomeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<BiomeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BiomeQuery>({ document: BiomeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'biome', 'query', variables);
    },
    biomes(variables: BiomesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<BiomesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BiomesQuery>({ document: BiomesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'biomes', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;