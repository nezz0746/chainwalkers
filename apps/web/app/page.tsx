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
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 p-4 min-h-screen flex flex-col items-center justify-center">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                🎮 Chainwalkers Games 🎮
              </h1>
              <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
                Choose your adventure!
              </p>
              <div className="flex justify-center mb-8">
                <ConnectKitButton />
              </div>
            </div>

            {/* Game Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">

              {/* ChainWalkers Game */}
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 text-center border-2 border-emerald-600/50 hover:border-emerald-600 transition-all duration-300 transform hover:scale-105">
                <div className="text-6xl mb-4">🔗</div>
                <h2 className="text-2xl font-bold text-white mb-3">ChainWalkers</h2>
                <p className="text-gray-300 mb-6">
                  3-lane blockchain game with infinite horizontal movement!
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Multi-chain</span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Strategy</span>
                </div>
                <button
                  onClick={() => setCurrentGame("backyard-rpg")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded font-bold transition-colors duration-300 w-full"
                >
                  Start Walking
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-gray-400">
              <p>Built with ❤️ for the blockchain gaming community</p>
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