import Sidebar from "@/components/Sidebar"
import { auth } from "@/auth";
// @ts-ignore
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await auth();

    if (!session?.user) {
        console.log("no session!");
        redirect("/login?session=false");
    }

    return session.user;

}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    if (!session?.user) {
        console.log("no session!");
        redirect("/login?session=false");
    }

    return (
        <div className="flex w-full h-full bg-slate-500">
            <div>
                <Sidebar user={session!.user!}/>
            </div>
            <div className="flex flex-1">
                {children}
            </div>
        </div>
    )
}