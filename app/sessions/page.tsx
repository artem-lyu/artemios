import Sidebar from "@/components/Sidebar"
import { getDataAll } from "../lib/data"
import Link from "next/link"
import { auth } from "@/auth"
// ts-ignore
import { redirect } from "next/navigation"
export default async function Page() {

    const session = await auth();
    if (!session?.user) {
        console.log("no session!");
        redirect("/login?session=false");
    }

    const allSessions = await getDataAll(session.user.id!)

    return (
        <div className="flex bg-slate-500 h-full w-full">
            <div className="mr-auto">
                <Sidebar />
            </div>
            <div className="flex-1 text-center">
                <h1 className="text-5xl py-4">Past Sessions</h1>
                <ul className="flex-col text-center justify-center">
                    {allSessions.map((session: any) => (
                        <Link href={`/sessions/transcript/${session.id}`}>
                            <p>{new Date(session.date).toLocaleString()}</p>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}