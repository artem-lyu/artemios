"use client"

import Link from "next/link";
import { handleSignOut } from "@/app/lib/signOutAction";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState, useEffect } from "react";
import UserInformation from "./ui/user-information";
import { memo } from "react";
import { auth } from "@/auth";


interface SidebarProps {
    user?: any
}

const SideBarContext = createContext({});

function Sidebar({user}: SidebarProps) {
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
                            <Link href="/dashboard/landing">
                                <p className="block px-4 py-2 hover:bg-white">Start new session</p>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/dashboard/sessions">
                                <p className="block px-4 py-2 hover:bg-white">Past Sessions</p>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/dashboard/settings">
                                <p className="block px-4 py-2 hover:bg-white">Settings</p>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/dashboard/support">
                                <p className="block px-4 py-2 hover:bg-white">Support</p>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/dashboard/upgrade">
                                <p className="block px-4 py-2 hover:bg-white">Upgrade to Premium</p>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <form action={handleSignOut}>
                                <button type="submit" className="block px-4 py-2 hover:bg-white">Sign out</button>
                            </form>
                        </li>
                    </ul>
                </SideBarContext.Provider>

                <div className={`flex justify-center items-center mt-auto p-4 transition-all duration-300 ${expanded ? "block" : "hidden"}`}>
                    {user ? (<p>{user.email}</p>) : null}
                </div>
            </nav>
        </aside>
    )
}

export default memo(Sidebar);
