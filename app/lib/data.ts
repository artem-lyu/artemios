'use server'

import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"

export async function getDataLatest() {

    const prisma = new PrismaClient()
    const session = await auth()

    const latestSessions = await prisma.chat.findMany({
        where: {
            id: session!.user!.email!,
        },
        orderBy: {
            date: "desc",
        },
        take: 5,
    });

    return latestSessions
}

export async function getDataAll() {
    const prisma = new PrismaClient()

    const session = await auth()

    const data = await prisma.chat.findMany({
        where: {
            id: session!.user!.email!,
        },
        orderBy: {
            date: "desc",
        }
    });

    return data
}