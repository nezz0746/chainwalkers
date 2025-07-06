"use client";

import { ConnectKitButton } from "connectkit";
import { useQuery } from "@tanstack/react-query";
import { GameApi } from "../src/services/api";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../src/components/ui/dialog";
import { Button } from "../src/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount, useSwitchChain } from "wagmi";
import { base, optimism } from "viem/chains";
import {
  useWriteChainWalkerWorldMove,
  useWriteChainWalkerWorldStart,
} from "@/generated";
import useWaitForTransactionSuccess from "../src/hooks/useTransactionSucess";
import { hexToBigInt } from "viem";
import { truncateAddress } from "@/lib/utils";
import { UserIcon, UsersIcon } from "lucide-react";
import desertBg from "../public/background2.png";

const growingColor = "#0eeeee";
const declineColor = "#ff0000";

// Mock data for fallback
const MOCK_WORLDS = [
  {
    id: "0x1234567890abcdef1234567890abcdef12345678",
    chainId: 1,
    players: [
      { id: "0x1111111111111111111111111111111111111111", currentPopulation: 42, currentPosition: 0 },
      { id: "0x2222222222222222222222222222222222222222", currentPopulation: 17, currentPosition: 1 },
    ],
    biomes: [
      { id: "biome-0", index: 0, growthRate: 2 },
      { id: "biome-1", index: 1, growthRate: -1 },
      { id: "biome-2", index: 2, growthRate: 0 },
    ],
  },
  {
    id: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    chainId: 2,
    players: [
      { id: "0x3333333333333333333333333333333333333333", currentPopulation: 99, currentPosition: 0 },
      { id: "0x4444444444444444444444444444444444444444", currentPopulation: 5, currentPosition: 2 },
    ],
    biomes: [
      { id: "biome-0b", index: 0, growthRate: 1 },
      { id: "biome-1b", index: 1, growthRate: 3 },
      { id: "biome-2b", index: 2, growthRate: -2 },
    ],
  },
];
const MOCK_ME = {
  world: { id: "0x1234567890abcdef1234567890abcdef12345678" },
};

export default function Home() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: worlds, refetch: refetchWorlds } = useQuery({
    queryKey: ["worlds"],
    queryFn: () => {
      return new GameApi().worlds();
    },
  });

  const { data: me, refetch: refetchMe } = useQuery({
    queryKey: ["me", address],
    queryFn: () => {
      return new GameApi().me(address);
    },
    enabled: !!address,
  });

  console.log({ me });

  // Modal and audio state
  const [open, setOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Selected biome state
  const [selectedBiome, setSelectedBiome] = useState<{
    index: number;
    chainId: number;
    growthRate: number;
    id: string;
  } | null>(null);

  useEffect(() => {
    // Pause audio if modal is open again (shouldn't happen, but for safety)
    if (open && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [open]);

  const handlePlayNow = () => {
    setOpen(false);
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const { writeContract } = useWriteChainWalkerWorldStart({});

  const {
    writeContract: writeMove,
    data: moveData,
    isPending,
  } = useWriteChainWalkerWorldMove({});
  const { isLoading: isLoadingMove } = useWaitForTransactionSuccess(
    moveData,
    () => {
      refetchMe();
      refetchWorlds();
    }
  );
  const moveLoading = isPending || isLoadingMove;

  // Use mock data if API is down
  const safeWorlds = worlds && Array.isArray(worlds) && worlds.length > 0 ? worlds : MOCK_WORLDS;
  const safeMe = me || MOCK_ME;

  return (
    <>
      {/* Modal for instructions and lore (moved outside flex container) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-md w-full rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 border-2 border-yellow-300 p-8 relative flex flex-col items-center justify-center"
          style={{
            position: "fixed",
            zIndex: 9999,
            padding: 20,
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-extrabold text-yellow-900 drop-shadow-sm mb-2 tracking-wide">
              Welcome to
              <br />
              <span className="text-orange-700">Chainwalkers</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 text-center">
            <p className="text-base text-yellow-900 font-medium leading-relaxed">
              You can't survive alone. Help other survivors in other worlds.
            </p>
            <ul className="text-left mx-auto max-w-xs text-sm list-disc list-inside text-yellow-800 space-y-1">
              <li>
                <span className="font-semibold text-orange-700">Move</span>{" "}
                through biomes and watch them grow or decline.
              </li>
              <li>
                <span className="font-semibold text-orange-700">
                  Send a beacon
                </span>{" "}
                to other worlds to help cross dangerous biomes.
              </li>
              <li>
                <span className="font-semibold text-orange-700">Shape</span> the
                universe's fate with every decision.
              </li>
            </ul>
            <br />
            <Button
              onClick={handlePlayNow}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 text-yellow-900 font-bold text-lg shadow-md hover:from-yellow-500 hover:to-orange-400 transition"
              style={{
                boxShadow: "0 2px 8px 0 rgba(212, 165, 116, 0.25)",
                letterSpacing: "0.03em",
              }}
            >
              Play now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Main app content */}
      <div
        className="h-screen flex flex-col relative sand-bg"
        style={{
          background: '#f9e7b0',
        }}
      >

        {/* Multiple static cactus decorations */}
        <img src="/desert-cactus.png" alt="Cactus" className="absolute" style={{ bottom: 60, left: 80, width: 60, zIndex: 2, pointerEvents: "none" }} />
        <img src="/desert-cactus.png" alt="Cactus" className="absolute" style={{ bottom: 120, right: 120, width: 80, zIndex: 2, pointerEvents: "none", transform: "scaleX(-1)" }} />
        <img src="/desert-cactus.png" alt="Cactus" className="absolute" style={{ top: 80, left: 180, width: 50, zIndex: 2, pointerEvents: "none" }} />
        <img src="/desert-cactus.png" alt="Cactus" className="absolute" style={{ top: 40, right: 200, width: 70, zIndex: 2, pointerEvents: "none", transform: "scaleX(-1)" }} />
        <img src="/desert-cactus.png" alt="Cactus" className="absolute" style={{ bottom: 200, left: 320, width: 55, zIndex: 2, pointerEvents: "none" }} />
        <img src="/desert-cactus.png" alt="Cactus" className="absolute" style={{ top: 200, right: 320, width: 65, zIndex: 2, pointerEvents: "none", transform: "scaleX(-1)" }} />
        {/* Hidden audio element for background music */}
        <audio
          ref={audioRef}
          src="/desert.mp3"
          loop
          style={{ display: "none" }}
        />
        {/* Navbar with ConnectKitButton */}
        <nav className="flex justify-between items-center p-4">
          <div>
            <h1>Chainwalkers Universe</h1>
          </div>
          <div className="flex flex-row items-center gap-2">
            {chain && <p>{chain.name}</p>}
            <ConnectKitButton />
          </div>
        </nav>
        {!me && (
          <div className="p-4 border border-black flex flex-row items-center gap-2">
            <Select
              value={chain?.id === base.id ? "base" : "optimism"}
              onValueChange={(value) => {
                if (value === "base") {
                  switchChain({ chainId: base.id });
                } else {
                  switchChain({ chainId: optimism.id });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a world" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="optimism">Optimism</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                writeContract({
                  args: [address!],
                });
              }}
            >
              Start
            </Button>
          </div>
        )}
        <div className="flex flex-col border flex-1 justify-center overflow-x-auto relative z-10">
          {safeWorlds.map(({ id, chainId, players, biomes }) => {
            const isMyWorld = id === safeMe?.world?.id;
            const isMock = safeWorlds === MOCK_WORLDS;
            return (
              <div
                key={id}
                className={classNames({
                  "opacity-35": !isMyWorld,
                })}
              >
                <p className="text-gray-500">
                  Walker World: {truncateAddress(id)}
                </p>
                <div className="flex flex-row gap-6 py-4">
                  {biomes.map(({ growthRate, id, index }) => {
                    const isSelected = selectedBiome?.id === id;
                    const biomePlayers = players.filter(
                      (p) => Number(p.currentPosition) === index
                    );
                    if (isMock && biomePlayers.length === 0) {
                      return <div key={id} style={{ width: 280, height: 200, margin: '0 16px' }} />;
                    }
                    return (
                      <div
                        key={id}
                        className="flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
                        style={{ margin: "0 16px" }}
                        onClick={() => {
                          setSelectedBiome({
                            index,
                            chainId,
                            growthRate,
                            id,
                          });
                        }}
                      >
                        {biomePlayers.length > 0 ? (
                          biomePlayers.map((p, idx) => (
                            <div key={p.id || idx} className="flex flex-col items-center justify-center w-full">
                              <p className="text-xs text-yellow-900 mb-2 text-center font-semibold drop-shadow-sm">
                                {truncateAddress(p.id)}
                              </p>
                              <img
                                src="/group-of-more-people.png"
                                alt="Group of People"
                                style={{ width: 280, height: 200, objectFit: "contain", margin: "0 auto" }}
                              />
                              <p className="text-xs text-yellow-900 mt-2 text-center font-semibold">
                                {p.currentPopulation}
                              </p>
                            </div>
                          ))
                        ) : (
                          null
                        )}
                        {isSelected && (
                          <div className="flex flex-col p-2 gap-2 items-center justify-center">
                            <Button
                              size="sm"
                              onClick={() => {
                                writeMove({
                                  args: [address!, BigInt(index)],
                                });
                              }}
                            >
                              Move Here
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Hero character with speech bubble */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            pointerEvents: "none", // so it doesn't block UI
          }}
        >
          {/* Speech bubble */}
          <div
            style={{
              marginBottom: 8,
              background: "#fffbe8",
              color: "#7c4a03",
              borderRadius: 16,
              padding: "14px 20px",
              boxShadow: "0 2px 8px 0 rgba(139, 69, 19, 0.15)",
              fontWeight: 500,
              fontSize: 16,
              maxWidth: 260,
              textAlign: "left",
              border: "2px solid #ffe0a3",
              position: "relative",
              pointerEvents: "auto",
            }}
          >
            <span style={{ fontWeight: 700, color: "#e67e22" }}>
              Greetings, explorer!
            </span>{" "}
            Join us in the struggle for survival. Help others, grow stronger,
            and discover the crosschain secrets that bind our worlds.
            {/* Bubble tail */}
            <span
              style={{
                position: "absolute",
                bottom: -18,
                right: 32,
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "18px solid #fffbe8",
                filter: "drop-shadow(0 2px 2px rgba(139,69,19,0.10))",
              }}
            />
          </div>
          {/* Hero image */}
          <img
            src="/hero-nobg.png"
            alt="Desert Hero"
            style={{
              width: 180,
              height: "auto",
              display: "block",
              pointerEvents: "auto",
              userSelect: "none",
            }}
          />
        </div>
      )}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 18s linear infinite;
        }
        @keyframes cactus-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-cactus-bob {
          animation: cactus-bob 3.5s ease-in-out infinite;
        }
        .sand-bg {
          background-color: #f9e7b0;
          background-image:
            radial-gradient(rgba(245, 205, 120, 0.18) 1.5px, transparent 1.5px),
            radial-gradient(rgba(245, 205, 120, 0.12) 1.5px, transparent 1.5px);
          background-size: 32px 32px, 64px 64px;
          background-position: 0 0, 16px 16px;
        }
      `}</style>
    </>
  );
}
