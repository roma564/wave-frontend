import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function UserInfo() {
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('unknown@email.com');
  const [avatar, setAvatar] = useState('/static/images/avatar/2.jpg');

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };

    console.log(avatar)

    setUsername(getCookie('username') || 'Guest');
    setEmail(getCookie('email') || 'unknown@email.com');
    setAvatar(getCookie('avatar') || '/static/images/avatar/2.jpg');

  }, []);

  return (
    <div className='flex flex-row items-center pr-5'>
      <Avatar alt={username} src={avatar || 'error'} className='ml-2 mr-2' />
      <div className="flex flex-col">
        <p>{username}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}
