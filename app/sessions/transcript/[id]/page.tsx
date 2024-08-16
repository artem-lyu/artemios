"use client"
import { PrismaClient } from "@prisma/client"
import { useEffect } from "react"
import { useState } from "react"
import { getDataById } from "@/app/lib/data"
import useSWR from "swr"
import { Fetcher } from "swr"

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

    const chatString = JSON.stringify(chat)
    return (
        <h1>bozo! {JSON.stringify(chat)}</h1>
    )
}