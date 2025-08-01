
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Chat, useGetChatsQuery } from '../lib/features/api/chatSlice'
import { useGetLastMessageQuery } from '../lib/features/api/messageSlice'

export default function ChatsList() {

  const {
        data: chats = [],
        isLoading,
        isSuccess,
        isError,
        
      } = useGetChatsQuery()


  let content: React.ReactNode

    const {
        data: message,
        isLoading: isMessagesLoading,
        isSuccess: isMessagesSuccess,
        isError: isMessagesError,
        
      } = useGetLastMessageQuery(2)

  
      
          
      
        
      
  if (isLoading) {
    content = 'loading'
  } else if (isSuccess) {
    content = chats.map((chat : Chat) => 

    <ListItem key={chat.id} className='border border-black rounded-md mt-2' alignItems="flex-start">
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
                User ID: {message.userId} <br/>
              </Typography>
              {message.content}
            </React.Fragment>
          }
        />
      </ListItem>
  )
    console.log(chats)
    console.log(message)


  } else if (isError) {
    content = <div>{isError.toString()}</div>
  }



  return (
    <div className='flex flex-col place-items-center border w-100 overflow-y-auto'>
        ChatList

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {content}
        </List>

      
    </div>
  )
}
