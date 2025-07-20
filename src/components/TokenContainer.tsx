"use client"

import Link from "next/link";
import { NFT } from "../../types";
import { useChainId, useReadContract } from "wagmi";
import { cakeAbi, chainsToContracts } from "../../constants";
import Image from "next/image";

export default function TokenContainer(props: {nft: NFT, isLink: boolean}) {
    const chainId = useChainId();
    const tokenURI: string = chainId && chainsToContracts[chainId] ? useReadContract({
        abi: cakeAbi,
        address: chainsToContracts[chainId].cakeNft as `0x${string}`,
        functionName: "tokenURI", 
        args: [props.nft.tokenNumber]
    }).data as string : "";

    function getSvgImage() {
        if (!tokenURI) return null;
        const base64Json = tokenURI.split(',')[1];
        const jsonMetadata = JSON.parse(atob(base64Json));
        return jsonMetadata.image;
    }

    return (props.isLink === true ? 
        <Link href={`/buy-nft/${props.nft.contractAddress}/${props.nft.tokenNumber}`}>
            <div 
                className="hover:shadow-2xl transition-shadow hover:cursor-pointer border shadow-lg shadow-neutral-700 rounded-2xl bg-[#F7EDD9] text-blue h-120 w-120 p-0 overflow-hidden mb-8"
                tabIndex={props.nft.tokenNumber}
            >
                {tokenURI ? 
                    <div className="flex justify-center items-center w-full h-2/3 bg-white">
                        <Image
                            width={300}
                            height={300}
                            src={getSvgImage()}
                            alt={`Token #${props.nft.tokenNumber}`}
                        />
                    </div> :
                    <div className="flex justify-center items-center w-full h-2/3 bg-[#F7EDD9]">
                        <Image
                            width={300}
                            height={300}
                            src={"/placeholder.png"}
                            alt={`Token #${props.nft.tokenNumber}`}
                        />
                    </div>
                }
                <div className="w-full h-1/3 p-10">
                    <div className="flex justify-between items-center">
                        <h1>{`Token #${props.nft.tokenNumber}`}</h1>
                        <div className="border border-blue-600 shadow-xl text-lg rounded-xl bg-blue-600 text-white py-2 px-4 mb-0">
                            <p>{props.nft.tokenPrice} USDC</p>
                        </div>
                    </div>
                <p>Contract:</p>
                <p>{props.nft.contractAddress}</p>
            </div>
            </div>
        </Link>
        :
        <div 
            className="border shadow-lg shadow-neutral-700 rounded-2xl bg-[#F7EDD9] text-blue h-120 w-120 p-0 overflow-hidden mb-8"
            tabIndex={props.nft.tokenNumber}
        >
            <div className="flex justify-center items-center w-full h-2/3 bg-white">
                <Image
                    width={300}
                    height={300}
                    src={getSvgImage()}
                    alt={`Token #${props.nft.tokenNumber}`}
                />
            </div>
            <div className="w-full h-1/3 p-10">
                <div className="flex justify-between items-center">
                    <h1>{`Token #${props.nft.tokenNumber}`}</h1>
                    <div className="border border-blue-600 shadow-xl text-lg rounded-xl bg-blue-600 text-white py-2 px-4 mb-0">
                        <p>{props.nft.tokenPrice} USDC</p>
                    </div>
                </div>
                <p>Contract:</p>
                <p>{props.nft.contractAddress}</p>
            </div>
        </div>
    )
}