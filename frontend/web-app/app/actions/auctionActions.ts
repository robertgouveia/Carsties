'use server'

import {Auction, PagedResult} from "@/types";
import {auth} from "@/auth";

export async function getData(query: string): Promise<PagedResult<Auction>>{
    const res = await fetch(`http://localhost:6001/search${query}`, {
        cache: "force-cache"
    });

    if (!res.ok) throw new Error("Failed to get data");

    return res.json();
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    };

    const session = await auth();

    // Only works for Bob
    const res = await fetch(`http://localhost:6001/auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) return {status: res.status, message: res.statusText};

    return res.statusText;
}