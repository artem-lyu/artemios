import Link from "next/link"
import { handleSignOut } from "@/app/lib/signOutAction";
import UserInformation from "./ui/user-information";

export default function Sidebar() {

    return (
        <div className="z-10 h-screen bg-green-500 text-blue w-64 fixed font-absans">
            <nav className="mt-8">
                <div className="p-4">
                    <h1 className=" text-white font-bold ">Heal.app</h1>
                </div>
                <ul className="font-mono">
                    <li className="mb-2">
                        <UserInformation />
                    </li>
                    <li className="mb-2">
                        <Link href="/landing">
                            <p className="block px-4 py-2 hover:bg-white">Start new session</p>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/sessions">
                            <p className="block px-4 py-2 hover:bg-white">Past Sessions</p>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/settings">
                            <p className="block px-4 py-2 hover:bg-white">Settings</p>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/support">
                            <p className="block px-4 py-2 hover:bg-white">Support</p>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/upgrade">
                            <p className="block px-4 py-2 hover:bg-white">Upgrade to Premium</p>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <form
                            action={handleSignOut}
                        >
                            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                                {/* <PowerIcon className="w-6" /> */}
                                <div className="hidden md:block">Sign Out</div>
                            </button>
                        </form>

                    </li>
                </ul>
            </nav>
        </div>
    )
}