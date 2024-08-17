// app/register/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
      </form>
    </div>
  );
};

export default Register;
