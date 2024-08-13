import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';
import { PrismaClient } from '@prisma/client';
import { json } from 'stream/consumers';
import { connect } from 'http2';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) { 
    const { chatHistory, user } = await req.json();

    const filteredMessages = chatHistory
        .filter((entry: { type: string; }) => entry.type === 'user_message' || entry.type === 'assistant_message')
        .map((entry: { message: { role: any; content: any; }; }) => `${entry.message.role}: ${entry.message.content}`)
        .join('\n');

    const chat = await prisma.chat.create({
        data: {
            user: {
                connect: {
                    email: user?.email
                }
            },
            transcription: filteredMessages,
            date: new Date(),
            duration: 1
        }
    });

    return NextResponse.json(chat, { status: 201 });
    


}