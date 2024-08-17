import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-full bg-slate-500">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}