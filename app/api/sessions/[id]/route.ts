import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // ...
    const {id} = params;

    if (!id) {
        return NextResponse.json({ error: 'No id provided' });
    }

    // Fetch the chatSession data from the database
    const chatSession = await prisma.chat.findUnique({
        where: { id: String(id) },
    });

    // Return the fetched data as a JSON response
    return NextResponse.json({chatSession});
}