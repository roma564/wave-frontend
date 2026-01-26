'use client';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google'
import Cookies from 'js-cookie';
// import axios from 'axios';
import axios from 'axios';


export default function SignInForm() {



const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: false, // тепер кукі формуємо самі
});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username: email, password });
      const { message, redirectUrl, tokens, user } = response.data;

      alert(`Logged in: ${message}`);

      // Формуємо кукі на фронті
      Cookies.set('access_token', tokens.access_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('stream_token', tokens.stream_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('id', String(user.id), { secure: true, sameSite: 'Strict' });
      Cookies.set('username', user.username, { secure: true, sameSite: 'Strict' });
      Cookies.set('lastname', user.lastname, { secure: true, sameSite: 'Strict' });
      Cookies.set('email', user.email, { secure: true, sameSite: 'Strict' });
      Cookies.set('avatar', user.avatar || '', { secure: true, sameSite: 'Strict' });

      // редірект
      window.location.href = redirectUrl;
    } catch (error: any) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/login/google`;
  };

 


  

  return (

   
    <div className="min-h-screen flex items-center justify-center bg-[#0d1730] px-4">
      <div className="bg-[#304D69] border border-[#8FADCC] shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>

        <form onSubmit={handleCredentialsSignIn} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white  text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-white border-[#8FADCC] focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-white border-[#8FADCC] focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
          >
            Sign In
          </button>

          
        </form>

        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 mt-5"
            onClick={() => {window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/register`}}
          >
            Register
        </button>


        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">or</p>
          <Button
          onClick={handleGoogleSignIn}
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: '#DB4437',
            '&:hover': { backgroundColor: '#c33d2f' },
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            width: '100%',
            py: 1.5,
          }}
        >
          Sign in with Google
        </Button>
        </div>
      </div>
    </div>
  );
}
