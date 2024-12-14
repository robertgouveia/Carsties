'use client'

import AuctionCard from "@/app/auctions/AuctionCard";
import {Auction, PagedResult} from "@/types";
import AppPagination from "@/app/components/AppPagination";
import {getData} from "@/app/actions/auctionActions";
import {useEffect, useState} from "react";
import Filters from "@/app/auctions/Filters";
import {useParamsStore} from "@/hooks/useParamsStore";
import {useShallow} from "zustand/react/shallow";
import qs from "query-string";
import EmptyFilter from "@/app/components/EmptyFilter";

export default function Listings() {
    const [data, setData] = useState<PagedResult<Auction>>();
    // Shallow allows for collecting certain params
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy
    })));
    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: "", query: params});
    const setPageNumber = (pageNumber: number)=> setParams({pageNumber});

    useEffect(() => {
        getData(url).then(data => setData(data));
    }, [url])

    if (!data) return <div>Loading...</div>

    return (
        <>
            <Filters />
            {data.totalCount === 0 ? <EmptyFilter showReset/> : (
                <>
                    <div className="grid grid-cols-4 gap-6">
                        {data.results.map(auction => (<AuctionCard auction={auction} key={auction.id}/>))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount}
                                       pageChanged={setPageNumber}/>
                    </div>
                </>
            )}
        </>
    );
}