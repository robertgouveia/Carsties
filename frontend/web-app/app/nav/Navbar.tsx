import Search from "@/app/components/Search";
import Logo from "@/app/components/Logo";
import LoginButton from "@/app/components/LoginButton";
import {getCurrentUser} from "@/app/nav/AuctionActions";
import UserActions from "@/app/nav/UserActions";

export default async function Navbar() {
    const user = await getCurrentUser();

    return (
        <header className="sticky top-0 z-50 flex justify-between bg-white p-4 items-center text-gray-800 shadow-md">
            <Logo/>
            <Search/>
            {user ? <UserActions user={user}/> : <LoginButton/>}
        </header>
    );
}