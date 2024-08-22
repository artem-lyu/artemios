// app/register/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '../lib/actions';
import { useFormState } from 'react-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  let [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 12) {
      setError('Password must be at least 12 characters long');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        router.push('/login'); // Redirect to login page after successful registration
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (

    <div className="flex flex-col bg-slate-500 min-h-screen w-full items-center justify-center">
      <h1 className='py-5 text-4xl'>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form action={formAction}>
          <input type="hidden" name="authType" value="google" />
          <button type="submit" className="z-50 font-absans text-black w-30 bg-transparent border-2 border-black font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google</button>
        </form>
      {/* <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className='bg-slate-400'
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className='bg-slate-400'
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-slate-400'
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-slate-400'
          />
        </div>
        <button type="submit">Register</button>
      </form> */}
    </div>
  );
};

export default Register;
