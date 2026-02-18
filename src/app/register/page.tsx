'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    withCredentials: true,
  });

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        lastname,
      });

      const { message, redirectUrl, tokens, user } = response.data;

      alert(`Registered: ${message}`);

      Cookies.set('access_token', tokens.access_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('stream_token', tokens.stream_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('id', String(user.id), { secure: true, sameSite: 'Strict' });
      Cookies.set('username', user.username, { secure: true, sameSite: 'Strict' });
      Cookies.set('lastname', user.lastname, { secure: true, sameSite: 'Strict' });
      Cookies.set('email', user.email, { secure: true, sameSite: 'Strict' });
      Cookies.set('avatar', user.avatar || '', { secure: true, sameSite: 'Strict' });

      router.push('/chat');
    } catch (error: any) {
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoogleSignIn = () => {

    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/login/google`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#0F172A] shadow-glow-slow backdrop-blur-md border border-[#8FADCC] shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-2xl">

      <h2 className="text-2xl font-bold mb-6 text-center gradient-header">Sign Up</h2>


      <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0">

        {/* Form */}
        <form noValidate onSubmit={handleRegister} className="flex flex-col flex-1">

          {/* First Name */}
          <div className="mb-6">
            <label className="block text-[#4F46E5] text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 bg-transparent border-b border-[#8FADCC] text-white focus:outline-none focus:border-blue-400 transition"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label className="block text-[#4F46E5] text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full py-2 bg-transparent border-b border-[#8FADCC] text-white focus:outline-none focus:border-blue-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-[#4F46E5] text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 bg-transparent border-b border-[#8FADCC] text-white focus:outline-none focus:border-blue-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-[#4F46E5] text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 bg-transparent border-b border-[#8FADCC] text-white focus:outline-none focus:border-blue-400 transition"
              required
            />
          </div>

          {/* Sign Up */}
          <button className="primary-button primary-button-full shadow-glow-slow">
            Sign Up
          </button>
        </form>

        {/* Sign In + Google */}
        <div className="flex flex-col flex-1 justify-start text-center">

          <p className="pb-2 text-white">Вже маєш аккаунт?</p>

          <button
            className="primary-button primary-button-full mb-4"
            onClick={() => router.push('/login')}
          >
            Sign In
          </button>

          <p className="text-sm text-gray-400 mb-2">or</p>

          <button className="google-button mx-auto" onClick={handleGoogleSignIn}>
            <GoogleIcon className="text-[#DB4437]" />
            <span>Sign up with Google</span>
          </button>

        </div>


      </div>
    </div>
</div>

  );
}
