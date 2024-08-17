"use client"
import Expressions from "@/components/Expressions"
import ExpressionsCustom from "@/components/Expressions"
import { useEffect } from "react"
import { useState } from "react"

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

    return (
        <div className="flex w-full h-full bg-slate-500 justify-center items-center ">
            <div className="flex flex-col w-[50%] max-h-full justify-center text-center ">
                <h1 className="text-4xl py-3">Chat at {new Date(chat['date']).toLocaleString()}</h1>

                {messages.map((message) => (
                    <div
                        key={message['id']}
                        className={`message ${message['role'] === 'assistant' ? 'text-left' : 'text-right'} inline-block p-3 m-3 bg-white rounded-lg`}
                    >
                        <small>{new Date(message['timestamp']).toLocaleTimeString()}</small>
                        <p>{message['role']}: {message['content']}</p>
                        <ExpressionsCustom values={message['prosody']['scores'] ?? {}} />
                    </div>
                ))}
            </div>
        </div>
    )
}