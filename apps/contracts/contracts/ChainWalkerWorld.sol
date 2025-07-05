// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { OAppOptionsType3 } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Population } from "./Population.sol";

struct Tribe {
    uint256 position;
    uint256 population;
    uint256 timeOfLastMove;
}

struct Biome {
    int16 growthRate;
}

contract ChainWalkerWorld is OApp, OAppOptionsType3, Population {
    mapping(address => Tribe) public tribes;

    event Traveled(address indexed player, Tribe tribe);
    event HelpSent(address indexed player, Tribe tribe);
    event HelpReceived(uint256 indexed biomePosition, int16 indexed newGrowthRate);
    event BiomeRange(uint256 indexed startIndex, Biome[] biomes);

    Biome[] public worldmap;

    /// @notice Msg type for sending a string, for use in OAppOptionsType3 as an enforced option
    uint16 public constant SEND = 1;

    /// @notice Initialize with Endpoint V2 and owner address
    /// @param _endpoint The local chain's LayerZero Endpoint V2 address
    /// @param _owner    The address permitted to configure this OApp
    /// @param _worldmap      The map of biomes
    constructor(address _endpoint, address _owner, Biome[] memory _worldmap) OApp(_endpoint, _owner) Ownable(_owner) {
        // Copy biomes from memory to storage one by one
        for (uint256 i = 0; i < _worldmap.length; i++) {
            worldmap.push(_worldmap[i]);
        }

        // Emit worldmap in chunks of 50 biomes
        uint256 chunkSize = 50;
        for (uint256 i = 0; i < _worldmap.length; i += chunkSize) {
            uint256 end = i + chunkSize > _worldmap.length ? _worldmap.length : i + chunkSize;
            uint256 currentChunkSize = end - i;

            // Create chunk array
            Biome[] memory chunk = new Biome[](currentChunkSize);
            for (uint256 j = 0; j < currentChunkSize; j++) {
                chunk[j] = _worldmap[i + j];
            }

            emit BiomeRange(i, chunk);
        }
    }

    // ──────────────────────────────────────────────────────────────────────────────
    // 0. (Optional) Quote business logic
    //
    // Example: Get a quote from the Endpoint for a cost estimate of sending a message.
    // Replace this to mirror your own send business logic.
    // ──────────────────────────────────────────────────────────────────────────────

    /**
     * @notice Quotes the gas needed to pay for the full omnichain transaction in native gas or ZRO token.
     * @param _dstEid Destination chain's endpoint ID.
     * @param player The player to send help to.
     * @param _options Message execution options (e.g., for sending gas to destination).
     * @return fee A `MessagingFee` struct containing the calculated gas fee in either the native token or ZRO token.
     */
    function quoteSendHelp(
        uint32 _dstEid,
        address player,
        bytes calldata _options
    ) public view returns (MessagingFee memory fee) {
        fee = _quote(_dstEid, _getEncodedHelpMessage(player), combineOptions(_dstEid, SEND, _options), false);
    }

    // ──────────────────────────────────────────────────────────────────────────────
    // 1. Send business logic
    //
    // Example: send a simple string to a remote chain. Replace this with your
    // own state-update logic, then encode whatever data your application needs.
    // ──────────────────────────────────────────────────────────────────────────────

    /// @notice Send a string to a remote OApp on another chain
    /// @param _dstEid   Destination Endpoint ID (uint32)
    /// @param _options  Execution options for gas on the destination (bytes)
    function sendHelp(address player, uint32 _dstEid, bytes calldata _options) external payable {
        // 1. (Optional) Update any local state here.
        //    e.g., record that a message was "sent":
        //    sentCount += 1;

        bytes memory helpMessage = _getEncodedHelpMessage(player);

        // 3. Call OAppSender._lzSend to package and dispatch the cross-chain message
        //    - _dstEid:   remote chain's Endpoint ID
        //    - _message:  ABI-encoded string
        //    - _options:  combined execution options (enforced + caller-provided)
        //    - MessagingFee(msg.value, 0): pay all gas as native token; no ZRO
        //    - payable(msg.sender): refund excess gas to caller
        //
        //    combineOptions (from OAppOptionsType3) merges enforced options set by the contract owner
        //    with any additional execution options provided by the caller
        _lzSend(
            _dstEid,
            helpMessage,
            combineOptions(_dstEid, SEND, _options),
            MessagingFee(msg.value, 0),
            payable(msg.sender)
        );

        // Thank you for your sacrifice
        tribes[player].population = tribes[player].population / 2;

        emit HelpSent(player, tribes[player]);
    }

    // ──────────────────────────────────────────────────────────────────────────────
    // 2. Receive business logic
    //
    // Override _lzReceive to decode the incoming bytes and apply your logic.
    // The base OAppReceiver.lzReceive ensures:
    //   • Only the LayerZero Endpoint can call this method
    //   • The sender is a registered peer (peers[srcEid] == origin.sender)
    // ──────────────────────────────────────────────────────────────────────────────

    /// @notice Invoked by OAppReceiver when EndpointV2.lzReceive is called
    /// @dev   _origin    Metadata (source chain, sender address, nonce)
    /// @dev   _guid      Global unique ID for tracking this message
    /// @param _message   ABI-encoded bytes (the string we sent earlier)
    /// @dev   _executor  Executor address that delivered the message
    /// @dev   _extraData Additional data from the Executor (unused here)
    function _lzReceive(
        Origin calldata /*_origin*/,
        bytes32 /*_guid*/,
        bytes calldata _message,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        // 1. Decode the incoming bytes into a string
        //    You can use abi.decode, abi.decodePacked, or directly splice bytes
        //    if you know the format of your data structures
        uint256 position = _getDecodedHelpMessagePosition(_message);

        _processHelpMessage(position);
    }

    function _isAlive(address player) public view returns (bool) {
        return
            _computePopulationOverTime(
                100_000,
                tribes[player].population,
                int256(worldmap[tribes[player].position].growthRate),
                block.timestamp - tribes[player].timeOfLastMove
            ) > 0;
    }

    function start(address player) public {
        require(!_isAlive(player), "Player is already alive");

        tribes[player].position = 0;
        tribes[player].timeOfLastMove = block.timestamp;
        tribes[player].population = 100;

        emit Traveled(player, tribes[player]);
    }

    function computePopulationAfterMove(address player, uint256 newPosition) public view returns (uint256) {
        return _computeMovingPopulation(tribes[player].population, newPosition - tribes[player].position);
    }

    function move(address player, uint256 newPosition) public {
        require(
            newPosition > tribes[player].position,
            "Cannot move to a position less or equal to the current position"
        );

        tribes[player].position = newPosition;
        tribes[player].timeOfLastMove = block.timestamp;
        tribes[player].population = _computeMovingPopulation(
            tribes[player].population,
            newPosition - tribes[player].position
        );

        emit Traveled(player, tribes[player]);
    }

    function _getEncodedHelpMessage(address player) internal view returns (bytes memory) {
        return abi.encode(tribes[player].position);
    }

    function _getDecodedHelpMessagePosition(bytes calldata _message) internal view returns (uint256) {
        return abi.decode(_message, (uint256));
    }

    function _processHelpMessage(uint256 position) internal {
        worldmap[position].growthRate += 5;

        emit HelpReceived(position, worldmap[position].growthRate);
    }
}
