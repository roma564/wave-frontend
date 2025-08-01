"use client"
import React, { useState } from 'react'
import MessageBox from '../components/message'
import {Color} from '../components/message'
import { useRouter } from 'next/router'
import SendIcon from '@mui/icons-material/Send';

import { useGetMessageByChatIdQuery, Message, useCreateMessageMutation } from '../lib/features/api/messageSlice'
import { useSearchParams } from 'next/navigation'
import { Button, TextField } from '@mui/material'
import ChatsList from '../components/ChatsList'
import Layout from '../components/layout'
import ChatHeader from '../components/chat_header'
import Form from '../components/Form'

interface MessageExcerptProps {
  message: Message
}

export default function page() {

    const searchParams = useSearchParams()
 
  const CURRENT_CHAT_ID = searchParams.get('chatId') || 2
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'

  

  const [messageText, setMessageText] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [chatId, setChatId] = useState('');

  

//   const  handleSend = async () => {
//     const authorIdInt = parseInt(authorId, 10); // Десяткова система
//     const chatIdInt = parseInt(chatId, 10);

//   console.log("Text for sending:", messageText);
//   console.log("authorId:", authorIdInt);
//   console.log("chatId:", chatIdInt);
//   setMessageText('')
//   try {
//     await createPost({ content: messageText , chatId: chatIdInt , userId: authorIdInt}).unwrap();
//     console.log('Message created!');
//   } catch (err) {
//     console.error('Failed to create message:', err);
//   }
// };



  // const id = useSearchParams()
  

  const CURRENT_USER_ID = 1

  const {
      data: messages = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetMessageByChatIdQuery(CURRENT_CHAT_ID)

    const [createPost] = useCreateMessageMutation();

    let contentMessage: React.ReactNode

    

  

  if (isLoading) {
    contentMessage = 'loading'
  } else if (isSuccess) {
    contentMessage = messages.map((message : Message) => 
    <MessageBox key={message.id} color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red } content={message.content}/>)
    console.log(messages)
  } else if (isError) {
    contentMessage = <div>{error.toString()}</div>
  }

  

  return (
    <Layout>
      
        <div className='flex flex-row  rounded-md border w-full  h-screen'>
          <ChatsList />
          <div className="messages-wrapper flex flex-col w-full h-ful">
            <ChatHeader/>


            <div className="messages border p-1  rounded-md overflow-y-auto w-full h-130">
              chat page
              

              {contentMessage}
                
            </div>

            <Form/>

             <div>Search: {CURRENT_CHAT_ID}</div>
          </div>
         
          
      </div>
    </Layout>
    
  )
}



