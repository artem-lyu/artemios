'use server'

import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"

export async function getDataLatest(userId: string) {

    const prisma = new PrismaClient()
    const session = await auth()

    const latestSessions = await prisma.chat.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            date: "desc",
        },
        take: 5,
    });

    return latestSessions
}

export async function getDataAll(userId: string) {
    const prisma = new PrismaClient()

    const session = await auth()

    const data = await prisma.chat.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            date: "desc",
        }
    });

    return data
}