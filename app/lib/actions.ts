'use server';
 
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
 
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);

      redirect("/landing")
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.message) {
          case 'Missing credentials. Read more at https://errors.authjs.dev#autherror':
            return 'Please enter your credentials';
          case 'User not found. Read more at https://errors.authjs.dev#autherror':
            return 'User not found.';
          case 'Invalid user or password is incorrect. Read more at https://errors.authjs.dev#autherror':
            return 'Invalid user or password is incorrect';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
