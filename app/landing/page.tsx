import "../globals.css";
import React from 'react';
import { useVoice } from "@humeai/voice-react";
import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import ClientComponent from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {

    const session = await auth();
    if (!session?.user) {
        console.log("no session!");
        redirect("/login?session=false");
    }

    const Chat = dynamic(() => import("@/components/Chat"), {
        ssr: false,
    });

    const accessToken = await getHumeAccessToken();

    if (!accessToken) {
        throw new Error();
    }


    return (
        <div className="items-center height h-screen">
            <Sidebar />
            <h1 className="font-kaisei py-[80px] text-5xl text-center">How are you today?</h1>
            <Chat accessToken={accessToken} />
        </div>
    )
}


