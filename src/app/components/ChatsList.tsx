
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Chat, useGetChatsQuery } from '../lib/features/api/chatSlice'
import { Message, useGetAllLastMessagesQuery, useGetLastMessageQuery } from '../lib/features/api/messageSlice'
import Link from 'next/link'

export default function ChatsList() {

  const {
        data: chats = [],
        isLoading,
        isSuccess,
        isError,
        
      } = useGetChatsQuery()


  let content: React.ReactNode

    const {
        data: messages = [],
        isLoading: isMessagesLoading,
        isSuccess: isMessagesSuccess,
        isError: isMessagesError,
        
      } = useGetAllLastMessagesQuery()

  
      
          
      
        
      
  if (isLoading) {
    content = 'loading'
  } else if (isSuccess) {
    //  <ul>
    //       {posts.map((post) => (
    //         <li key={post.id}>
    //           <Link href={`/blog/${post.slug}`}>{post.title}</Link>
    //         </li>
    //       ))}
    //     </ul>

    const messageMap = messages.reduce((acc, msg) => {
      acc[msg.chatId] = msg
      return acc
    }, {} as Record<string, Message>)

    

  content = chats.map((chat: Chat) => {
  const message = messageMap[chat.id]

  return (
    <Link key={chat.id} href={`/chat/?chatId=${chat.id}`}>
      <ListItem className="border border-black rounded-md mt-2 hover:bg-sky-700" alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={chat.subject}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'black', display: 'inline' }}
              >
                User ID: {message?.userId} <br />
              </Typography>
              {message?.content || 'Немає повідомлення'}
            </React.Fragment>
          }
        />
      </ListItem>
    </Link>
  )
})



  } else if (isError) {
    content = <div>{isError.toString()}</div>
  }



  return (
    <div className='flex flex-col place-items-center border h-full w-100 overflow-y-auto'>
        ChatList

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {content}
        </List>

        

      
    </div>
  )
}
