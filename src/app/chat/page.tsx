"use client"
import React from 'react'
import MessageBox from '../components/message'
import {Color} from '../components/message'

import { useGetMessageByChatIdQuery, Message } from '../lib/features/api/apiSlice'

interface MessageExcerptProps {
  message: Message
}

export default function page() {

  const CURRENT_USER_ID = 1
  const {
      data: messages = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetMessageByChatIdQuery(2)

    let contentMessage: React.ReactNode

    

  

  if (isLoading) {
    contentMessage = 'loading'
  } else if (isSuccess) {
    contentMessage = messages.map((message : Message) => 
    <MessageBox color={message.userId === CURRENT_USER_ID ? Color.Blue : Color.Red } content={message.content}/>)
    console.log(messages)
  } else if (isError) {
    contentMessage = <div>{error.toString()}</div>
  }

  

  return (
    <div className='flex flex-row place-content-center border w-full min-h-full'>
        <div className="messages border w-200  ">
            chat page
            <MessageBox color={Color.Red} content="text content in props"/>
            <MessageBox color={Color.Blue} content="text content in props"/>
            {contentMessage}
        </div>
        
    </div>
  )
}



