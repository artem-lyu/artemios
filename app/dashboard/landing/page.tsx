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
        <div className="flex w-full h-full">
            <div className="flex flex-row mx-5 my-5 flex-1">
                <div className="flex-col mx-5 border">
                    <h1 className="font-kaisei text-5xl text-center">Hi {session?.user?.name}, how are you today?</h1>
                    <Chat accessToken={accessToken} />
                </div>
                <div className="flex-col mx-5 ">
                    <h1 className="text-5xl text-center">Latest Sessions</h1>
                    <div className="flex-auto flex-col text-center justify-center">
                        <ul className="">
                            {latestSessions.map((session: any) => (
                                <li key={session.id} className="p-2 my-2">
                                    <Link href={`/dashboard/sessions/transcript/${session.id}`} className="inline-block">
                                        <p className="hover:underline">{new Date(session.date).toLocaleString()}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


