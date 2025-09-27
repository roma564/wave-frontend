import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'


export default function UserInfo() {
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('unknown@email.com');
  const [avatar, setAvatar] = useState('/static/images/avatar/2.jpg');



  useEffect(() => {
    const username = Cookies.get('username') || 'Guest'
    const email = Cookies.get('email') || 'unknown@email.com'
    const avatar = Cookies.get('avatar') || '/static/images/avatar/2.jpg'

    setUsername(username)
    setEmail(email)
    setAvatar(avatar)
  }, [])

  return (
    <div className='flex flex-row items-center pr-5'>
      <img alt={username} src={avatar || 'error'} className='rounded-full hidden sm:inline ml-2 mr-2 w-12 h-12' />
      <div className="flex flex-col">
        <p className="hidden md:inline">{username}</p>
        <p className="hidden md:inline">{email}</p>
      </div>
    </div>
  );
}
