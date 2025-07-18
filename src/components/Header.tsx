"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useAccount } from "wagmi";

export default function Header() {
    const { isConnected } = useAccount();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;
    
    return (
        <header className="flex justify-between items-center p-5 bg-[#F7EDD9] shadow-md">
            <div className="flex justify-center items-center space-x-4 text-xl">
                <Image
                    height={50}
                    width={50}
                    src={"/favicon.png"}
                    alt="NFT Marketplace"
                />
                <h1 className="font-bold">
                    <Link href="/">
                        NFT MarketPlace
                    </Link>
                </h1>
                <a 
                    href="https://github.com/Lyes-Boudjabout/nft-marketplace-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-600 transition-colors"
                >
                    <FaGithub size={30}/>
                </a>
            </div>
            <p className="text-base">
                <em>
                    A non-custodial, permissionless NFT Marketplace
                </em>
            </p>
            <div className="flex justify-center items-center space-x-4">
                {isConnected && 
                    <button 
                        className="bg-white px-6 py-2 rounded-xl shadow-lg hover:shadow-md hover:shadow-neutral-600 transition-shadow"
                    >
                        <Link href="/cake-nft">
                            Cake NFT
                        </Link>
                    </button>}
                <ConnectButton/>
            </div>
        </header>
    )
}
