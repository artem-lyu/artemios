"use client"
import Link from "next/link"

export default function Sidebar() {
    return (
        <div className="z-10 h-screen bg-green-500 text-blue w-64 fixed">

            <nav className="mt-8">
                <div className="p-4">
                    <h1 className=" text-white font-bold ">Heal.app</h1>
                </div>
                <ul className="font-mono">
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
                </ul>
            </nav>
        </div>
    )
}