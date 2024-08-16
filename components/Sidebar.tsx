"use client"

import Link from "next/link";
import { handleSignOut } from "@/app/lib/signOutAction";
import UserInformation from "./ui/user-information";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState } from "react";

const SideBarContext = createContext({});

export default function Sidebar() {

    const [expanded, setExpanded] = useState(false);

    return (
        <aside className={`h-screen ${expanded ? "w-[24vh]" : "w-[8vh]"} transition-all duration-300`}>
            <nav className="h-full flex flex-col bg-custom-palette-3-500 font-absans border-r shadow-sm">
                <div className={`p-4 pb-2 flex ${expanded ? "justify-between" : "justify-center"} items-center`}>
                    <h1 className={`text-black font-bold transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 w-0"}`}>
                        ARTEMIOS
                    </h1>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 z-10">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <SideBarContext.Provider value={{ expanded }}>
                    <ul className={`transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"} ${expanded ? "block" : "hidden"} md:block`}>
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
                            <form action={handleSignOut}>
                                <Link href="/">
                                    <p className="block px-4 py-2 hover:bg-white">Sign out</p>
                                </Link>
                            </form>
                        </li>
                    </ul>
                </SideBarContext.Provider>

                {/* <div className={`flex justify-center items-center mt-auto p-4 transition-all duration-300 ${expanded ? "block" : "hidden"}`}>
                    <UserInformation />
                </div> */}
            </nav>
        </aside>
    )
}
