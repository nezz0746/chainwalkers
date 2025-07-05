'use client';

import { useState, useEffect, useRef } from 'react';
import { ConnectKitButton } from "connectkit";
import styles from './page.module.css';

interface BiomeData {
  growthRate: number;
}

interface WorldData {
  chainId: number;
  biomes: BiomeData[];
}

interface UniverseData {
  length: number;
  worlds: {
    [key: string]: WorldData;
  };
}

export default function Home() {
  const [player1Position, setPlayer1Position] = useState(0); // Position from 0 to 199
  const [player2Position, setPlayer2Position] = useState(0); // Position from 0 to 199
  const [squareSize, setSquareSize] = useState(60);
  const [hoveredSquare, setHoveredSquare] = useState<{ lane: number, position: number } | null>(null);
  const [universeData, setUniverseData] = useState<UniverseData | null>(null);
  const dualLanesRef = useRef<HTMLDivElement>(null);

  // Load universe data
  useEffect(() => {
    const loadUniverseData = async () => {
      try {
        const response = await fetch('/universe.json');
        const data: UniverseData = await response.json();
        setUniverseData(data);
      } catch (error) {
        console.error('Failed to load universe data:', error);
      }
    };

    loadUniverseData();
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Player 1 controls - Arrow keys (left/right for horizontal movement)
      if (event.key === 'ArrowLeft') {
        setPlayer1Position(prev => Math.max(0, prev - 1));
      } else if (event.key === 'ArrowRight') {
        setPlayer1Position(prev => Math.min(199, prev + 1));
      }
      // Player 2 controls - WASD keys
      else if (event.key === 'a' || event.key === 'A') {
        setPlayer2Position(prev => Math.max(0, prev - 1));
      } else if (event.key === 'd' || event.key === 'D') {
        setPlayer2Position(prev => Math.min(199, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update square size based on window size
  useEffect(() => {
    const updateSquareSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth <= 480) {
          setSquareSize(40);
        } else if (window.innerWidth <= 768) {
          setSquareSize(50);
        } else {
          setSquareSize(60);
        }
      }
    };

    updateSquareSize();
    window.addEventListener('resize', updateSquareSize);
    return () => window.removeEventListener('resize', updateSquareSize);
  }, []);

  // Update camera position to follow players (center between them)
  useEffect(() => {
    if (dualLanesRef.current) {
      const viewportWidth = window.innerWidth;
      const centerOffset = viewportWidth / 2;
      const averagePosition = (player1Position + player2Position) / 2;
      const targetX = averagePosition * squareSize - centerOffset + squareSize / 2;

      dualLanesRef.current.style.transform = `translateX(-${Math.max(0, targetX)}px)`;
    }
  }, [player1Position, player2Position, squareSize]);

  // Handle square click
  const handleSquareClick = (lane: number, position: number) => {
    if (lane === 1) {
      setPlayer1Position(position);
    } else {
      setPlayer2Position(position);
    }
  };

  // Handle square hover
  const handleSquareMouseEnter = (lane: number, position: number) => {
    setHoveredSquare({ lane, position });
  };

  const handleSquareMouseLeave = () => {
    setHoveredSquare(null);
  };

  // Get biome color based on growth rate - Light theme version
  const getBiomeColor = (growthRate: number): string => {
    if (growthRate > 0) {
      // Positive growth rates - green tones (fertile/growth)
      const intensity = Math.min(growthRate / 30, 1); // Normalize to 0-1
      const green = Math.floor(220 + intensity * 35); // 220-255
      return `rgb(200, ${green}, 200)`;
    } else if (growthRate < 0) {
      // Negative growth rates - red/pink tones (harsh/decay)
      const intensity = Math.min(Math.abs(growthRate) / 90, 1); // Normalize to 0-1
      const red = Math.floor(220 + intensity * 35); // 220-255
      return `rgb(${red}, 200, 200)`;
    } else {
      // Neutral - light gray
      return '#f8f8f8';
    }
  };

  // Generate lanes with universe data
  const generateLane = (laneNumber: number) => {
    if (!universeData) {
      // Loading state - show placeholder squares
      return Array.from({ length: 200 }, (_, index) => (
        <div
          key={`lane-${laneNumber}-square-${index}`}
          className={styles.square}
          style={{
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
          }}
        >
          ...
        </div>
      ));
    }

    const worldData = universeData.worlds[laneNumber.toString()];
    if (!worldData) {
      console.error(`World ${laneNumber} not found in universe data`);
      return [];
    }

    return Array.from({ length: universeData.length }, (_, index) => {
      const biome = worldData.biomes[index];
      const growthRate = biome?.growthRate || 0;

      return (
        <div
          key={`lane-${laneNumber}-square-${index}`}
          className={styles.square}
          style={{
            backgroundColor: getBiomeColor(growthRate),
            border: '1px solid #999',
            color: growthRate > 0 ? '#0a4d0a' : growthRate < 0 ? '#4d0a0a' : '#333',
          }}
          onClick={() => handleSquareClick(laneNumber, index)}
          onMouseEnter={() => handleSquareMouseEnter(laneNumber, index)}
          onMouseLeave={handleSquareMouseLeave}
          title={`Position ${index}: Growth Rate ${growthRate}`}
        >
          {growthRate}
        </div>
      );
    });
  };

  return (
    <div className={styles.gameContainer}>
      {/* Navbar with ConnectKitButton */}
      <nav className={styles.navbar}>
        <div className={styles.navTitle}>
          <h1>Chainwalkers Universe</h1>
        </div>
        <ConnectKitButton />
      </nav>

      <div className={styles.gameInfo}>
        <p>Player 1 (World 1): {player1Position + 1}/{universeData?.length || 200} | Player 2 (World 2): {player2Position + 1}/{universeData?.length || 200}</p>
        <p>Player 1: ←→ arrows | Player 2: A/D keys | Click biomes to jump</p>
        {universeData && (
          <div className={styles.biomeInfo}>
            <span>🌱 Green: Growth ({universeData.worlds['1']?.biomes[player1Position]?.growthRate || 0}) | </span>
            <span>🔥 Red: Decay ({universeData.worlds['2']?.biomes[player2Position]?.growthRate || 0})</span>
          </div>
        )}
      </div>

      <div className={styles.gameViewport}>
        <div ref={dualLanesRef} className={styles.dualLanes}>
          {/* Lane 1 */}
          <div className={styles.lane}>
            <div className={styles.gameboard}>
              {generateLane(1)}
              {/* Ghost player preview for lane 1 */}
              {hoveredSquare !== null && hoveredSquare.lane === 1 && hoveredSquare.position !== player1Position && (
                <div
                  className={styles.ghostPlayer}
                  style={{
                    left: `${hoveredSquare.position * squareSize + squareSize / 2 - 12}px`,
                  }}
                >
                  🚀
                </div>
              )}
              {/* Player 1 */}
              <div
                className={styles.player}
                style={{
                  left: `${player1Position * squareSize + squareSize / 2 - 12}px`,
                }}
              >
                🚀
              </div>
            </div>
          </div>

          {/* Lane 2 */}
          <div className={styles.lane}>
            <div className={styles.gameboard}>
              {generateLane(2)}
              {/* Ghost player preview for lane 2 */}
              {hoveredSquare !== null && hoveredSquare.lane === 2 && hoveredSquare.position !== player2Position && (
                <div
                  className={styles.ghostPlayer}
                  style={{
                    left: `${hoveredSquare.position * squareSize + squareSize / 2 - 12}px`,
                  }}
                >
                  🛸
                </div>
              )}
              {/* Player 2 */}
              <div
                className={styles.player}
                style={{
                  left: `${player2Position * squareSize + squareSize / 2 - 12}px`,
                }}
              >
                🛸
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
