import { auth } from "@/auth";

export default async function UserEmail() {
    const session = await auth();

    if (!session?.user) {
        return null
    }

    return (
        <div>
            <p>Current User: {session.user.email}</p>
        </div>
    )
    
}