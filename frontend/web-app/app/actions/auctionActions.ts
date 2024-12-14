'use server'

import {Auction, PagedResult} from "@/types";

export async function getData(query: string): Promise<PagedResult<Auction>>{
    const res = await fetch(`http://localhost:6001/search${query}`, {
        cache: "force-cache"
    });

    if (!res.ok) throw new Error("Failed to get data");

    return res.json();
}