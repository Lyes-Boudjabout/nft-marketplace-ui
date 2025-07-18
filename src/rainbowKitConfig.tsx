import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base, anvil, zksync, sepolia } from "wagmi/chains";

export default getDefaultConfig({
    appName: 'NFT Marketplace',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, polygon, optimism, arbitrum, base, anvil, zksync, sepolia],
    ssr: false,
})