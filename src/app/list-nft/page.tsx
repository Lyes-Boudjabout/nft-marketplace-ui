"use client"

import { ChangeEvent, useEffect, useState } from "react";

export default function ListNFT() {
    const [nftContractAddress, setNftContractAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [priceInUsdc, setPriceInUsdc] = useState("");
    const [success, setSuccess] = useState(false); 
    const [error, setError] = useState(false); 

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(nftContractAddress === "" || tokenId === "" || priceInUsdc === "") {
            setError(true);
            return;
        }
        setSuccess(true);
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]);
    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <section className="mx-130">
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
                        {success && 
                            <div className="flex justify-center rounded-3xl bg-green-100 text-green-500 mt-10 mb-5 ml-2 mr-140 p-4">
                                ✅ Listed Successfully !
                            </div>
                        }
                        {error && 
                            <div className="flex justify-center rounded-3xl bg-red-100 text-red-500 mt-10 mb-5 ml-2 mr-120 p-4">
                                🚫 Verify the provided inputs !
                            </div>
                        }
                        <div className="flex justify-between space-x-8 mt-10 mb-5 mx-2 text-white">
                            <button 
                                className="border border-blue-600 bg-blue-600 rounded-lg px-6 py-2 w-1/2 cursor-pointer shadow hover:shadow-xl hover:shadow-neutral-400 transition-shadow"
                                type="submit"
                            >
                                List Token
                            </button>
                            <button 
                                className="border border-blue-600 bg-blue-600 rounded-lg px-6 py-2 w-1/2 cursor-pointer shadow hover:shadow-xl hover:shadow-neutral-400 transition-shadow"
                                type="button"
                            >
                                Preview Token
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}