'use client'

import {Pagination} from "flowbite-react";

type Props = {
    currentPage: number,
    pageCount: number,
    pageChanged: (page: number) => void;
}

export default function AppPagination(props: Props) {
    return (
        <Pagination
            currentPage={props.currentPage}
            onPageChange={(e) => props.pageChanged(e)}
            totalPages={props.pageCount} layout={"pagination"}
            showIcons={true}
            className="text-blue-500 mb-5"
        />
    )
}