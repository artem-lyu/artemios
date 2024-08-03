import "../globals.css";
import React from 'react';
import { useVoice } from "@humeai/voice-react";
import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import ClientComponent from "@/components/Chat";

export default async function HomePage() {

    const Chat = dynamic(() => import("@/components/Chat"), {
        ssr: false,
      });

    const accessToken = await getHumeAccessToken();

    if (!accessToken) {
        throw new Error();
      }


    return (
        <div style={{
            alignItems: "center",
            height: "100vh",
        }}>
            <div className="circle"></div>
            <h1 style={{
                textAlign: "center",
                fontSize: 48,
                fontFamily: "Kaisei_HarunoUmi"
            }}>How are you today?</h1>
            <div>
                <Chat accessToken={accessToken}/>
            </div>
        </div>
    )
}


