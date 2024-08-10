"use client"

import { SignInGoogle } from "@/components/ui/sign-in-button-google"
import { authenticate } from "../lib/actions"
import { useFormState } from "react-dom";
import { TriangleAlert } from "lucide-react";

export default function LoginPage() {

  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );

  return (
    <>
      <form
        action={formAction}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
        {errorMessage && (
          <>
            <TriangleAlert className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </form>
      {/* <div className="width">
        <SignInGoogle />
      </div> */}
    </>
  )
}