import Sidebar from "@/components/Sidebar"
import { getDataAll } from "../lib/data"

export default async function Page() {
    const allSessions = await getDataAll() 

    return (
        <div className="flex bg-slate-500 h-full w-full">
            <div className="mr-auto">
                <Sidebar />
            </div>
            <div className="flex-1 text-center">
                <h1 className="text-5xl py-4">Past Sessions</h1>
                <ul className="flex-col text-center justify-center">
                        {allSessions.map((session: any) => (
                            <li key={session.id}>
                                <p>{new Date(session.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    )
}