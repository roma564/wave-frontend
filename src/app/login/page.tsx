'use client';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const router = useRouter();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    withCredentials: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username: email, password });
      const { message, redirectUrl, tokens, user } = response.data;

      alert(`Logged in: ${message}`);

      Cookies.set('access_token', tokens.access_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('stream_token', tokens.stream_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('id', String(user.id), { secure: true, sameSite: 'Strict' });
      Cookies.set('username', user.username, { secure: true, sameSite: 'Strict' });
      Cookies.set('lastname', user.lastname, { secure: true, sameSite: 'Strict' });
      Cookies.set('email', user.email, { secure: true, sameSite: 'Strict' });
      Cookies.set('avatar', user.avatar || '', { secure: true, sameSite: 'Strict' });

      router.push('/chat');
    } catch (error: any) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoogleSignIn = () => {

    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/login/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 font-ubuntu">

      <div className="bg-[#0F172A] shadow-glow-slow backdrop-blur-md border border-[#8FADCC] shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-6 text-center gradient-header ">Sign In</h2>

       <form noValidate onSubmit={handleCredentialsSignIn}>

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
              />
            </div>

            {/* Sign In */}
            <button className="primary-button primary-button-full shadow-glow-slow">
              Sign In
            </button>
          </form>

              {/* Register */}
              <div className="mt-6">
                <p className="pb-2 text-white">Не маєш аккаунта?</p>
                <button
                  className="primary-button primary-button-full"
                  onClick={() => router.push('/register')}
                >
                  Register
                </button>
              </div>


              {/* Google */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-2">or</p>

                <div className="w-full">
                  <button className="google-button" onClick={handleGoogleSignIn}>
                    <GoogleIcon className="text-[#DB4437]" />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>


        

        </div>

      </div>

  );
}
