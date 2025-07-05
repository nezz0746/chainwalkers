"use client"

import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import ChainWalkersGame from "../components/BackyardGame";

export default function Home() {
  const [currentGame, setCurrentGame] = useState<"selector" | "backyard-rpg">("selector");

  // Game Selector View
  if (currentGame === "selector") {
    return (
      <Web3Provider>
        <div className="min-h-screen relative">
          {/* Background Image */}
          <img
            src="/background.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 p-4 min-h-screen flex flex-col">
            {/* Header */}
            <div className="text-center py-12">
              <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
                🏜️ Desert ChainWalkers 🏜️
              </h1>
              <p className="text-2xl text-amber-200 mb-4 drop-shadow-md max-w-3xl mx-auto">
                Cross the endless desert sands in this blockchain-powered adventure
              </p>
              <p className="text-lg text-gray-300 mb-8 drop-shadow-md max-w-2xl mx-auto">
                Navigate through treacherous desert lanes, collect treasures, and survive the harsh wilderness
                while your moves are permanently recorded on the blockchain.
              </p>
              <div className="flex justify-center mb-8">
                <ConnectKitButton />
              </div>
            </div>

            {/* Game Features */}
            <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
                🎮 Game Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 text-center border border-amber-600/50">
                  <div className="text-4xl mb-4">🔗</div>
                  <h3 className="text-xl font-bold text-white mb-2">Blockchain Integration</h3>
                  <p className="text-gray-300">Every move is recorded on-chain. True ownership of your desert wanderer!</p>
                </div>
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 text-center border border-amber-600/50">
                  <div className="text-4xl mb-4">🏜️</div>
                  <h3 className="text-xl font-bold text-white mb-2">Desert Survival</h3>
                  <p className="text-gray-300">Navigate through 3 dangerous desert lanes with unique challenges and rewards.</p>
                </div>
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 text-center border border-amber-600/50">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-2">Strategic Movement</h3>
                  <p className="text-gray-300">Plan your moves carefully! Desert heat creates cooldowns between actions.</p>
                </div>
              </div>
            </div>

            {/* How to Play */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
                🎲 How to Play
              </h2>
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 border border-amber-600/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="text-white font-bold">Connect Your Wallet</h4>
                        <p className="text-gray-300 text-sm">Link your Web3 wallet to become a desert wanderer</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="text-white font-bold">Create Your Player</h4>
                        <p className="text-gray-300 text-sm">Spawn your character in the desert wilderness</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="text-white font-bold">Navigate the Desert</h4>
                        <p className="text-gray-300 text-sm">Use arrow keys or A/D to move between lanes</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                      <div>
                        <h4 className="text-white font-bold">Confirm Moves</h4>
                        <p className="text-gray-300 text-sm">Record your actions permanently on the blockchain</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                      <div>
                        <h4 className="text-white font-bold">Survive & Thrive</h4>
                        <p className="text-gray-300 text-sm">Collect treasures and avoid dangers in the sand</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">6</div>
                      <div>
                        <h4 className="text-white font-bold">Control Any Wanderer</h4>
                        <p className="text-gray-300 text-sm">Click any desert traveler to take control</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Game Card */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-black/70 backdrop-blur-sm rounded-xl p-8 text-center border-2 border-amber-600/50 hover:border-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-8xl mb-6">🏜️</div>
                <h2 className="text-4xl font-bold text-white mb-4">Desert ChainWalkers</h2>
                <p className="text-xl text-amber-200 mb-6">
                  The ultimate blockchain desert survival experience
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Multi-chain</span>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">Strategy</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Survival</span>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">Adventure</span>
                </div>
                <button
                  onClick={() => setCurrentGame("backyard-rpg")}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 w-full transform hover:scale-105 shadow-lg"
                >
                  🎮 Enter the Desert
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  Free to play • Wallet required for blockchain features
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto text-center text-gray-400 py-8">
              <p className="text-lg">Built with ❤️ for the blockchain gaming community</p>
              <p className="text-sm mt-2">Experience the future of decentralized gaming</p>
            </div>
          </div>
        </div>
      </Web3Provider>
    );
  }

  // Backyard RPG Game
  if (currentGame === "backyard-rpg") {
    return (
      <Web3Provider>
        <div className="min-h-screen bg-gray-900">
          {/* Back button */}
          <div className="absolute top-4 left-4 z-50">
            <button
              onClick={() => setCurrentGame("selector")}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors duration-300 border border-gray-600"
            >
              ← Back to Games
            </button>
          </div>

          <ChainWalkersGame />
        </div>
      </Web3Provider>
    );
  }

  // Fallback (should never hit)
  return null;
};