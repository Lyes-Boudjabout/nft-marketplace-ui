"use client"

import { useAccount } from "wagmi";
import RequireWalletConnect from "@/components/RequireWalletConnect";
import { JSX, useEffect, useState } from "react";
import { NFT } from "../../types";
import Link from "next/link";
import TokenContainer from "@/components/TokenContainer";

export default function Home() {
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const tokens: NFT[] = [
    {
      seller: "0x551C7733E5ff92F5fFFb7d2f78D306176774D218",
      tokenNumber: 1,
      contractAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      tokenPrice: 10000
    },
    {
      seller: "0x551C7733E5ff92F5fFFb7d2f78D306176774D218",
      tokenNumber: 2,
      contractAddress: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      tokenPrice: 20000
    },
    {
      seller: "0x551C7733E5ff92F5fFFb7d2f78D306176774D218",
      tokenNumber: 3,
      contractAddress: "0x551C7733E5ff92F5fFFb7d2f78D306176774D218",
      tokenPrice: 15000
    },
    {
      seller: "0x551C7733E5ff92F5fFFb7d2f78D306176774D218",
      tokenNumber: 4,
      contractAddress: "0x134957623cd7a15C25907acD220a984D79A25516",
      tokenPrice: 9000
    },
  ]

  if (!hasMounted) return null;

  return (
    <main>
      {!isConnected ? <RequireWalletConnect/> : 
        <section className="m-6">
          <div className="flex justify-center items-center mt-20">
            <button
              className="border border-blue-600 bg-blue-600 rounded-lg text-white font-medium py-3 px-6 text-xl cursor-pointer shadow-md shadow-neutral-400 hover:shadow-xl hover:shadow-neutral-600 transition-shadow"
            >
              <Link href="/list-nft">
                List Your NFT
              </Link>
            </button>
          </div>
          <h1 className="text-blue ml-10 mt-10 font-extrabold text-4xl">
            Recently Listed NFTs
          </h1>
          <div className="flex justify-between flex-wrap space-x-8 border-3 bg-white border-blue-600 shadow-2xl shadow-blue-600 rounded-lg p-8 mt-12 mx-30">
            {tokens.map((element: NFT, index: number): JSX.Element => 
              <TokenContainer key={index} nft={element}/>
            )}
          </div>
        </section>
      }
    </main>
  );
}
