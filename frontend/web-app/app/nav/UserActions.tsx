'use client'

import {Dropdown, DropdownDivider, DropdownItem} from "flowbite-react";
import {User} from "next-auth";
import {usePathname, useRouter} from "next/navigation";
import {HiCog, HiUser} from "react-icons/hi2";
import Link from "next/link";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {signOut} from "next-auth/react";
import {useParamsStore} from "@/hooks/useParamsStore";

type Props = {
    user: User;
}

export default function UserActions({user}: Props){
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);

    function setWinner() {
        setParams({winner: user.username, seller: undefined});
        if (pathname != "/") router.push("/");
    }

    function setSeller() {
        setParams({winner: undefined, seller: user.username});
        if (pathname != "/") router.push("/");
    }

    return(
        <Dropdown inline label={`Welcome ${user.name}`}>
            <DropdownItem icon={HiUser} onClick={() => setSeller()}>
                    My Auctions
            </DropdownItem>
            <DropdownItem icon={AiFillTrophy} onClick={() => setWinner()}>
                    Auctions Won
            </DropdownItem>
            <DropdownItem icon={AiFillCar}>
                <Link href="/auctions/create">
                    Sell my Car
                </Link>
            </DropdownItem>
            <DropdownItem icon={HiCog}>
                <Link href="/session">
                    Session (dev only!)
                </Link>
            </DropdownItem>
            <DropdownDivider/>
            <DropdownItem icon={AiOutlineLogout} onClick={() => signOut({redirectTo: "/"})}>
                Sign Out
            </DropdownItem>
        </Dropdown>
    );
}