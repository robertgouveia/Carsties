import Search from "@/app/components/Search";
import Logo from "@/app/components/Logo";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex justify-between bg-white p-4 items-center text-gray-800 shadow-md">
            <Logo/>
            <Search/>
            <div></div>
        </header>
    );
}