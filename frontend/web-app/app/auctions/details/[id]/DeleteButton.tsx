'use client'

import {Button} from "flowbite-react";
import {useState} from "react";
import {deleteAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

type Props = {
    id: string,
}

export default function DeleteButton({id}: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function doDelete() {
        setLoading(true);
        await deleteAuction(id).then(res => {
            if (res.error) throw res.error;
            router.push("/");
        }).catch(e => toast.error(e.status + " " + e.statusText)).finally(() => setLoading(false));
    }

    return (
        <Button isProcessing={loading} onClick={doDelete}>Delete Auction</Button>
    )
}