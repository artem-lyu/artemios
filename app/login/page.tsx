"use client"
import { authenticate } from "../lib/actions"
import { useFormState } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {

  let [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );

  const searchParams = useSearchParams();
  const sessionParam = searchParams?.get("session");

  if (sessionParam === "false") {
    errorMessage = "You must be signed in to access this page.";

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500">
      <div className="relative w-full flex justify-center align-top">
        <h1 className="font-absans text-9xl">ARTEMIOS</h1>
      </div>
      <form
        action={formAction}
      >

        <input type="hidden" name="authType" value="credentials" />
        <div className="py-4">
          <label className="font-absans text-2xl ">
            Email
            <input name="email" type="email" className="border-black block bg-slate-400" />
          </label>
        </div>
        <div className="py-4">
          <label className="font-absans text-2xl">
            Password
            <input name="password" type="password" className="border-black block bg-slate-400" />
          </label>
        </div>
        <div className="flex flex-col py-4 items-center justify-center font-absans">
          <motion.button
            className="bg-transparent  text-black py-2 px-4 border-2 border-black rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }} // This transition only applies to the hover effect
          >
            Sign in
          </motion.button>
        </div>
        {errorMessage && (
          <>
            <TriangleAlert className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </form>
      <div className="width">
        <form action={formAction}>
          <input type="hidden" name="authType" value="google" />
          <button type="submit" className="text-white w-30  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign in with Google<div></div></button>
        </form>
      </div>
      <p>Don't have an account? <a href="/register" className="text-blue-600 dark:text-blue-500 hover:underline">Register</a></p>
    </div>
  )
}