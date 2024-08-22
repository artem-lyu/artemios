import Sidebar from "@/components/Sidebar"
import { getDataAll } from "@/app/lib/data"
import Link from "next/link"
import { auth } from "@/auth"
// ts-ignore
import { redirect } from "next/navigation"
import { ArrowLeftCircle } from "lucide-react"
import EmotionDot from "@/components/EmotionDot"

export default async function Page() {

    const session = await auth();
    if (!session?.user) {
        console.log("no session!");
        redirect("/login?session=false");
    }

    const formatDuration = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    const getDominantEmotion = (messages: any[]) => {
        const prosodyScores = messages
            .filter((message: any) => message['role'] === 'user') // Filter only user messages
            .flatMap((message: any) => Object.entries(message['prosody']['scores'] || {}));

        const aggregatedScores: Record<string, number> = prosodyScores.reduce((acc: Record<string, number>, [emotion, score]) => {
            if (!acc[emotion]) {
                acc[emotion] = 0;
            }
            acc[emotion] += score as number;
            return acc;
        }, {} as Record<string, number>);


        return Object.entries(aggregatedScores).reduce((a: [string, number], b: [string, number]) => a[1] > b[1] ? a : b, ['', 0])[0];
    };

    const allSessions = await getDataAll(session.user.id!)

    return (
        <div className="flex flex-1 m-2 p-4 rounded-lg justify-center font-absans">
            <div className="flex flex-col justify-center text-center border-3 border-sky-300 bg-opacity-75 p-3 m-3 bg-white rounded-lg">
                <h1 className="text-5xl text-center py-5">Past Sessions</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dominant Emotion</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allSessions && allSessions.length > 0 ? (
                            allSessions.map((session: any) => (
                                <tr key={session.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`/dashboard/sessions/transcript/${session.id}`} className="inline-block">
                                            <p className="hover:underline">{session.id}</p>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p>{new Date(session.date).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p>{new Date(session.date).toLocaleTimeString()}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p>{formatDuration(session.duration)}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <EmotionDot emotion={getDominantEmotion(session['messages'])} />
                                        <p>{getDominantEmotion(session['messages'])}</p>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center">
                                    No sessions yet!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}