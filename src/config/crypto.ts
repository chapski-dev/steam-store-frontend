import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia, base, optimism],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})