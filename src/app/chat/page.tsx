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



  // const id = useSearchParams()
  

  const CURRENT_USER_ID = 1
  const CURRENT_CHAT_ID = 2

  const {
      data: messages = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetMessageByChatIdQuery(2)

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
      
        <div className='flex flex-row place-content-center rounded-md border w-full min-h-full'>
        <ChatsList />
        <div className="messages-wrapper">
             <div className="messages border  p-1 rounded-md  h-screen  overflow-y-auto w-full">
              chat page
              <ChatHeader/>

              {contentMessage}
              
          </div>
        </div>
         
          <Form/>
      </div>
    </Layout>
    
  )
}



