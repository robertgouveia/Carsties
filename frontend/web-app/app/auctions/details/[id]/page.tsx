import {getDetailedViewData} from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import Image from "next/image";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import {getCurrentUser} from "@/app/nav/AuctionActions";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";

export default async function Details({params}: {params: {id: string}}) {
    const data = await getDetailedViewData(params.id);
    const user = await getCurrentUser();

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Heading title={`${data.make} ${data.model}`} subtitle="" />
                    {user?.username === data.seller && (<><EditButton id={data.id}/><DeleteButton id={data.id}/></>)}
                </div>
                <div className='flex gap-3 items-center'>
                    <h3 className="text-2xl font-semibold">
                        Time Remaining:
                    </h3>
                    <CountdownTimer auctionEnd={data.auctionEnd} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="w-full bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden">
                    <Image src={data.imageUrl} alt="image" width={1280} height={768} className="object-cover w-full h-full"/>
                </div>
                <div className="border-2 rounded-lg p-2 bg-gray-100">
                    <Heading title="Bids" subtitle="" />
                </div>
            </div>

            <div className="mt-3 grid grid-cols-1 rounded-lg">
                <DetailedSpecs auction={data} />
            </div>
        </div>
    )
}