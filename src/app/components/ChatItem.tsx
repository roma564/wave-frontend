import React from 'react'
import { useAppSelector } from '../lib/hooks'
import { useGetChatByIdQuery } from '../lib/features/api/chatSlice'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useGetLastMessageQuery } from '../lib/features/api/messageSlice'
import Link from 'next/link'

function ChatItem({ id }: { id: number }) {
  const currentMode = useAppSelector(state => state.mode.currentMode)

  const { data: chat, isLoading, isSuccess, isError } = useGetChatByIdQuery(id)
  const { data: message } = useGetLastMessageQuery(id)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading chat</div>

  console.log('Chat ID:', id)
  console.log('Last message:', message)

  return (
    <ListItem
      component={Link}
      href={`/chat?chatId=${id}`}
      className="mt-2 hover:bg-sky-700"
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
          secondary={
            <Typography
              component="span"
              variant="body2"
              style={{ color: currentMode.text_color }}
            >
              {chat?.subject} <br />
              {message?.author.name} <br />
              <span style={{ color: currentMode.secondary_text_color }}>
                {message?.content || 'Немає повідомлення'}
              </span>
            </Typography>
          }
        />

    </ListItem>
  )
}

export default ChatItem
