'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
// @ts-ignore
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import path from 'path';



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  if (formData.get('authType') === 'credentials') {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        const cleanedMessage = error.message.replace(/\. Read more at .+$/, '');
        return cleanedMessage
      }
      if (isRedirectError(error)) {
        redirect('/dashboard/landing');
      }
    }
  } else if (formData.get('authType') === 'google') {
    try {
      const session = await auth()
      if (session) {
        await signOut();
      }
      await signIn('google', { redirectTo: '/dashboard/landing' });
    } catch (error) {
      if (error instanceof AuthError) {
        const cleanedMessage = error.message.replace(/\. Read more at .+$/, '');
        return cleanedMessage
      }
      console.log("passing")
      throw error;
    }
  }
}

export async function saveMessage(chatData: any[]) {
  const session = await auth();

  const user = session?.user;
  try {
    const response = await fetch('../api/saveChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatData,
        user,
      })
    }
    )
  } catch (error) {
    console.error('An error occurred:', error);
  }
}