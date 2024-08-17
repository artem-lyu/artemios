import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';
import { PrismaClient } from '@prisma/client';
import { json } from 'stream/consumers';
import { connect } from 'http2';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { chatData, user } = await req.json();

    const filteredMessages = chatData
        .filter((entry: { type: string; }) => entry.type === 'user_message' || entry.type === 'assistant_message')
        .map((entry: { message: { role: string; content: string; }; }) => `${entry.message.role}: ${entry.message.content}`)
        .join('\n');


    const socketConnected = chatData.find((entry: { type: string; }) => entry.type === 'chat_metadata');
    const receivedAt = new Date(socketConnected.receivedAt)

    const lastMessageTimestamp = new Date()

    const duration = (lastMessageTimestamp.getTime() - receivedAt.getTime()) / 1000; // duration in seconds


    if (filteredMessages && duration > 0) {
        const chat = await prisma.chat.create({
            data: {
                user: {
                    connect: {
                        email: user?.email
                    }
                },
                transcription: filteredMessages,
                date: chatData.find((entry: { type: string; }) => entry.type === 'chat_metadata').receivedAt,
                duration: Math.max(duration, 0),
                messages: {
                    create: chatData
                        .filter((entry: { type: string; }) => entry.type === 'user_message' || entry.type === 'assistant_message')
                        .map((entry: { message: { role: string; content: string; }; models: { prosody: any }; receivedAt: string; from_text: boolean }) => ({
                            role: entry.message.role,
                            content: entry.message.content,
                            timestamp: new Date(entry.receivedAt),
                            fromText: entry.from_text,
                            prosody: {
                                create: {
                                    scores: entry.models.prosody?.scores
                                }
                            }
                        }))
                }
            }
        });

        return NextResponse.json(chat, { status: 201 });
    } else {
        return NextResponse.json({ error: 'No messages to save' }, { status: 400 });
    }



}