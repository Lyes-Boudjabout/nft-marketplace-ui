"use client"

import { ChangeEvent, useState } from "react"
import { RiCakeLine } from "react-icons/ri"

export default function CakeNFT() {
    const [cakeTokenId, setCakeTokenId] = useState('');

    return (
        <section className="flex justify-center items-center">
            <div className="border rounded-xl border-pink-600 shadow-xl shadow-pink-600 w-1/3 p-6 space-y-4 mt-20">
                <h1 className="font-bold text-3xl">Cake NFT Bakery</h1>
                <div className="border rounded-xl border-gray-400 p-4 space-y-2">
                    <h1 className="">Bake a New Cake NFT</h1>
                    <button 
                        className="flex justify-center items-center space-x-2 border border-pink-500 rounded-lg w-full py-2 bg-pink-500 text-white text-xl cursor-pointer shadow-md hover:shadow-xl hover:shadow-pink-300 transition-shadow"
                    >
                        <RiCakeLine size={20}/>
                        <span>Bake a Cake NFT</span>
                    </button>
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setCakeTokenId(event.target.value)
                        }}
                        className="border border-gray-400 outline-none shadow-md focus:shadow-xl focus:shadow-pink-300 transition-shadow w-full px-4 py-2 rounded-lg mb-3"
                     />
                </div>
            </div>
        </section>
    )
}