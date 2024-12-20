'use server'

import {Auction, PagedResult} from "@/types";
import {fetchWrapper} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>>{
    return await fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    };

    return await fetchWrapper.put("auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654", data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
    return await fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
    return await fetchWrapper.del(`auctions/${id}`);
}

export async function createAuction(data: FieldValues) {
    return await fetchWrapper.post("auctions", data);
}