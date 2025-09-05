import { Avatar } from '@mui/material'
import React from 'react'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function UserInfo() {
  const username = getCookie('username') || 'Guest';
  const email = getCookie('email') || 'unknown@email.com';
  const avatar = getCookie('avatar') || '/static/images/avatar/2.jpg';

  return (
    <div className='flex flex-row  items-center pr-5'>
        

        <Avatar alt={username} src={avatar || 'error'} className='ml-2 mr-2' />
        <div className="flex flex-col">
            <p>{username}</p>
            <p>{email}</p>
        </div>
       
    </div>
  )
}
