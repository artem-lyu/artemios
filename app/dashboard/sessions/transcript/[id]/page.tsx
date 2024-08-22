"use client"
import Expressions from "@/components/Expressions"
import ExpressionsCustom from "@/components/Expressions"
import { ReactNode, useEffect } from "react"
import { useState } from "react"
import TopProsodyScores from "@/components/TopProsodyScores"

interface Params {
    id: string
}

interface HomePageProps {
    params: Params
}

export default function HomePage({ params }: HomePageProps) {
    const { id } = params
    const [error, setError] = useState<unknown>(null)
    const [chat, setChat] = useState(null)

    useEffect(() => {
        const fetchChatSession = async () => {
            try {
                const response = await fetch(`/api/sessions/${id}`)
                const data = await response.json()
                setChat(data.chatSession)
            } catch (err) {
                setError(err)
            }
        }

        fetchChatSession()
    }, [id])



    if (!chat) {
        return <h1>Loading...</h1>
    }
    const transcription = chat['transcription']

    const messages: any[] = chat['messages']

    // Initialize a variable to store the total prosody score
    let totalProsodyScore = 0;

    // Aggregate the prosody scores and calculate the total prosody score
    const aggregatedProsody = messages.filter((message: any) => message['role'] === 'user'

    ).reduce((acc, message) => {
        const prosodyScores: Record<string, number> = message['prosody']['scores'] ?? {};
        const messageLength = message['content'].length;
        for (const [key, value] of Object.entries(prosodyScores)) {
            if (!acc[key]) {
                acc[key] = 0;
            }
            const weightedScore = value * messageLength;
            acc[key] += weightedScore;
            totalProsodyScore += weightedScore;
        }
        return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by score in descending order
    const topProsodyScores = Object.entries(aggregatedProsody)
        .sort(([, a]: [string, unknown], [, b]: [string, unknown]) => (b as number) - (a as number))
        .slice(0, 10);

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <div className="flex w-full bg-slate-500 justify-center items-center ">
            <div className="flex flex-col justify-center items-center text-center overflow-y-auto">
                <div className="w-[50%]">
                    <h1 className="text-4xl py-3 p-3 m-3 bg-white rounded-lg">Chat at {new Date(chat['date']).toLocaleString()}</h1>
                </div>

                <TopProsodyScores scores={topProsodyScores} />

                {messages.map((message) => (
                    <div
                        key={message['id']}
                        className={`w-[50%] message p-3 m-3 bg-white rounded-lg ${message['role'] === 'assistant' ? 'mr-20' : 'ml-20'}`}
                    >
                        <div className="flex justify-between">
                            <small>{capitalizeFirstLetter(message['role'])}</small>
                            <small>{new Date(message['timestamp']).toLocaleTimeString()}</small>
                        </div>
                        <p className="text-left">{message['content']}</p>
                        <ExpressionsCustom values={message['prosody']['scores'] ?? {}} />
                    </div>
                ))}
            </div>
        </div>
    )
}