"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { SocketProvider } from '../context/SocketContext'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const socket = io(URL);

//  type MessagePayload = {
//     content: string,
//     msg: string
//  }




export default function page() {

  

  const searchParams = useSearchParams()
  let current_chat_id : number = Number(searchParams.get('chatId')) 
 
  

  const CURRENT_USER_ID = 1

    const messagesEndRef = useRef<HTMLDivElement>(null);


  
 



  // const [current_chat_id, setChatId] = useState<number>(0)
  
  const [msgBoxes, setNewMsgBoxes] = useState<React.ReactNode[]>([])
  const [socketMessages, setSocketMessages] = useState<Message[]>([])


    


    useEffect(()=>{
        socket.on('connect', ()=> {
            console.log('Connected')
        })
        socket.on(String(current_chat_id), (newMessage: Message)=>{
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
    }, [searchParams])

    

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [msgBoxes]);

    useEffect(() => {
      current_chat_id = Number(searchParams.get('chatId')) 
      // setChatId(chat_id)
      console.log("current_chat_id on page: "+ current_chat_id )
    }, [searchParams]);


    
  



  const {
      data: messages = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetMessageByChatIdQuery(current_chat_id)

    const [createPost] = useCreateMessageMutation();

    let contentMessage: React.ReactNode

    useEffect(() => {
      if (isSuccess && messages.length > 0) {
        const boxes = messages.map((message: Message, index:number) => (
          <MessageBox
            key={message.id ?? `socket-${index}`}
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
      <SocketProvider value={socket}>

        <div className='flex flex-row  rounded-md border w-full  h-screen'>
          <ChatsList />
          <div className="messages-wrapper flex flex-col w-full ">
            <ChatHeader current_chat_id = {current_chat_id}/>


            <div className="messages border p-1  rounded-md overflow-y-auto w-full h-130" >
              

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
                <div ref={messagesEndRef} />
                
            </div >

            <Form current_chat_id = {current_chat_id}/>

            <div>ChatID: {current_chat_id}</div>
          </div>
        
          
      </div>

      </SocketProvider>
      
      
        
    </Layout>
    
  )
}





