import React, { useContext, useState } from 'react'
import { useCreateMessageMutation } from '@/app/lib/features/api/messageSlice';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '@/app/context/SocketContext'; 
import Link from 'next/link';
import Cookies from 'js-cookie'

export default function Form( {current_chat_id}: {current_chat_id : number }) {
    
   

    const [createMessage] = useCreateMessageMutation();

    

    const [messageText, setMessageText] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [chatId, setChatId] = useState('');

    const socket = useContext(SocketContext)
    const userIdFromCookie = Cookies.get('id')
    const CURRENT_USER_ID = userIdFromCookie ? Number(userIdFromCookie) : null

 

    const handleSend = async () => {
      if (!messageText.trim() || !CURRENT_USER_ID || !current_chat_id) return;

      try {

        socket.emit('createMessage', {
          content: messageText,
          chatId: current_chat_id,
          userId: CURRENT_USER_ID,
        });

        setMessageText('');
       
      } catch (err) {
        console.error('Failed to create message:', err);
      }
    };

  return (
    <div className="flex flex-row h-auto ">
              {/* <TextField className='bg-white w-30  rounded-2xl no-underline active:no-underline '
              id="filled-search"
              label="Author ID"
              type="search"
              variant="filled"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}/> */}

               {/* <TextField className='bg-white w-30 rounded-2xl no-underline active:no-underline '
              id="filled-search"
              label="Chat ID"
              type="search"
              variant="filled"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}/> */}

                <TextField className='bg-white w-full rounded-2xl no-underline active:no-underline '
              id="filled-search"
              label="Message field"
              type="search"
              variant="filled"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}/>

             
              
              <Button className='rounded-2xl ml-3 ' variant="contained" endIcon={<SendIcon />} onClick={handleSend} >
                Send
              </Button>
                

              
    </div>
  )


}

