import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import chainWalkerWorld from '../contracts/deployments/base-mainnet/ChainWalkerWorld.json'
import { Abi } from 'viem'

const config = defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'ChainWalkerWorld',
      abi: chainWalkerWorld.abi as Abi,
      address: chainWalkerWorld.address as `0x${string}`,
    },
  ],
  plugins: [
    react(),
  ],
})
export default config as any