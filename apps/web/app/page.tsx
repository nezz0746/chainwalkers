"use client"

import Home from "./home";
import { Web3Provider } from "./Web3Provider";

export default function App() {
  return (
    <Web3Provider>
      <Home />
    </Web3Provider>
  )
}