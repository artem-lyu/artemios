import "../../globals.css";
import React from 'react';
import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/auth";
// @ts-ignore
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { getDataLatest } from "../../lib/data";
import Link from "next/link";
import RootLayout from "../../layout";

export default async function HomePage() {

    const session = await auth();
    if (!session?.user) {
        console.log("no session!");
        redirect("../login?session=false");
    }

    const user = session.user;

    const Chat = dynamic(() => import("@/components/Chat"), {
        ssr: false,
    });

    const accessToken = await getHumeAccessToken();


    const latestSessions = await getDataLatest(session.user.id!);

    if (!accessToken) {
        throw new Error();
    }

    return (
        <div className="flex w-full h-full bg-slate-500">
            <div className="flex-1">
                <h1 className="font-kaisei text-5xl text-center">Hi {session?.user?.name}, how are you today?</h1>
                <Chat accessToken={accessToken} />
                <div className="flex-col">
                    <h1 className="font-kaisei text-5xl text-center">Your latest sessions</h1>
                    <ul className="flex-col text-center">
                        {latestSessions.map((session: any) => (
                            <li key={session.id}>
                                <Link href={`/dashboard/sessions/transcript/${session.id}`}>
                                    <p>{new Date(session.date).toLocaleString()}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


