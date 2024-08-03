"use client";
import { useRouter } from "next/navigation";
import "../globals.css";
import React from 'react';
import { useVoice } from "@humeai/voice-react";
import { Nav } from "@/components/Nav";

function HomePage() {

    const handleButtonClick = () => {
        console.log(1);
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
            <div style={{
                fontSize: 28,
                fontFamily: 'Kaisei_HarunoUmi',
                margin: 'auto',
                textAlign: "center",
                padding: "75px",
                border: "3px solid green",
                position: "relative",
                height: "200px"
            }}>
                <button type="button" style={{
                    textAlign: "center",
                    justifyItems: "center",
                    fontFamily: 'Kaisei_HarunoUmi',
                    textDecoration: "underline"
                }}
                    onClick={handleButtonClick}>Respond</button>
            </div>
        </div>
    )
}

export default HomePage;