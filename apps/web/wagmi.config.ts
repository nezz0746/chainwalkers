import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import baseChainWalkerWorld from "../contracts/deployments/base-mainnet/ChainWalkerWorld.json";
import optimismChainWalkerWorld from "../contracts/deployments/optimism-mainnet/ChainWalkerWorld.json";
import { base, optimism } from "viem/chains";
import { Abi } from "viem";

const config = defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "ChainWalkerWorld",
      abi: baseChainWalkerWorld.abi as Abi,
      address: {
        [base.id]: baseChainWalkerWorld.address as `0x${string}`,
        [optimism.id]: optimismChainWalkerWorld.address as `0x${string}`,
      },
    },
  ],
  plugins: [react()],
});
export default config as any;
