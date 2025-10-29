'use client';

import { StreamVideoClient } from '@stream-io/video-react-sdk';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

export const useStreamClient = () => {
  return useMemo(() => {
    const id = Cookies.get('id') || 'guest';
    const name = Cookies.get('username') || 'Guest';
    const token = Cookies.get('stream_token');

    console.log('token - ', token)

    if (!token) throw new Error('Missing stream_token');

    return new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: { id, name, type: 'authenticated' },
      token,
    });
  }, []);
};
