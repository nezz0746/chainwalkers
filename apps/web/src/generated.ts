import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ChainWalkerWorld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const chainWalkerWorldAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_endpoint", internalType: "address", type: "address" },
      { name: "_owner", internalType: "address", type: "address" },
      {
        name: "_worldmap",
        internalType: "struct Biome[]",
        type: "tuple[]",
        components: [
          { name: "growthRate", internalType: "int16", type: "int16" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "error", inputs: [], name: "InvalidDelegate" },
  { type: "error", inputs: [], name: "InvalidEndpointCall" },
  {
    type: "error",
    inputs: [{ name: "options", internalType: "bytes", type: "bytes" }],
    name: "InvalidOptions",
  },
  { type: "error", inputs: [], name: "LzTokenUnavailable" },
  {
    type: "error",
    inputs: [{ name: "eid", internalType: "uint32", type: "uint32" }],
    name: "NoPeer",
  },
  {
    type: "error",
    inputs: [{ name: "msgValue", internalType: "uint256", type: "uint256" }],
    name: "NotEnoughNative",
  },
  {
    type: "error",
    inputs: [{ name: "addr", internalType: "address", type: "address" }],
    name: "OnlyEndpoint",
  },
  {
    type: "error",
    inputs: [
      { name: "eid", internalType: "uint32", type: "uint32" },
      { name: "sender", internalType: "bytes32", type: "bytes32" },
    ],
    name: "OnlyPeer",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "startIndex",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "biomes",
        internalType: "struct Biome[]",
        type: "tuple[]",
        components: [
          { name: "growthRate", internalType: "int16", type: "int16" },
        ],
        indexed: false,
      },
    ],
    name: "BiomeRange",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_enforcedOptions",
        internalType: "struct EnforcedOptionParam[]",
        type: "tuple[]",
        components: [
          { name: "eid", internalType: "uint32", type: "uint32" },
          { name: "msgType", internalType: "uint16", type: "uint16" },
          { name: "options", internalType: "bytes", type: "bytes" },
        ],
        indexed: false,
      },
    ],
    name: "EnforcedOptionSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "biomePosition",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "newGrowthRate",
        internalType: "int16",
        type: "int16",
        indexed: true,
      },
    ],
    name: "HelpReceived",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "player",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tribe",
        internalType: "struct Tribe",
        type: "tuple",
        components: [
          { name: "position", internalType: "uint256", type: "uint256" },
          { name: "population", internalType: "uint256", type: "uint256" },
          { name: "timeOfLastMove", internalType: "uint256", type: "uint256" },
        ],
        indexed: false,
      },
    ],
    name: "HelpSent",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "eid", internalType: "uint32", type: "uint32", indexed: false },
      {
        name: "peer",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
    ],
    name: "PeerSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "player",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tribe",
        internalType: "struct Tribe",
        type: "tuple",
        components: [
          { name: "position", internalType: "uint256", type: "uint256" },
          { name: "population", internalType: "uint256", type: "uint256" },
          { name: "timeOfLastMove", internalType: "uint256", type: "uint256" },
        ],
        indexed: false,
      },
    ],
    name: "Traveled",
  },
  {
    type: "function",
    inputs: [],
    name: "SEND",
    outputs: [{ name: "", internalType: "uint16", type: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "currentPopulation", internalType: "uint256", type: "uint256" },
      {
        name: "numberOfPositionForward",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "_computeMovingPopulation",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "K", internalType: "uint256", type: "uint256" },
      { name: "P0", internalType: "uint256", type: "uint256" },
      { name: "r", internalType: "int256", type: "int256" },
      { name: "t", internalType: "uint256", type: "uint256" },
    ],
    name: "_computePopulationOverTime",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "player", internalType: "address", type: "address" }],
    name: "_isAlive",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "origin",
        internalType: "struct Origin",
        type: "tuple",
        components: [
          { name: "srcEid", internalType: "uint32", type: "uint32" },
          { name: "sender", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
        ],
      },
    ],
    name: "allowInitializePath",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_eid", internalType: "uint32", type: "uint32" },
      { name: "_msgType", internalType: "uint16", type: "uint16" },
      { name: "_extraOptions", internalType: "bytes", type: "bytes" },
    ],
    name: "combineOptions",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "player", internalType: "address", type: "address" },
      { name: "newPosition", internalType: "uint256", type: "uint256" },
    ],
    name: "computePopulationAfterMove",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "endpoint",
    outputs: [
      {
        name: "",
        internalType: "contract ILayerZeroEndpointV2",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "eid", internalType: "uint32", type: "uint32" },
      { name: "msgType", internalType: "uint16", type: "uint16" },
    ],
    name: "enforcedOptions",
    outputs: [{ name: "enforcedOption", internalType: "bytes", type: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "",
        internalType: "struct Origin",
        type: "tuple",
        components: [
          { name: "srcEid", internalType: "uint32", type: "uint32" },
          { name: "sender", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "_sender", internalType: "address", type: "address" },
    ],
    name: "isComposeMsgSender",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_origin",
        internalType: "struct Origin",
        type: "tuple",
        components: [
          { name: "srcEid", internalType: "uint32", type: "uint32" },
          { name: "sender", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
        ],
      },
      { name: "_guid", internalType: "bytes32", type: "bytes32" },
      { name: "_message", internalType: "bytes", type: "bytes" },
      { name: "_executor", internalType: "address", type: "address" },
      { name: "_extraData", internalType: "bytes", type: "bytes" },
    ],
    name: "lzReceive",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "player", internalType: "address", type: "address" },
      { name: "newPosition", internalType: "uint256", type: "uint256" },
    ],
    name: "move",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "uint32", type: "uint32" },
      { name: "", internalType: "bytes32", type: "bytes32" },
    ],
    name: "nextNonce",
    outputs: [{ name: "nonce", internalType: "uint64", type: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "oAppVersion",
    outputs: [
      { name: "senderVersion", internalType: "uint64", type: "uint64" },
      { name: "receiverVersion", internalType: "uint64", type: "uint64" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "eid", internalType: "uint32", type: "uint32" }],
    name: "peers",
    outputs: [{ name: "peer", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_dstEid", internalType: "uint32", type: "uint32" },
      { name: "player", internalType: "address", type: "address" },
      { name: "_options", internalType: "bytes", type: "bytes" },
    ],
    name: "quoteSendHelp",
    outputs: [
      {
        name: "fee",
        internalType: "struct MessagingFee",
        type: "tuple",
        components: [
          { name: "nativeFee", internalType: "uint256", type: "uint256" },
          { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "player", internalType: "address", type: "address" },
      { name: "_dstEid", internalType: "uint32", type: "uint32" },
      { name: "_options", internalType: "bytes", type: "bytes" },
    ],
    name: "sendHelp",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "_delegate", internalType: "address", type: "address" }],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_enforcedOptions",
        internalType: "struct EnforcedOptionParam[]",
        type: "tuple[]",
        components: [
          { name: "eid", internalType: "uint32", type: "uint32" },
          { name: "msgType", internalType: "uint16", type: "uint16" },
          { name: "options", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "setEnforcedOptions",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_eid", internalType: "uint32", type: "uint32" },
      { name: "_peer", internalType: "bytes32", type: "bytes32" },
    ],
    name: "setPeer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "player", internalType: "address", type: "address" }],
    name: "start",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "tribes",
    outputs: [
      { name: "position", internalType: "uint256", type: "uint256" },
      { name: "population", internalType: "uint256", type: "uint256" },
      { name: "timeOfLastMove", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_worldmap",
        internalType: "struct Biome[]",
        type: "tuple[]",
        components: [
          { name: "growthRate", internalType: "int16", type: "int16" },
        ],
      },
    ],
    name: "updateBiome",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "worldmap",
    outputs: [{ name: "growthRate", internalType: "int16", type: "int16" }],
    stateMutability: "view",
  },
] as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const chainWalkerWorldAddress = {
  10: "0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2",
  8453: "0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8",
} as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const chainWalkerWorldConfig = {
  address: chainWalkerWorldAddress,
  abi: chainWalkerWorldAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorld = /*#__PURE__*/ createUseReadContract({
  abi: chainWalkerWorldAbi,
  address: chainWalkerWorldAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"SEND"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldSend = /*#__PURE__*/ createUseReadContract({
  abi: chainWalkerWorldAbi,
  address: chainWalkerWorldAddress,
  functionName: "SEND",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"_computeMovingPopulation"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldComputeMovingPopulation =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "_computeMovingPopulation",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"_computePopulationOverTime"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldComputePopulationOverTime =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "_computePopulationOverTime",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"_isAlive"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldIsAlive =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "_isAlive",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "allowInitializePath",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"combineOptions"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldCombineOptions =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "combineOptions",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"computePopulationAfterMove"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldComputePopulationAfterMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "computePopulationAfterMove",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldEndpoint =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "endpoint",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"enforcedOptions"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldEnforcedOptions =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "enforcedOptions",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "isComposeMsgSender",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldNextNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "nextNonce",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldOAppVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "oAppVersion",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldOwner = /*#__PURE__*/ createUseReadContract(
  {
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "owner",
  }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldPeers = /*#__PURE__*/ createUseReadContract(
  {
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "peers",
  }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"quoteSendHelp"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldQuoteSendHelp =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "quoteSendHelp",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"tribes"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldTribes =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "tribes",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"worldmap"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useReadChainWalkerWorldWorldmap =
  /*#__PURE__*/ createUseReadContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "worldmap",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorld = /*#__PURE__*/ createUseWriteContract({
  abi: chainWalkerWorldAbi,
  address: chainWalkerWorldAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldLzReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "lzReceive",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"move"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldMove =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "move",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"sendHelp"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldSendHelp =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "sendHelp",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldSetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "setDelegate",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldSetEnforcedOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "setEnforcedOptions",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldSetPeer =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "setPeer",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"start"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldStart =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "start",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"updateBiome"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWriteChainWalkerWorldUpdateBiome =
  /*#__PURE__*/ createUseWriteContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "updateBiome",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorld =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "lzReceive",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"move"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldMove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "move",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"sendHelp"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldSendHelp =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "sendHelp",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "setDelegate",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldSetEnforcedOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "setEnforcedOptions",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldSetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "setPeer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"start"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldStart =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "start",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `functionName` set to `"updateBiome"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useSimulateChainWalkerWorldUpdateBiome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    functionName: "updateBiome",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"BiomeRange"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldBiomeRangeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "BiomeRange",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"EnforcedOptionSet"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldEnforcedOptionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "EnforcedOptionSet",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"HelpReceived"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldHelpReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "HelpReceived",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"HelpSent"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldHelpSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "HelpSent",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "PeerSet",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link chainWalkerWorldAbi}__ and `eventName` set to `"Traveled"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8)
 */
export const useWatchChainWalkerWorldTraveledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: chainWalkerWorldAbi,
    address: chainWalkerWorldAddress,
    eventName: "Traveled",
  });
