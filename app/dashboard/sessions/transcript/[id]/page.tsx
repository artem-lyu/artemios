"use client"
import Sidebar from "@/components/Sidebar"
import { PrismaClient } from "@prisma/client"
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

    return (
        <div className="flex w-full h-full bg-slate-500">
            <div className="flex-col flex-1 justify-center text-center">
                <h1 className="text-4xl py-3">Chat at { new Date(chat['date']).toLocaleString()}</h1>
                <pre>{transcription}</pre>
            </div>
        </div>
    )
}