"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageBox from '../components/chat_area/MessageBox' 
import { Color } from '../components/chat_area/MessageBox' 

import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';

import { useGetMessageByChatIdQuery, Message, useCreateMessageMutation } from '../lib/features/api/messageSlice'
import { useSearchParams } from 'next/navigation'
import { Button, TextField } from '@mui/material'
import ChatsList from '../components/chat_list/ChatsList'
import Layout from '../components/header/Layout'
import ChatHeader from '../components/chat_area/chat_header' 
import Form from '../components/chat_area/Form' 
import Cookies from 'js-cookie'




import { io } from 'socket.io-client';
import { SocketProvider } from '../context/SocketContext'
import { useAppSelector } from '../lib/hooks'
import emptyChat from '../components/emptyChat';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const socket = io(URL);

//  type MessagePayload = {
//     content: string,
//     msg: string
//  }




export default function page() {

 

  const currentMode = useAppSelector(state => state.mode.currentMode)

  const searchParams = useSearchParams()
  let current_chat_id : number = Number(searchParams.get('chatId')) 

  const userIdFromCookie = Cookies.get('id')
  const CURRENT_USER_ID = userIdFromCookie ? Number(userIdFromCookie) : null

 
  

  // const CURRENT_USER_ID = 1

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
            console.log(newMessage.author)

            const box = <MessageBox
            key={newMessage.id}
            color={newMessage.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
            content={newMessage.content}
            authorName={newMessage.author.name}
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
            authorName={`${message.author.name}`}
          />
        ))
        setNewMsgBoxes(boxes)
      }
      else{
        setNewMsgBoxes([<div>Empty chat </div>])
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


//   if (!current_chat_id || isNaN(current_chat_id)) {
//   return (
//     <Layout>
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         <p>Виберіть чат зі списку, щоб почати розмову</p>
//       </div>
//     </Layout>
//   );
// }

  

 
    return (
      <Layout>
        <SocketProvider value={socket}>
          <div
            className="flex flex-row rounded-md  w-full h-screen overflow-hidden"
            style={{ backgroundColor: currentMode.bg_color, color: currentMode.text_color }}
          >

            <ChatsList />


            {current_chat_id ? (
              <div className="messages-wrapper flex flex-col w-full">
                <ChatHeader current_chat_id={current_chat_id} />

                <div className="messages  p-1 rounded-md overflow-y-auto w-full h-130">
                 {msgBoxes.length > 0 && msgBoxes}
                  <div ref={messagesEndRef} />
                </div>

                <Form current_chat_id={current_chat_id} />
                
              </div>
            ) : (
              
              <div className="flex flex-col items-center  w-full text-gray-500">
                <img src="/images/choose_chat_blue.png" alt="Порожній чат" className="w-130 h-90 mt-20 mb-10"/>
                <p style={{ color: currentMode.secondary_text_color }} >Виберіть чат зі списку, щоб побачити повідомлення</p>
              </div>
            )}
          </div>
        </SocketProvider>
      </Layout>
    );

    
  
}





