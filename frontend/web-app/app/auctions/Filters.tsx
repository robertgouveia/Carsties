import {Button} from "flowbite-react";
import {useParamsStore} from "@/hooks/useParamsStore";
import {AiOutlineClockCircle, AiOutlineSortAscending} from "react-icons/ai";
import {BsFillStopCircleFill, BsStopwatch, BsStopwatchFill} from "react-icons/bs";
import {IconBase} from "react-icons";
import {GiFinishLine, GiFlame} from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
    {
        label: "Alphabetical",
        icon: AiOutlineSortAscending,
        value: "make"
    },
    {
        label: "End Date",
        icon: AiOutlineClockCircle,
        value: "endingSoon"
    },
    {
        label: "Recently Added",
        icon: BsFillStopCircleFill,
        value: "new"
    }
]

const filterButtons = [
    {
        label: "Live Auctions",
        icon: GiFlame,
        value: "live"
    },
    {
        label: "Less than 6 hours",
        icon: GiFinishLine,
        value: "endingSoon"
    },
    {
        label: "Completed",
        icon: BsStopwatchFill,
        value: "finished"
    }
]

export default function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);

    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">
                    Filter By
                </span>
                <Button.Group>
                    {filterButtons.map(({label, icon: Icon, value}) => (
                        <Button key={value} onClick={() => setParams({filterBy: value})}
                                color={`${filterBy === value ? 'red' : 'gray'}`}>
                            <Icon className="mr-3 mt-1 h-3 w-3"/>
                            {label}
                        </Button>
                    ))}
                </Button.Group>
            </div>

            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">
                    Order By
                </span>
                <Button.Group>
                    {orderButtons.map(({label, icon: Icon, value}) => (
                        <Button key={value} onClick={() => setParams({orderBy: value})}
                                color={`${orderBy === value ? 'red' : 'gray'}`}>
                            <Icon className="mr-3 mt-1 h-3 w-3"/>
                            {label}
                        </Button>
                    ))}
                </Button.Group>
            </div>

            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">
                    Page Size
                </span>
                <Button.Group>
                    {pageSizeButtons.map((value, index) => (
                        <Button key={index} onClick={() => setParams({pageSize: value})}
                                color={`${pageSize === value ? 'red' : 'gray'}`}
                                className="focus:ring-0"
                        >
                            {value}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    )
}