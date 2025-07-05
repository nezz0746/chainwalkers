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
  const [player1Position, setPlayer1Position] = useState(0); // Base - Position from 0 to 199
  const [player2Position, setPlayer2Position] = useState(0); // Arbitrum - Position from 0 to 199
  const [player3Position, setPlayer3Position] = useState(0); // Optimism - Position from 0 to 199
  const [squareSize, setSquareSize] = useState(100);
  const [hoveredSquare, setHoveredSquare] = useState<{ lane: number, position: number } | null>(null);
  const [universeData, setUniverseData] = useState<UniverseData | null>(null);
  const threeLanesRef = useRef<HTMLDivElement>(null);

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
      // Player 1 controls (Base) - Arrow keys (left/right for horizontal movement)
      if (event.key === 'ArrowLeft') {
        setPlayer1Position(prev => Math.max(0, prev - 1));
      } else if (event.key === 'ArrowRight') {
        setPlayer1Position(prev => Math.min(199, prev + 1));
      }
      // Player 2 controls (Arbitrum) - WASD keys
      else if (event.key === 'a' || event.key === 'A') {
        setPlayer2Position(prev => Math.max(0, prev - 1));
      } else if (event.key === 'd' || event.key === 'D') {
        setPlayer2Position(prev => Math.min(199, prev + 1));
      }
      // Player 3 controls (Optimism) - Number keys
      else if (event.key === '1') {
        setPlayer3Position(prev => Math.max(0, prev - 1));
      } else if (event.key === '2') {
        setPlayer3Position(prev => Math.min(199, prev + 1));
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
          setSquareSize(60);
        } else if (window.innerWidth <= 768) {
          setSquareSize(80);
        } else {
          setSquareSize(100);
        }
      }
    };

    updateSquareSize();
    window.addEventListener('resize', updateSquareSize);
    return () => window.removeEventListener('resize', updateSquareSize);
  }, []);

  // Update camera position to follow players (center between them)
  useEffect(() => {
    if (threeLanesRef.current) {
      const viewportWidth = window.innerWidth;
      const centerOffset = viewportWidth / 2;
      const averagePosition = (player1Position + player2Position + player3Position) / 3;
      const targetX = averagePosition * squareSize - centerOffset + squareSize / 2;

      threeLanesRef.current.style.transform = `translateX(-${Math.max(0, targetX)}px)`;
    }
  }, [player1Position, player2Position, player3Position, squareSize]);

  // Handle square click
  const handleSquareClick = (lane: number, position: number) => {
    if (lane === 1) {
      setPlayer1Position(position);
    } else if (lane === 2) {
      setPlayer2Position(position);
    } else if (lane === 3) {
      setPlayer3Position(position);
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
      const isFertile = growthRate > 0;

      return (
        <div
          key={`lane-${laneNumber}-square-${index}`}
          className={styles.square}
          style={{
            backgroundColor: getBiomeColor(growthRate),
            border: '1px solid #999',
            color: growthRate > 0 ? '#0a4d0a' : growthRate < 0 ? '#4d0a0a' : '#333',
            position: 'relative',
          }}
          onClick={() => handleSquareClick(laneNumber, index)}
          onMouseEnter={() => handleSquareMouseEnter(laneNumber, index)}
          onMouseLeave={handleSquareMouseLeave}
          title={`Position ${index}: Growth Rate ${growthRate}`}
        >
          {isFertile && (
            <div
              className={styles.grassTexture}
              style={{
                backgroundImage: 'url(/assets/images/backyard_grass_3.png)',
              }}
            />
          )}
          <span className={styles.growthRateText}>{growthRate}</span>
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
        <p>Base: {player1Position + 1}/{universeData?.length || 200} | Arbitrum: {player2Position + 1}/{universeData?.length || 200} | Optimism: {player3Position + 1}/{universeData?.length || 200}</p>
        <p>Base: ←→ arrows | Arbitrum: A/D keys | Optimism: 1/2 keys | Click biomes to jump</p>
        {universeData && (
          <div className={styles.biomeInfo}>
            <span>🟦 Base: ({universeData.worlds['1']?.biomes[player1Position]?.growthRate || 0}) | </span>
            <span>🟠 Arbitrum: ({universeData.worlds['2']?.biomes[player2Position]?.growthRate || 0}) | </span>
            <span>🔴 Optimism: ({universeData.worlds['3']?.biomes[player3Position]?.growthRate || 0})</span>
          </div>
        )}
      </div>

      <div className={styles.gameViewport}>
        <div ref={threeLanesRef} className={styles.threeLanes}>
          {/* Lane 1 */}
          <div className={styles.lane}>
            <div className={styles.gameboard}>
              {generateLane(1)}
              {/* Ghost player preview for lane 1 */}
              {hoveredSquare !== null && hoveredSquare.lane === 1 && hoveredSquare.position !== player1Position && (
                <div
                  className={styles.ghostPlayer}
                  style={{
                    left: `${hoveredSquare.position * squareSize + squareSize / 2 - 40}px`,
                  }}
                >
                  <div className={styles.playerInfo}>
                    <img
                      src="https://icons.llamao.fi/icons/chains/rsz_base.jpg"
                      alt="Base"
                      className={styles.chainLogo}
                    />
                    <span className={styles.playerName}>Base Explorer</span>
                  </div>
                  <img
                    src="/assets/images/player_100.png"
                    alt="Base Ghost"
                    className={styles.playerImage}
                  />
                </div>
              )}
              {/* Player 1 Base */}
              <div
                className={styles.player}
                style={{
                  left: `${player1Position * squareSize + squareSize / 2 - 40}px`,
                }}
              >
                {/* Chain Logo and Name */}
                <div className={styles.playerInfo}>
                  <img
                    src="https://icons.llamao.fi/icons/chains/rsz_base.jpg"
                    alt="Base"
                    className={styles.chainLogo}
                  />
                  <span className={styles.playerName}>Base Explorer</span>
                </div>
                {/* Player Character */}
                <img
                  src="/assets/images/player_100.png"
                  alt="Base Player"
                  className={styles.playerImage}
                />
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
                    left: `${hoveredSquare.position * squareSize + squareSize / 2 - 40}px`,
                  }}
                >
                  <div className={styles.playerInfo}>
                    <img
                      src="https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg"
                      alt="Arbitrum"
                      className={styles.chainLogo}
                    />
                    <span className={styles.playerName}>Arbitrum Ranger</span>
                  </div>
                  <img
                    src="/assets/images/player_100.png"
                    alt="Arbitrum Ghost"
                    className={styles.playerImage}
                  />
                </div>
              )}
              {/* Player 2 Arbitrum */}
              <div
                className={styles.player}
                style={{
                  left: `${player2Position * squareSize + squareSize / 2 - 40}px`,
                }}
              >
                {/* Chain Logo and Name */}
                <div className={styles.playerInfo}>
                  <img
                    src="https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg"
                    alt="Arbitrum"
                    className={styles.chainLogo}
                  />
                  <span className={styles.playerName}>Arbitrum Ranger</span>
                </div>
                {/* Player Character */}
                <img
                  src="/assets/images/player_100.png"
                  alt="Arbitrum Player"
                  className={styles.playerImage}
                />
              </div>
            </div>
          </div>

          {/* Lane 3 */}
          <div className={styles.lane}>
            <div className={styles.gameboard}>
              {generateLane(3)}
              {/* Ghost player preview for lane 3 */}
              {hoveredSquare !== null && hoveredSquare.lane === 3 && hoveredSquare.position !== player3Position && (
                <div
                  className={styles.ghostPlayer}
                  style={{
                    left: `${hoveredSquare.position * squareSize + squareSize / 2 - 40}px`,
                  }}
                >
                  <div className={styles.playerInfo}>
                    <img
                      src="https://icons.llamao.fi/icons/chains/rsz_optimism.jpg"
                      alt="Optimism"
                      className={styles.chainLogo}
                    />
                    <span className={styles.playerName}>Optimism Pioneer</span>
                  </div>
                  <img
                    src="/assets/images/player_100.png"
                    alt="Optimism Ghost"
                    className={styles.playerImage}
                  />
                </div>
              )}
              {/* Player 3 Optimism */}
              <div
                className={styles.player}
                style={{
                  left: `${player3Position * squareSize + squareSize / 2 - 40}px`,
                }}
              >
                {/* Chain Logo and Name */}
                <div className={styles.playerInfo}>
                  <img
                    src="https://icons.llamao.fi/icons/chains/rsz_optimism.jpg"
                    alt="Optimism"
                    className={styles.chainLogo}
                  />
                  <span className={styles.playerName}>Optimism Pioneer</span>
                </div>
                {/* Player Character */}
                <img
                  src="/assets/images/player_100.png"
                  alt="Optimism Player"
                  className={styles.playerImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
