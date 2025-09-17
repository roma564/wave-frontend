'use client';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

export default function SignUpForm() {
  const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        lastname,
      });
      alert(`Registered: ${response.data.message}`);
      window.location.href = response.data.redirectUrl;
    } catch (error: any) {
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1730] px-4">
      <div className="bg-[#304D69] shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>

        <form onSubmit={handleRegister} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
              First Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-white border-[#8FADCC] focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-white text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-white border-[#8FADCC] focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
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
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
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
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">or</p>
          <Button
            onClick={handleGoogleSignUp}
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
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
