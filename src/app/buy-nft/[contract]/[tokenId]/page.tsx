"use client"

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { cakeAbi, chainsToContracts, tokens } from '../../../../../constants';
import { useMemo, useState } from 'react';
import { NFT } from '../../../../../types';
import Link from 'next/link';
import { CgDarkMode } from 'react-icons/cg';

export default function BuyTokenCard() {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { tokenId } = useParams();
    const [isDark, setIsDark] = useState(false);
    const zeroAddress: `0x${string}` = "0x00000000000000000000000000000000000000";

    const readTokenUri = useReadContract({
        address: chainId && chainsToContracts[chainId] ? chainsToContracts[chainId].cakeNft as `0x${string}` : undefined,
        abi: cakeAbi,
        functionName: "tokenURI",
        args: tokenId !== "" && !isNaN(Number(tokenId)) ? [Number(tokenId)] : undefined,
    });
    const tokenUri = readTokenUri.data as string;

    let decodedImageUri = useMemo(() => {
        if (!tokenUri) return null;
        const base64Json = tokenUri.split(',')[1];
        const jsonMetadata = JSON.parse(atob(base64Json));
        return jsonMetadata.image; // data:image/svg+xml;base64,...
    }, [tokenUri]);

    const token: NFT | undefined = tokens.find((value: NFT) => value.tokenNumber === Number(tokenId))

    return (
        <section className={`justify-center items-center py-20 px-102`}>
            <h1 className='text-4xl font-bold'>Buy NFT</h1>
            <div className={`border border-gray-400 shadow-md shadow-gray-500 rounded-2xl mt-10 p-10 ${isDark ? "bg-black" : "bg-white"} transition-colors`}>
                <div className='flex justify-between items-center'>
                    <h1 className={`text-2xl ${!isDark ? "text-gray-600" : "text-white"}`}>NFT Details</h1>
                    {chainId && chainsToContracts[chainId] ?
                        <div/>
                        :
                        <div className='text-lg'>
                            ⚠️ Please switch to a supported chain
                        </div>
                    }
                    <button 
                        className={`flex space-x-2 border py-2 px-4 rounded-xl ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors `}
                        onClick={() => setIsDark(!isDark)}
                    >
                        <CgDarkMode size={24}/>
                        <span>Dark Mode</span>
                    </button>
                </div>
                <hr className='my-8 border-gray-400'/>
                <div className='flex'>
                    <div className={`border border-gray-400 rounded-2xl ${decodedImageUri ? "" : "bg-[#F7EDD9]"}`}>
                        <Image
                            width={400}
                            height={400}
                            src={decodedImageUri || "/placeholder.png"}
                            alt='NFT Image'
                        />
                        <div className='flex justify-center items-center space-x-3'>
                            <h1 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-500"} transition-colors`}>Price: </h1>
                            <div className='flex justify-center bg-blue-600 text-white shadow-md shadow-blue-400 px-5 py-2 rounded-2xl text-lg'>
                                {chainId && chainsToContracts[chainId] ? token?.tokenPrice + " USDC" : "undefined"}
                            </div>
                        </div>
                    </div>
                    <div className={`border border-gray-400 rounded-2xl p-10 ml-20 text-lg space-y-8 w-1/2 mb-19 ${isDark ? "text-white" : "text-black"} transition-colors`}>
                        <div className='space-y-1 break-words'>
                            <p className='font-bold'>Contract Address:</p>
                            <p>{chainId && chainsToContracts[chainId] ? token?.contractAddress : zeroAddress}</p>
                            
                            
                        </div>
                        <div className='space-y-1'>
                            <p className='font-bold'>Token ID:</p>
                            <p>{chainId && chainsToContracts[chainId] ? tokenId : "undefined"}</p>
                        </div>
                        <div className='space-y-1 break-words'>
                            <p className='font-bold'>Seller:</p>
                            <p>{chainId && chainsToContracts[chainId] ? token?.seller : zeroAddress}</p>
                        </div>
                        <div className='w-full space-y-4'>
                            <button
                                className='border border-blue-600 bg-blue-600 shadow-md shadow-blue-400 hover:shadow-xl transition-shadow text-white rounded-2xl w-full py-2 px-4 cursor-pointer'
                                disabled={!chainId || !chainsToContracts[chainId]}
                                onClick={() => console.log("enabled")}
                            >
                                Approve payment token
                            </button>
                            <button
                                className={`border border-gray-200 bg-gray-200 shadow-md shadow-gray-400 hover:shadow-xl transition-shadow rounded-2xl w-full py-2 px-4 cursor-pointer ${isDark && "text-black"}`}
                            >
                                <Link href='/'>
                                    Back To Marketplace
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}