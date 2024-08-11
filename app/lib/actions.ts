'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
// @ts-ignore
import { redirect } from 'next/navigation';
import { auth } from '@/auth';



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
        redirect('/landing');
      }
    }
  } else if (formData.get('authType') === 'google') {
    try {
      const session = await auth()
      if (session) {
        await signOut(redirect('/login'));
      }
      await signIn('google', { redirectTo: '/landing' });
    } catch (error) {
      if (error instanceof AuthError) {
        const cleanedMessage = error.message.replace(/\. Read more at .+$/, '');
        return cleanedMessage
      }
      throw error;
    }
  }
}
