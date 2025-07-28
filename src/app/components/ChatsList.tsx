import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Chat, useGetChatsQuery } from '../lib/features/api/chatSlice'

export default function ChatsList() {

  const {
        data: chats = [],
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetChatsQuery()


  let content: React.ReactNode
      
          
      
        
      
  if (isLoading) {
    content = 'loading'
  } else if (isSuccess) {
    content = chats.map((chat : Chat) => 

    <ListItem className='border border-black rounded-md mt-2' alignItems="flex-start">
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
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
  )
    console.log(chats)


  } else if (isError) {
    content = <div>{error.toString()}</div>
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
