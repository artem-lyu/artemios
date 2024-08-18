import Sidebar from "@/components/Sidebar"
import { getDataAll } from "@/app/lib/data"
import Link from "next/link"
import { auth } from "@/auth"
// ts-ignore
import { redirect } from "next/navigation"
import { ArrowLeftCircle } from "lucide-react"
export default async function Page() {

    const session = await auth();
    if (!session?.user) {
        console.log("no session!");
        redirect("/login?session=false");
    }

    const allSessions = await getDataAll(session.user.id!)

    return (
        <div className="flex flex-1 m-2 p-4 rounded-lg justify-end">
            <div className="flex flex-col">
                <h1 className="text-4xl p-4 bg-custom-palette-3-600 rounded-sm opacity-70">Past Sessions</h1>
                <ul className="">
                    {allSessions.map((session: any) => (
                        <li key={session.id} className="p-2 my-2">
                            <Link href={`/dashboard/sessions/transcript/${session.id}`} className="inline-block">
                                <p className="hover:underline">{new Date(session.date).toLocaleString()}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}