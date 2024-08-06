"use client"

import { useState, useEffect } from 'react';
import styles from './ChatTable.module.css'; // You'll need to create this CSS module

interface ChatItem {
  id: string;
  chat_group_id: string;
  status: string;
  start_timestamp: number;
  end_timestamp?: number;
  transcript?: string;
}

export default function Page() {
  const [chats, setChats] = useState<ChatItem[]>([]);

  useEffect(() => {
    async function fetchChats() {
      let allChats: ChatItem[] = [];
      let hasMore = true;
      let pageNumber = 1;

      while (hasMore) {
        const response = await fetch(`https://api.hume.ai/v0/evi/chats?page_number=${pageNumber}`, {
          method: "GET",
          headers: {
            "X-Hume-Api-Key": process.env.NEXT_PUBLIC_HUME_API_KEY || ''
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const body = await response.json();
        const chatsPage = body.chats_page || [];

        allChats = [...allChats, ...chatsPage];

        // Check if there are more pages
        hasMore = body.has_more_pages;
        pageNumber += 1;
      }

      const chatsWithTranscripts = await Promise.all(allChats.map(async (chat: ChatItem) => {
        const eventsResponse = await fetch(`https://api.hume.ai/v0/evi/chats/${chat.id}`, {
          method: "GET",
          headers: {
            "X-Hume-Api-Key": process.env.NEXT_PUBLIC_HUME_API_KEY || ''
          },
        });

        if (eventsResponse.ok) {
          const eventsBody = await eventsResponse.json();
          const transcript = eventsBody.events_page
            .filter((event: any) => event.type === 'USER_MESSAGE' || event.type === 'AGENT_MESSAGE')
            .map((event: any) => `${event.role}: ${event.message_text}`)
            .join('\n');
          return { ...chat, transcript };
        }
        return chat;
      }));

      const sortedChats = chatsWithTranscripts.sort((a: ChatItem, b: ChatItem) => b.start_timestamp - a.start_timestamp);
      setChats(sortedChats);
    }

    fetchChats().catch(console.error);
  }, []);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.chatTable}>
        <thead>
          <tr>
            <th>Session</th>
            <th>Date</th>
            <th>Status</th>
            <th>Transcript</th>
          </tr>
        </thead>
        <tbody>
          {chats.map((chat, index) => (
            <tr key={chat.id}>
              <td>{chats.length - index}</td>
              <td>{new Date(chat.start_timestamp * 1000).toLocaleString()}</td>
              <td>{chat.status}</td>
              <td>
                <details>
                  <summary>View Transcript</summary>
                  <pre>{chat.transcript}</pre>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
