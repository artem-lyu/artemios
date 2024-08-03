import Link from "next/link"

export default function Page() {
    return (
        <div className="h-screen w-screen bg-purple-500 justify-center text-center text-4xl py-48">
            <h1 className="">It was great talking with you</h1>
            <Link href="/dashboard">
            <p className="py-48 text-xl">Back to dashboard</p>
            </Link>
        </div>
    )
}