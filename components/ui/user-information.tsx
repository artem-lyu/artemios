import { auth } from "@/auth"
 
export default async function UserInformation() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <p className="block px-4 py-2 hover:bg-white">{session.user.name}</p>
    </div>
  )
}