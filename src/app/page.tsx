"use client"

import { useAccount, useChainId } from "wagmi";
import RequireWalletConnect from "@/components/RequireWalletConnect";
import { JSX, useEffect, useState } from "react";
import { NFT } from "../../types";
import Link from "next/link";
import TokenContainer from "@/components/TokenContainer";
import { chainsToContracts, tokens } from "../../constants";
import DeniedAccess from "@/components/DeniedAccess";

export default function Home() {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);
  const [isCompliant, setIsCompliant] = useState(false);

  async function checkCompliance() {
    if (!address) return;
    const response = await fetch("/api/compliance", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address })
    });
    const result = await response.json();
    setIsCompliant(result.success && result.isApproved);
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (address) {
      checkCompliance();
    }
  }, [address]);

  if (!hasMounted) return null;

  const supportedChain = chainsToContracts[chainId];

  let content: JSX.Element;

  if (!isConnected) {
    content = <RequireWalletConnect />;
  } else if (!isCompliant) {
    content = <DeniedAccess />;
  } else {
    content = (
      <section className="m-6">
        <div className="flex justify-center items-center mt-20">
          <Link href="/list-nft">
            <button className="border border-blue-600 bg-blue-600 rounded-lg text-white font-medium py-3 px-6 text-xl cursor-pointer shadow-md shadow-neutral-400 hover:shadow-xl hover:shadow-neutral-600 transition-shadow">
              List Your NFT
            </button>
          </Link>
        </div>

        <h1 className="text-blue ml-10 mt-10 font-extrabold text-4xl">
          Recently Listed NFTs
        </h1>

        <div className="flex justify-items-start flex-wrap space-x-8 border-3 bg-white border-blue-600 shadow-2xl shadow-blue-600 rounded-4xl p-8 mt-12 mx-30">
          {supportedChain ? (
            tokens.map((element: NFT, index: number) => (
              <TokenContainer key={index} nft={element} isLink={true} />
            ))
          ) : (
            <div className="flex justify-center items-center w-full text-2xl px-20 py-40">
              <span>⚠️ Please switch into a supported chain (Anvil: chainId = 31337)</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  return <main>{content}</main>;
}
