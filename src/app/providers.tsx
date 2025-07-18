"use client"

import { WagmiProvider } from "wagmi";
import config from '../rainbowKitConfig';
import { ReactNode, useState } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}