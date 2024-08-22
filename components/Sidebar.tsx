"use client"

import Link from "next/link";
import { handleSignOut } from "@/app/lib/signOutAction";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Home, History, Settings, CircleHelp, Crown, CirclePlay } from "lucide-react";
import { createContext, useState, useEffect, useContext } from "react";
import UserInformation from "./ui/user-information";
import { memo } from "react";
import { auth } from "@/auth";


interface SidebarProps {
    user?: any
}

const SideBarContext = createContext({});

function Sidebar({ user }: SidebarProps) {
    const [expanded, setExpanded] = useState(false);


    return (
        <aside className={`h-screen ${expanded ? "w-[24vh]" : "w-[5vh]"} transition-all duration-300`}>
            <nav className="h-full flex flex-col bg-white bg-opacity-75 font-absans border-r border-3 border-slate-500 shadow-sm rounded-lg">
                <div className={`p-4 pb-2 flex ${expanded ? "justify-between" : "justify-center"} items-center`}>
                    <Link href="/">
                        <h1 className={`text-black font-bold transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 w-0"}`}>
                            ARTEMIOS
                        </h1>
                    </Link>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-1.5 rounded-lg bg-slate-500 hover:bg-gray-100 z-10">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
            


                <SideBarContext.Provider value={{ expanded }}>
                <ul className={`items-center transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-100"} ${expanded ? "block" : "hidden"} md:block`}>
                    {expanded && (
                        <>
                            <li className="mb-2">
                                <Link href="/dashboard/landing">
                                    <p className="px-4 py-2 hover:opacity-65 flex justify-center items-center">
                                        <Home className="mr-2" />
                                        Home
                                    </p>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/dashboard/start">
                                    <p className="px-4 py-2 hover:opacity-65 flex justify-center items-center">
                                        <CirclePlay className="mr-2" />
                                        Start
                                    </p>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/dashboard/sessions">
                                    <p className="px-4 py-2 hover:opacity-65 flex justify-center items-center">
                                        <History className="mr-2" />
                                        Sessions
                                    </p>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </SideBarContext.Provider>

                <div className={`flex justify-center items-center mt-auto p-4 transition-all duration-300 ${expanded ? "block" : "hidden"}`}>
                    {user ? (<p>{user.email}</p>) : null}
                    <form action={handleSignOut}>
                        <button type="submit" className="px-4 py-2 flex items-center hover:opacity-65 justify-center">{expanded && "Sign out"}</button>
                    </form>
                </div>
            </nav>
        </aside>
    )
}

export default memo(Sidebar);