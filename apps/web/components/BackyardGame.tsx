"use client";

import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

// Import game state to pass wallet info
import { gameState } from "../game/src/core/GameState";

export default function ChainWalkersGame() {
    const gameRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (!containerRef.current) return;

        // Dynamically import Phaser and game scenes to avoid SSR issues
        const initializeGame = async () => {
            const [Phaser, { BootScene }, { LaneScene }] = await Promise.all([
                import("phaser"),
                import("../game/src/scenes/BootScene"),
                import("../game/src/scenes/LaneScene")
            ]);

            // Phaser game configuration
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: '#D2B48C', // Sandy desert color
                parent: containerRef.current,
                scene: [BootScene, LaneScene],
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { x: 0, y: 0 },
                        debug: false
                    }
                },
                audio: {
                    disableWebAudio: false
                },
                scale: {
                    mode: Phaser.Scale.RESIZE,
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                input: {
                    keyboard: true,
                    touch: true,
                }
            };

            // Create the game instance
            gameRef.current = new Phaser.Game(config);

            // Set tabindex on the canvas to allow keyboard focus
            const setupCanvas = () => {
                const canvas = containerRef.current?.querySelector('canvas');
                if (canvas) {
                    canvas.tabIndex = 0;
                    canvas.style.outline = 'none';
                    canvas.focus();
                    console.log('Canvas setup for keyboard input');
                }
            };

            // Setup canvas after a short delay to ensure it's created
            setTimeout(setupCanvas, 100);

            // Handle window resize
            const handleResize = () => {
                if (gameRef.current) {
                    gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
                }
            };

            window.addEventListener('resize', handleResize);

            // Return cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        };

        let cleanup: (() => void) | undefined;

        initializeGame().then((cleanupFn) => {
            cleanup = cleanupFn;
        }).catch((error) => {
            console.error('Failed to initialize game:', error);
        });

        // Cleanup function
        return () => {
            if (cleanup) {
                cleanup();
            }
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    // Update game state when wallet connects/disconnects
    useEffect(() => {
        if (isConnected && address && gameRef.current) {
            // Store the wallet address for when the user creates their player
            (window as any).connectedWalletAddress = address;
        } else {
            // Clear wallet address when disconnected
            (window as any).connectedWalletAddress = null;
            // Reset game state when wallet disconnects
            gameState.reset();
        }
    }, [isConnected, address]);

    return (
        <div className="w-full h-screen bg-yellow-100 flex flex-col"> {/* Desert sandy background */}
            <div className="bg-amber-800 p-4 shadow-lg"> {/* Desert brown header */}
                <h1 className="text-3xl font-bold text-yellow-100 text-center mb-2">
                    🏜️ Desert ChainWalkers 🏜️
                </h1>
                <div className="text-yellow-200 text-center text-sm space-y-1">
                    <p>Desert Dune-style blockchain game • Cross the endless sands</p>
                    <div className="flex justify-center items-center space-x-4 mt-2">
                        {isConnected ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-400">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-red-400">Wallet not connected</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-1 w-full h-full cursor-pointer"
                tabIndex={0}
                style={{ outline: 'none' }}
                onClick={() => {
                    // Focus the container when clicked
                    containerRef.current?.focus();
                    const canvas = containerRef.current?.querySelector('canvas');
                    if (canvas) {
                        (canvas as HTMLCanvasElement).focus();
                    }
                }}
            />

            <div className="bg-amber-800 p-4 space-y-3"> {/* Desert brown footer */}
                {/* Game Instructions */}
                <div className="text-center text-yellow-200 text-sm">
                    <div className="mb-2">
                        <strong className="text-yellow-100">🏜️ Desert Survival Guide:</strong>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div className="text-yellow-300">1. Connect your wallet first ↗️</div>
                        <div className="text-yellow-300">2. Click "Create My Player" (green button)</div>
                        <div>3. 🖱️ Click on ANY wanderer to select them</div>
                        <div>4. Use ← → arrow keys OR A/D keys to move across the dunes</div>
                        <div>5. Watch wanderers navigate the desert sands!</div>
                        <div>6. Movement has cooldown (desert heat!)</div>
                        <div>7. Click "Confirm Movement" to finalize on-chain</div>
                        <div>8. Click empty sand to deselect</div>
                    </div>
                    <div className="mt-2 text-xs text-yellow-300">
                        🎯 Control any desert wanderer! Green border = Your wanderer, Yellow = Others
                    </div>
                    <div className="mt-1 text-xs text-orange-300">
                        🔊 Desert sounds & smooth sand-walking animations!
                    </div>
                    <div className="mt-1 text-xs text-red-300">
                        🐛 Sandstorm issues? Check browser console (F12) for debugging
                    </div>
                </div>

                {/* Desert Paths Info */}
                <div className="flex justify-center space-x-8 text-xs text-yellow-200">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-600 rounded mr-2"></div>
                        <span>🏜️ Northern Desert Path</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-700 rounded mr-2"></div>
                        <span>🏜️ Central Desert Path</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-800 rounded mr-2"></div>
                        <span>🏜️ Southern Desert Path</span>
                    </div>
                </div>

                {/* Wallet Status */}
                {!isConnected && (
                    <div className="text-center text-yellow-300 text-sm">
                        💡 Connect your wallet to become a desert wanderer!
                    </div>
                )}
            </div>
        </div>
    );
} 