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
        <>
            <div className="text-center">
                <h1 className="text-5xl py-4">Past Sessions</h1>
                <div className="flex-auto flex-col text-center justify-center">

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
        </>
    )
}