"use client";

import { ConnectKitButton } from "connectkit";
import { useQuery } from "@tanstack/react-query";
import { GameApi } from "../src/services/api";
import chroma from "chroma-js";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../src/components/ui/dialog";
import { Button } from "../src/components/ui/button";

const growingColor = "#00ff00";
const declineColor = "#ff0000";

export default function Home() {
  const { data: worlds } = useQuery({
    queryKey: ["worlds"],
    queryFn: () => {
      return new GameApi().worlds();
    },
  });

  // Modal and audio state
  const [open, setOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

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

  return (
    <>
      {/* Modal for instructions and lore (moved outside flex container) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-md w-full rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 border-2 border-yellow-300 p-8 relative flex flex-col items-center justify-center"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 9999,
            width: "100vw",
            maxWidth: "28rem", // matches max-w-md
            boxShadow:
              "0 8px 32px 0 rgba(139, 69, 19, 0.25), 0 1.5px 8px 0 rgba(212, 165, 116, 0.15)",
            background: "linear-gradient(135deg, #fdf6e3 0%, #fbe7c6 100%)",
            margin: 0,
            padding: 20,
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-extrabold text-yellow-900 drop-shadow-sm mb-2 tracking-wide">
              Welcome to
              <br />
              <span className="text-orange-700">Chainwalkers Universe</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 text-center">
            <p className="text-base text-yellow-900 font-medium leading-relaxed">
              Embark on a journey across the{" "}
              <span className="font-semibold text-orange-700">
                Chainwalkers Universe
              </span>
              !<br />
              <span className="text-yellow-800">
                Explore biomes, grow your influence, and uncover the secrets of
                the desert.
              </span>
            </p>
            <ul className="text-left mx-auto max-w-xs text-sm list-disc list-inside text-yellow-800 space-y-1">
              <li>
                <span className="font-semibold text-orange-700">Move</span>{" "}
                through biomes and watch them grow or decline.
              </li>
              <li>
                <span className="font-semibold text-orange-700">Connect</span>{" "}
                your wallet to interact with the world.
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
          <div
            className="absolute -top-8 -right-8  pointer-events-none select-none"
            aria-hidden="true"
          >
            <img src="/desert-cactus.png" alt="" className="w-24 h-24" />
          </div>
          <div
            className="absolute -bottom-8 -left-8  pointer-events-none select-none"
            aria-hidden="true"
          >
            <img src="/desert-cactus.png" alt="" className="w-20 h-20" />
          </div>
        </DialogContent>
      </Dialog>
      {/* Main app content */}
      <div className="h-screen flex flex-col">
        {/* Hidden audio element for background music */}
        <audio
          ref={audioRef}
          src="/desert.mp3"
          loop
          style={{ display: "none" }}
        />
        {/* Navbar with ConnectKitButton */}
        <nav className="flex justify-between items-center p-4 border border-red-500">
          <div>
            <h1>Chainwalkers Universe</h1>
          </div>
          <ConnectKitButton />
        </nav>
        <div className="flex flex-col border flex-1 justify-center overflow-x-auto">
          {worlds?.map((world) => (
            <div key={world.id}>
              <div className="flex flex-row">
                {world.biomes.map(({ growthRate, id }) => {
                  const color = growthRate > 0 ? growingColor : declineColor;
                  return (
                    <div
                      key={id}
                      className="w-50 h-50 aspect-square border"
                      style={{ backgroundColor: color }}
                    >
                      H
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Hero character with speech bubble */}
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
          Join us in the struggle for survival. Help others, grow stronger, and
          discover the crosschain secrets that bind our worlds.
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
    </>
  );
}
