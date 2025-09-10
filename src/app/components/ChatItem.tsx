import React from 'react'
import { useAppSelector } from '../lib/hooks'
import { useGetChatByIdQuery } from '../lib/features/api/chatSlice'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography } from '@mui/material'
import { useGetLastMessageQuery } from '../lib/features/api/messageSlice'
import Link from 'next/link'



function ChatItem( { id }: { id: number } ) {

      const {
        data: chat,
        isLoading,
        isSuccess,
        isError,
      } = useGetChatByIdQuery(id)

      const {
        data: message,
        isLoading: isMessageLoading,
        isSuccess: isMessageSuccess,
        isError: isMessageError,
      } = useGetLastMessageQuery(id)

      let content: React.ReactNode



      if (isLoading) {
        content = 'Loading'
        // content = <Skeleton variant="circular" width={40} height={40} />
      }
      else if(isSuccess){
        content =
        <Link href={`/chat?chatId=${id}`}>
          <ListItem className=" mt-2 hover:bg-sky-700" alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'black', display: 'inline' }}
                  >
                    {chat.subject} <br />
                    User ID: {message?.userId} <br />
                  </Typography>
                  {message?.content || 'Немає повідомлення'}
                </React.Fragment>
              }
            />
          </ListItem>
          </Link>
      } 
      else if (isError) {
        content = <div>{isError.toString()}</div>
      }


  return (
    
       <div>
        {content}
       </div>
    
  )
}


export default ChatItem