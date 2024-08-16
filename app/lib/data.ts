'use server'

import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"

export async function getData() {
    const prisma = new PrismaClient()
    const session = await auth()

    const latestSessions = await prisma.chat.findMany({
        where: {
            userId: session?.user?.id,
        },
        orderBy: {
            date: "desc",
        },
        take: 5,
    });

    return latestSessions
}