import { SignIn } from "@/components/sign-in"
import { SignInGoogle } from "@/components/ui/sign-in-button-google"
export default function LoginPage() {
  return (
    <>
      <SignIn />
      <div className="width">
        <SignInGoogle />
      </div>
    </>
  )
}