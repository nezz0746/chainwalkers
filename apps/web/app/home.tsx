"use client";

import { ConnectKitButton } from "connectkit";
import { useQuery } from "@tanstack/react-query";
import { GameApi } from "../src/services/api";
import chroma from "chroma-js";

const growingColor = "#00ff00";
const declineColor = "#ff0000";

export default function Home() {
  const { data: worlds } = useQuery({
    queryKey: ["worlds"],
    queryFn: () => {
      return new GameApi().worlds();
    },
  });

  return (
    <div className="h-screen flex flex-col">
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
                const color = chroma
                  .scale([declineColor, growingColor])
                  .mode("rgb")(growthRate / 100)
                  .hex();
                console.log({ color, growthRate });
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
  );
}
