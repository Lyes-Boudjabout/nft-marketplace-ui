import Link from "next/link";
import { NFT } from "../../types";

export default function TokenContainer({ nft }: {nft: NFT}) {
    return (
        <Link href={`/buy-nft/${nft.contractAddress}/${nft.tokenNumber}`}>
            <div 
                className="hover:shadow-2xl transition-shadow hover:cursor-pointer border shadow-lg shadow-neutral-700 rounded-lg bg-[#F7EDD9] text-blue h-120 w-120 p-0 overflow-hidden mb-8"
                role="button"
                tabIndex={nft.tokenNumber}
            >
                <div className="flex justify-center items-center w-full h-2/3 bg-white">
                    Picture
                </div>
                <div className="w-full h-1/3 p-10">
                    <h1>{`Token #${nft.tokenNumber}`}</h1>
                    <p>Contract:</p>
                    <p>{nft.contractAddress}</p>
                </div>
            </div>
        </Link>
    )
}