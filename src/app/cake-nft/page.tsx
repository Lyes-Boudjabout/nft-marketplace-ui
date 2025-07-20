"use client"

import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react"
import { CgSpinner } from "react-icons/cg";
import { RiCakeLine, RiErrorWarningFill } from "react-icons/ri"
import { useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { cakeAbi, chainsToContracts, supportedChainIds } from "../../../constants";
import Image from "next/image";

export default function CakeNFT() {
    const chainId: number | undefined = useChainId();
    const [warning, setWarning] = useState(false);
    const [cakeTokenId, setCakeTokenId] = useState('');
    const [lastMintedTokenId, setLastMintedTokenId] = useState('');

    const cakeContractAddress = !warning && chainId && chainsToContracts[chainId] ? chainsToContracts[chainId].cakeNft : "";

    const readTokenUri = useReadContract({
        address: chainId && chainsToContracts[chainId] ? chainsToContracts[chainId].cakeNft as `0x${string}` : undefined,
        abi: cakeAbi,
        functionName: "tokenURI",
        args: cakeTokenId !== "" && !isNaN(Number(cakeTokenId)) ? [Number(cakeTokenId)] : undefined,
    });
    const tokenUri = readTokenUri.data as string;


    const readTokenCount = useReadContract({
        abi: cakeAbi,
        address: chainId && chainsToContracts[chainId] ? chainsToContracts[chainId].cakeNft as `0x${string}` : undefined,
        functionName: "getTokenCounter",
        args: [],
    });
    const tokenCount = readTokenCount.data as number;


    let decodedImageUri = useMemo(() => {
        if (!tokenUri) return null;
        const base64Json = tokenUri.split(',')[1];
        const jsonMetadata = JSON.parse(atob(base64Json));
        return jsonMetadata.image; // data:image/svg+xml;base64,...
    }, [tokenUri]);

    const {
        data: bakeCakeHash,
        isPending: isBakePending,
        isError: isBakeCakeError,
        error: bakeCakeError,
        writeContractAsync: writeBakeCakeAsync,
    } = useWriteContract();

    const {
        isLoading: isBakeConfirming,
        isSuccess: isBakeConfirmed,
        isError: isBakeError,
        data: dataFromBakeReceipt,
    } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: bakeCakeHash,
    })

    async function handleBakeCake() {
        try {
            const txHash = await writeBakeCakeAsync({
                abi: cakeAbi,
                address: cakeContractAddress as `0x${string}`,
                functionName: "bakeCake",
                args: [],
            })
            console.log("Bake cake transaction submitted:", txHash)
        } catch (error) {
            console.error("Error baking cake:", error)
        }
    }

    function getButtonContent() {
        if (isBakePending) {
            return (
                <>
                    <CgSpinner className="animate-spin" size={20}/>
                    <span>Confirming in Wallet...</span>
                </> as ReactNode
            )
        }
        if(isBakeCakeError || isBakeError) {
            return (
                <>
                    <RiErrorWarningFill size={20}/>
                    <span>Baking Error, check console</span>
                </> as ReactNode
            )
        }
        if (isBakeConfirming) {
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <CgSpinner className="animate-spin" size={20} />
                    <span>Baking your cake NFT...</span>
                </div>
            )
        }
        return (
            <>
                <RiCakeLine size={20}/>
                <span>Bake a Cake NFT</span>
            </>
        ) as ReactNode
    }

    useEffect(() => {
        if (typeof chainId !== "number") return;

        const isSupported = supportedChainIds.includes(chainId);
        setWarning(!isSupported);
    }, [chainId]);

    useEffect(() => {
        console.dir(dataFromBakeReceipt)
        if (isBakeConfirmed && bakeCakeHash) {
            const hexTokenIdFromReceipt = dataFromBakeReceipt.logs[1].topics[1]
            const intTokenIdFromReceipt = parseInt(hexTokenIdFromReceipt!, 16)
            setLastMintedTokenId(`TokenID: ${intTokenIdFromReceipt}`)
        }
    }, [isBakeConfirmed, bakeCakeHash]);

    useEffect(() => {
        if (lastMintedTokenId) {
            const timer = setTimeout(() => {
                setLastMintedTokenId("");
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [lastMintedTokenId]);
    
    return (
        <section className="flex justify-center items-center">
            <div className="border rounded-xl border-pink-600 shadow-xl shadow-pink-600 w-1/3 p-6 space-y-4 mt-20">
                <h1 className="font-bold text-3xl">Cake NFT Bakery</h1>
                <div className="border rounded-xl border-gray-400 p-4 space-y-2">
                    <h1>{`Bake a New Cake NFT (token count: ${tokenCount})`}</h1>
                    <button 
                        className="flex justify-center items-center space-x-2 border border-pink-500 rounded-lg w-full py-2 bg-pink-500 text-white text-xl cursor-pointer shadow-md hover:shadow-xl hover:shadow-pink-300 transition-shadow"
                        onClick={handleBakeCake}
                        disabled={warning || isBakeError || isBakeCakeError}
                    >
                        {getButtonContent()}
                    </button>
                    {warning &&
                        <div>
                            ⚠️ Please switch to a supported chain
                        </div>
                    }
                    {lastMintedTokenId && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700">
                                <span className="font-medium">Successfully minted!</span>
                                <br />
                                {lastMintedTokenId}
                            </p>
                        </div>
                    )}
                </div>
                <div className="border border-gray-400 rounded-xl p-4 space-y-2">
                    <h1 className="text-xl">View an NFT</h1>
                    <label htmlFor="cakeTokenId">Token ID</label><br />
                    <input 
                        type="text" 
                        name="cakeTokenId"
                        id="cakeTokenId" 
                        placeholder="Enter token ID"
                        value={cakeTokenId}
                        disabled={warning}
                        onChange={
                            (event: ChangeEvent<HTMLInputElement>) => {
                                setCakeTokenId(event.target.value)
                            }
                        }
                        className="border border-gray-400 outline-none shadow-md focus:shadow-xl focus:shadow-pink-300 transition-shadow w-full px-4 py-2 rounded-lg mb-3"
                     />
                </div>
                {decodedImageUri &&
                    <div className="border border-gray-400 rounded-xl p-4">
                        <div className="flex justify-center items-center">
                            <Image
                                width={400}
                                height={400}
                                src={decodedImageUri}
                                alt="Cake NFT"
                            />
                        </div>
                        <h1 className="flex justify-center text-xl text-gray-500">{`NFT #${cakeTokenId}`}</h1>
                    </div>
                }
            </div>
        </section>
    )
}