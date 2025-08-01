import React, { useState } from 'react'
import { useCreateMessageMutation } from '../lib/features/api/messageSlice';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Form() {

    const [createPost] = useCreateMessageMutation();

    const [messageText, setMessageText] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [chatId, setChatId] = useState('');

   const  handleSend = async () => {
    const authorIdInt = parseInt(authorId, 10); // Десяткова система
    const chatIdInt = parseInt(chatId, 10);

        console.log("Text for sending:", messageText);
        console.log("authorId:", authorIdInt);
        console.log("chatId:", chatIdInt);
        setMessageText('')
        try {
            await createPost({ content: messageText , chatId: chatIdInt , userId: authorIdInt}).unwrap();
            console.log('Message created!');
        } catch (err) {
            console.error('Failed to create message:', err);
        }
        };

  const CURRENT_USER_ID = 1
  const CURRENT_CHAT_ID = 2

  return (
    <div className="flex flex-row h-auto border">
              <TextField className='bg-white w-30  rounded-2xl no-underline active:no-underline '
              id="filled-search"
              label="Author ID"
              type="search"
              variant="filled"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}/>

               <TextField className='bg-white w-30 rounded-2xl no-underline active:no-underline '
              id="filled-search"
              label="Chat ID"
              type="search"
              variant="filled"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}/>

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

