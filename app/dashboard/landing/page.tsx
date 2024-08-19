import "../../globals.css";
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/auth";
// @ts-ignore
import { redirect } from "next/navigation";
import ExpressionsCustom from "@/components/ExpressionsCustom";
import { getDataLatest } from "../../lib/data";
import Link from "next/link";
import { getDataAll } from "../../lib/data";

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

    const allSessions = await getDataAll(session.user.id!)

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);


    const sessionsLast7Days = allSessions.filter((session: any) => {
        const sessionDate = new Date(session.date);
        return sessionDate >= sevenDaysAgo;
    });

    const prosodyScores = sessionsLast7Days.flatMap((session: any) => {
        const messages = session['messages'];
        return messages
            .filter((message: any) => message['role'] === 'user') // Filter only user messages
            .flatMap((message: any) => {
                const prosodyScores: Record<string, number> = message['prosody']['scores'] ?? {};
                const messageLength = message['content'].length;
                return Object.entries(prosodyScores).map(([key, value]) => ({
                    key,
                    score: value * messageLength,
                }));
            });
    });

    const aggregatedProsody = prosodyScores.reduce((acc: any, { key, score }) => {
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += score;
        return acc;
    }, {});

    const topProsodyScores = Object.entries(aggregatedProsody)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 10)


    const maxScore = Math.max(...topProsodyScores.map(([, score]) => score as number));
    if (!accessToken) {
        throw new Error();
    }

    return (
        <div className="flex w-full h-full font-raleway">
            <div className="flex flex-row mx-5 my-5 flex-1 ">
                <div className="flex-col mx-5 border-3 border-sky-300 p-3 m-3 bg-white bg-opacity-75 rounded-lg">
                    <h1 className="text-5xl text-center">Hi {session?.user?.name}, how are you today?</h1>
                    <Chat accessToken={accessToken} />
                </div>
                <div className="flex-col mx-5 border-3 border-sky-300 bg-opacity-75 p-3 m-3 bg-white rounded-lg">
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

                <div className="flex flex-col mx-5 border-3 border-sky-300 p-3 m-3 bg-white bg-opacity-75 rounded-lg">
                    <h1 className="text-5xl text-center">Your Weekly Roundup</h1>
                    <ul className="text-center">
                        {topProsodyScores.map(([key, score], index) => (
                            <li key={index} className="p-2 my-2">
                                <div className="relative group">
                                    <ExpressionsCustom key={key} values={{ [key]: score as number / maxScore }} />
                                    <span className="absolute left-0 top-0 mt-2 ml-2 text-xs bg-gray-200 rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                                        {key}: {(score as number).toFixed(2)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


