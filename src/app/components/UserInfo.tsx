import { Avatar } from '@mui/material'
import React from 'react'

export default function UserInfo() {
  return (
    <div className='flex flex-row  items-center pr-5'>
        
        <Avatar  alt="Travis Howard" src="/static/images/avatar/2.jpg" className='ml-2 mr-2'/>
        <div className="flex flex-col">
            <p>Username</p>
            <p>example@email.com</p>
        </div>
       
    </div>
  )
}
