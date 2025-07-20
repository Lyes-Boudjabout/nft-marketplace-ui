"use client"

import TokenContainer from "@/components/TokenContainer";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { NFT } from "../../../types";

export default function ListNFT() {
    const [nftContractAddress, setNftContractAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [priceInUsdc, setPriceInUsdc] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(nftContractAddress === "" || isNaN(Number(tokenId)) || isNaN(Number(priceInUsdc))) {
            setError(true);
            return;
        }
        setShowPreview(true);
    }

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowPreview(false);
    };

    const handleList = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSuccess(true)
    }
    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);
    
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]); 

    return (
        <section className={`mx-130 ${showPreview ? "flex justify-center items-center" : ""}`}>
            {!showPreview ? 
                <div className="mt-35">
                    <h1 className="font-bold text-4xl">List Your NFT for Sale</h1>
                    <div className="text-xl rounded-lg mt-10 shadow-lg shadow-neutral-400 bg-white">
                        <form
                            onSubmit={(e: React.FormEvent) => handleSubmit(e)}
                            className="border border-blue-600 shadow-2xl shadow-blue-300 rounded-lg p-5"
                        >
                            <div className="mr-4">
                                <label 
                                    htmlFor="nftContractAddress"
                                    className="ml-2"
                                >
                                    NFT Contract Address
                                </label><br/>
                                <input
                                    type="text"
                                    placeholder="0x"
                                    id="nftContractAddress"
                                    value={nftContractAddress}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setNftContractAddress(event.target.value)
                                    }}
                                    className="border border-neutral-400 focus:outline-none focus:border-blue-600 focus:shadow-md focus:shadow-blue-300 transition-shadow rounded-lg py-1 px-2 m-2 w-full"
                                />
                            </div>
                            <div className="mr-4">
                                <label
                                    htmlFor="tokenId"
                                    className="ml-2"
                                >
                                    Token ID
                                </label><br/>
                                <input
                                    type="text" 
                                    placeholder="1" 
                                    id="tokenId"
                                    value={tokenId}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setTokenId(event.target.value)
                                    }}
                                    className="border border-neutral-400 focus:outline-none focus:border-blue-600 focus:shadow-md focus:shadow-blue-300 transition-shadow rounded-lg py-1 px-2 m-2 w-full"
                                />
                            </div>
                            <div className="mr-4">
                                <label
                                    htmlFor="priceInUsdc"
                                    className="ml-2"
                                >
                                    Price (USDC)
                                </label><br/>
                                <input 
                                    type="text" 
                                    placeholder="0.1" 
                                    id="priceInUsdc"
                                    value={priceInUsdc}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setPriceInUsdc(event.target.value)
                                    }}
                                    className="border border-neutral-400 focus:outline-none focus:border-blue-600 focus:shadow-md focus:shadow-blue-300 transition-shadow rounded-lg py-1 px-2 m-2 w-full"
                                />
                            </div>
                            {error && 
                                <div className="flex justify-center rounded-3xl bg-red-100 text-red-500 mt-10 mb-5 ml-2 mr-120 p-4">
                                    🚫 Verify the provided inputs !
                                </div>
                            }
                            <div className="flex justify-between mt-10 mb-5 mx-2 text-white">
                                <button 
                                    className="border border-blue-600 bg-blue-600 rounded-lg px-6 py-2 w-full cursor-pointer shadow hover:shadow-xl hover:cursor-pointer hover:shadow-neutral-400 transition-shadow"
                                    type="submit"
                                >
                                    Preview Listing
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            :
                <div className="border border-blue-500 shadow-blue-600 shadow-2xl rounded-lg p-10 mt-35">
                    <h1 className="font-bold text-2xl mb-5">NFT Preview</h1>
                    <TokenContainer nft={
                        {
                            seller: "0x551C7733E5ff92F5fFFb7d2f78D306176774D218",
                            tokenNumber: Number(tokenId),
                            contractAddress: nftContractAddress,
                            tokenPrice: Number(priceInUsdc)
                        } as NFT
                    } isLink={false} />
                    <div className="flex space-x-10 mt-10">
                        <button
                            className="border border-gray-400 bg-gray-200 rounded-lg py-2 px-6 shadow-md shadow-gray-500 hover:shadow-xl hover:cursor-pointer transition-shadow w-1/2"
                            role="button"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button 
                            className="border border-blue-600 rounded-lg py-2 px-6 shadow-md shadow-blue-600 hover:shadow-xl hover:cursor-pointer transition-shadow w-1/2 bg-blue-600 text-white"
                            role="button"
                            onClick={handleList}
                        >
                            List NFT
                        </button>
                    </div>
                    {success && 
                        <div className="flex justify-center space-x-3 bg-green-200 text-green-500 mt-7 p-4 rounded-3xl mr-40">
                            <p>✅</p>
                            <span>NFT listed for sale successfully !</span>
                        </div>
                    }
                </div>
            }
        </section>
    )
}