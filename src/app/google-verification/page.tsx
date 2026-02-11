'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function GoogleVerificationPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const access_token = params.get('access_token');
    const stream_token = params.get('stream_token');
    const id = params.get('id');
    const username = params.get('username');
    const lastname = params.get('lastname');
    const email = params.get('email');
    const avatar = params.get('avatar');

    if (access_token && stream_token) {
      Cookies.set('access_token', access_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('stream_token', stream_token, { secure: true, sameSite: 'Strict' });
      Cookies.set('id', id || '', { secure: true, sameSite: 'Strict' });
      Cookies.set('username', username || '', { secure: true, sameSite: 'Strict' });
      Cookies.set('lastname', lastname || '', { secure: true, sameSite: 'Strict' });
      Cookies.set('email', email || '', { secure: true, sameSite: 'Strict' });
      Cookies.set('avatar', avatar || '', { secure: true, sameSite: 'Strict' });

      router.push('/chat');
    } else {
      alert('Google login failed');
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1730] text-white">
      <p>Перевіряємо твій Google‑акаунт...</p>
    </div>
  );
}
