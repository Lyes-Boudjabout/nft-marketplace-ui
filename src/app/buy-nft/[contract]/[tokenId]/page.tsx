"use client"

import { useParams } from 'next/navigation';

export default function BuyTokenCard() {
    const { tokenId, contract } = useParams();

    return (
        <section>
            <div>{`Token #${tokenId}`}</div>
            <div>{`Contract Address: ${contract}`}</div>
        </section>
    )
}