
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Chat, useGetChatsQuery } from '../../lib/features/api/chatSlice'
import { Message, useGetAllLastMessagesQuery, useGetLastMessageQuery } from '../../lib/features/api/messageSlice'
import Link from 'next/link'
import { useAppSelector } from '../../lib/hooks'
import ChatItem from './ChatItem'
import NewChatModal from './NewChatModal'

export default function ChatsList() {


  const currentMode = useAppSelector(state => state.mode.currentMode)
  const currentChats = currentMode.chats

  let bg_color = currentMode.bg_color

  const { data: chats = [], isLoading, isError } = useGetChatsQuery();
  const isStandartMode = currentMode.name === 'standartMode';


  let content: React.ReactNode[] = []

  



  isStandartMode ? 
  chats.map(chat => {
      const id = chat.id;
      content.push(<ChatItem id={id} key={id} />);
    })
  :
  currentChats.map(id => {
    // console.log('map ID --- ' + id)
    content.push(<ChatItem id={id} key={id}/>)
  }) 





  return (
    <div className='flex-col border-r place-items-center w-100 overflow-y-auto hidden sm:inline'>
        ChatList
       
        

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: {bg_color} }}>
          {content}
           
        </List>

         <NewChatModal/>
        

        {/* <ChatItem id={2}/> */}

        

      
    </div>
  )
}