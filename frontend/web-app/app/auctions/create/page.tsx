import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";

export default function Create() {
    return (
        <div className="mx-auto max-w-[75%] p-10 bg-white">
            <Heading title="Sell your car!" subtitle="Please enter the details of your car" />
            <AuctionForm/>
        </div>
    )
}