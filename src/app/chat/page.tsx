"use client"
import React, { useEffect, useState } from 'react'
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


import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const socket = io(URL);

//  type MessagePayload = {
//     content: string,
//     msg: string
//  }



export default function page() {

  const searchParams = useSearchParams()
 
  const CURRENT_CHAT_ID : number = Number(searchParams.get('chatId')) || 2
    const CURRENT_USER_ID = 1
 



  const [newMessages, setNewMessages] = useState<Message[]>([])
  const [msgBoxes, setNewMsgBoxes] = useState<React.ReactNode[]>([])
  const [socketMessages, setSocketMessages] = useState<Message[]>([])


    const [value, setValue] = useState('')


    useEffect(()=>{
        socket.on('connect', ()=> {
            console.log('Connected')
        })
        socket.on(String(CURRENT_CHAT_ID), (newMessage: Message)=>{
            console.log('CHAT_ID event recieved')
            console.log(newMessage)
            const box = <MessageBox
            key={newMessage.id}
            color={newMessage.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
            content={newMessage.content}
          />

            
            // setSocketMessages(prev => [...prev, newMessage])
            setNewMsgBoxes(prev => [...prev, box])
        })

        return () => {
            console.log('Unregistering events...')
            socket.off('connect')
            socket.off('onMessage')

        }
    }, [])
  



  const {
      data: messages = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetMessageByChatIdQuery(CURRENT_CHAT_ID)

    const [createPost] = useCreateMessageMutation();

    let contentMessage: React.ReactNode

    useEffect(() => {
      if (isSuccess && messages.length > 0) {
        const boxes = messages.map((message: Message) => (
          <MessageBox
            key={message.id}
            color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
            content={message.content}
          />
        ))
        setNewMsgBoxes(boxes)
      }
    }, [isSuccess, messages])
    

  

  if (isLoading) {
    contentMessage = 'loading'
  } else if (isSuccess) {
    
    // contentMessage = messages.map((message : Message) => 
    // <MessageBox key={message.id} color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red } content={message.content}/>)
    // console.log(messages)
    // setNewMsgBoxes((prev) => [...prev, contentMessage])

  } else if (isError) {
    contentMessage = <div>{error.toString()}</div>
  }

  

  return (
    <Layout>
      
        <div className='flex flex-row  rounded-md border w-full  h-screen'>
          <ChatsList />
          <div className="messages-wrapper flex flex-col w-full h-ful">
            <ChatHeader CURRENT_CHAT_ID = {CURRENT_CHAT_ID}/>


            <div className="messages border p-1  rounded-md overflow-y-auto w-full h-130">
              

              {/* {messages.map((message: Message)  => (
                  <MessageBox
                    key={message.id}
                    color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
                    content={message.content}
                  />
                ))}

                {socketMessages.map(message => (
                  <MessageBox
                    key={`socket-${message.id}`}
                    color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
                    content={message.content}
                  />
                ))} */}

                {msgBoxes}
                
            </div>

            <Form CURRENT_CHAT_ID = {CURRENT_CHAT_ID}/>

             <div>ChatID: {CURRENT_CHAT_ID}</div>
          </div>
         
          
      </div>
    </Layout>
    
  )
}



