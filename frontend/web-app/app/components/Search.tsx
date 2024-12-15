'use client'

import {FaSearch} from "react-icons/fa";
import {useParamsStore} from "@/hooks/useParamsStore";
import {ChangeEvent} from "react";
import {useRouter} from "next/navigation";

export default function Search() {
    const router = useRouter();
    const setParams = useParamsStore(state => state.setParams);
    const setSearch = useParamsStore(state => state.setSearch);
    const value = useParamsStore(state => state.searchValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
    const search = () => {
        setParams({searchTerm: value});
        router.push("/");
    }

    return (
        <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
            <input
                type="text"
                placeholder="Search for cars by make, model or color"
                className="flex-grow pl-5 bg-transparent focus:outline-0 border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-600"
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key == "Enter") search();
                }}
                value={value}
            />
            <button onClick={search}>
                <FaSearch size={34} className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"/>
            </button>
        </div>
    )
}