'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
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
}

