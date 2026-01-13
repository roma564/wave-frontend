"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageBox from '../components/chat_area/MessageBox' 
import { Color } from '../components/chat_area/MessageBox' 

import SendIcon from '@mui/icons-material/Send';

import { Message } from '@/app/types/Message';

import { useGetMessageByChatIdQuery, useCreateMessageMutation } from '../lib/features/api/messageSlice'
import { useSearchParams } from 'next/navigation'
import { Button, TextField } from '@mui/material'
// import ChatsList from '../components/chat_list/ChatsList'
import Layout from '../components/header/Layout'
import ChatHeader from '../components/chat_area/ChatHeader' 
import Form from '../components/chat_area/Form' 
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';




import { io } from 'socket.io-client';
import { SocketProvider } from '../context/SocketContext'
import { useAppSelector } from '../lib/hooks'
import { red } from '@mui/material/colors';
import  ChatList  from '../components/chat_list/ChatsList';
import QuickMessageBar from '../components/chat_area/QuickMessages';
import DragDropUpload from '../components/chat_area/upload/DrugDropUpload';
import { themeConfig } from '../config/theme.config';
import { ThemeName } from '../types/ThemeName';
import { Mode } from '../types/Mode';
import JoinCallForm from '../components/header/JoinCallFrom';



// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const socket = io(URL);




export default function page() {




  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE // fallback

  const { bgColor, textColor, secondaryTextColor, primaryColor } = theme


  

  const searchParams = useSearchParams()
  let current_chat_id : number = Number(searchParams.get('chatId')) 

  const userIdFromCookie = Cookies.get('id')
  const CURRENT_USER_ID = userIdFromCookie ? Number(userIdFromCookie) : null

 
  

  // const CURRENT_USER_ID = 1

    const messagesEndRef = useRef<HTMLDivElement>(null);




  
 



  // const [current_chat_id, setChatId] = useState<number>(0)
  
  const [msgBoxes, setNewMsgBoxes] = useState<React.ReactNode[]>([])
  const [socketMessages, setSocketMessages] = useState<Message[]>([])


   

      //call
      const [incomingCall, setIncomingCall] = useState<any>(null);
      const [isCallActive, setIsCallActive] = useState(false); 
      const [callerId, setCallerId] = useState<number | null>(null);
      const [incomingCallId, setIncomingCallId] = useState<string | null>(null);

    


    useEffect(() => { if (isCallActive) { console.log('Call UI should now be visible'); } }, [isCallActive]);
    useEffect(() => { if (incomingCallId) { console.log('incomingCallId should now be visible:', incomingCallId); } }, [incomingCallId]);


    useEffect(()=>{
        socket.on('connect', ()=> {
            console.log('Connected')
        })
         // слухаємо подію дзвінка
        socket.on(`call-user-${CURRENT_USER_ID}`, (data) => {
        console.log('Incoming call event:', data);

          if (data.type === 'CALL_REQUEST') {
            setIsCallActive(true);
            setCallerId(data.callerId);
            setIncomingCallId(data.callId);
          }
        });


        socket.on(String(current_chat_id), (newMessage: Message) => {
          console.log('CHAT_ID event received')
          console.log(newMessage)

          const isImage = newMessage.mimeType?.startsWith('image/')
          const hasFile = !!newMessage.fileUrl

          const box = (
            <MessageBox
              key={newMessage.id}
              color={newMessage.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
              type={newMessage.type} 
              content={newMessage.content}
              authorName={newMessage.user.name}
              fileUrl={newMessage.fileUrl}
              fileName={newMessage.fileName}
              fileSize={newMessage.fileSize}
              mimeType={newMessage.mimeType}
            />
          )

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
        const boxes = messages.map((message: Message, index: number) => (
          <MessageBox
            key={message.id ?? `socket-${index}`}
            color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red}
            type={message.type} 
            content={message.content}
            authorName={message.user.name}
            fileUrl={message.fileUrl}
            fileName={message.fileName}
            fileSize={message.fileSize}
            mimeType={message.mimeType}
          />
        ))


        setNewMsgBoxes(boxes)
      }
      else{
        setNewMsgBoxes([<div>Empty chat </div>])
      }
    }, [isSuccess, messages])
    
      //acceptCall  
  const router = useRouter();
  const acceptCall = () => {
    if (!incomingCallId) return;
      //TODO
    socket.emit('answerCall', {
      chatId: current_chat_id,
      userId: currentMode?.id,
      callId: incomingCallId,
      accepted: true,
    });

    setIsCallActive(false);

    router.push(`/call?callId=${encodeURIComponent(incomingCallId)}`);
  };


  if (isLoading) {
    contentMessage = 'loading'
  } else if (isSuccess) {
    

  } else if (isError) {
    contentMessage = <div>{error.toString()}</div>
  }
  


  

 
    return (
      <Layout>

          <SocketProvider value={socket}>
            
            <div
              className="flex flex-row rounded-md  w-full h-screen overflow-hidden"
              style={{ backgroundColor: bgColor }}>

            <ChatList/>

             {isCallActive && incomingCallId && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      
                      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

                      {/* сама модалка */}
                      <div className="relative bg-white rounded-lg shadow-lg p-8 w-[400px] text-center z-10">
                        <p className="text-xl font-semibold mb-6">
                           Вхідний дзвінок від користувача {callerId}
                        </p>
                         <audio autoPlay loop>
                          <source src="/audio/ringthone.mp3" type="audio/mpeg" />
                        </audio>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={acceptCall}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                          >
                            Прийняти
                          </button>
                          <button
                            onClick={() => {
                              socket.emit('answerCall', {
                                chatId: current_chat_id,
                                userId: currentMode?.id,
                                callId: incomingCallId,
                                accepted: false,
                              });
                              setIsCallActive(false);
                            }}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                          >
                            Відхилити
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
            


              {current_chat_id ? (
                <div className="messages-wrapper flex flex-col w-full">
                  <ChatHeader current_chat_id={current_chat_id} />

                  <div className="messages  p-1 rounded-md overflow-y-auto w-full h-full">
                  {msgBoxes.length > 0 && msgBoxes}
                    <div ref={messagesEndRef} />
                  </div>
                  {/* <JoinCallForm/> */}

                 


                   

                    

                                                                                {/* //TODO */}
                  <DragDropUpload chatId={current_chat_id} userId={CURRENT_USER_ID || 0} />

                  


                  
                  
                


                  <QuickMessageBar chatId={current_chat_id} userId={CURRENT_USER_ID  || 0} socket={socket}/>
                  

                  <Form current_chat_id={current_chat_id} />
                  
                </div>
              ) : (
                
                <div className="flex flex-col items-center  w-full text-gray-500">
                  <img src="/images/choose_chat_blue.png" alt="Порожній чат" className="w-130 h-90 mt-20 mb-10"/>
                  <p  >Виберіть чат зі списку, щоб побачити повідомлення</p>
                </div>
              )}
            </div>
          </SocketProvider>
      </Layout>
    );

    
  
}





