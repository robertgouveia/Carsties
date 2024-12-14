import {useParamsStore} from "@/hooks/useParamsStore";
import Heading from "@/app/components/Heading";
import {Button} from "flowbite-react";

type Props = {
    title?: string,
    subtitle?: string,
    showReset?: boolean
}

export default function EmptyFilter({title = "No Matches For This Filter", subtitle = "Try Resetting the Filter", showReset}: Props) {
    const reset=  useParamsStore(state => state.reset);

    return (
        <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center={true} />
            <div className="mt-4">
                {showReset && <Button onClick={reset} outline>Reset</Button>}
            </div>
        </div>
    )
}