import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";
import {getDetailedViewData} from "@/app/actions/auctionActions";

export default async function Update({params} : {params: {id: string}}) {
    const { id } = params;
    const data = await getDetailedViewData(id);

    return (
        <div className="mx-auto max-w-[75%] p-10 bg-white rounded-lg">
            <Heading title="Update your Auction" subtitle="Update the details of your car" />
            <AuctionForm auction={data} />
        </div>
    )
}