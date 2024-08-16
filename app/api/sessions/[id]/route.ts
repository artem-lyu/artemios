import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // ...
    const {id} = params;

    const session = await auth();

    if (!session?.user) {
        console.log("no session!");
        return NextResponse.redirect("/login?session=false");
    }

    if (!id) {
        return NextResponse.json({ error: 'No id provided' });
    }

    // Fetch the chatSession data from the database
    const chatSession = await prisma.chat.findUnique({
        where: { id: String(id), userId: session.user.id },
    });

    // Return the fetched data as a JSON response
    return NextResponse.json({chatSession});
}