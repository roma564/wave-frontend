import React from 'react';
import { useAppSelector } from '../lib/hooks';
import { useGetChatByIdQuery } from '../lib/features/api/chatSlice';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography, Skeleton } from '@mui/material';
import { useGetLastMessageQuery } from '../lib/features/api/messageSlice';
import Link from 'next/link';

function ChatItem({ id }: { id: number }) {
  const currentMode = useAppSelector(state => state.mode.currentMode);

  const { data: chat, isLoading, isError } = useGetChatByIdQuery(id);
  const { data: message, isLoading: isMessageLoading } = useGetLastMessageQuery(id);

  if (isLoading || isMessageLoading) {
    return (
      <ListItem className="mt-2" alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <div className="flex flex-col gap-1">
              <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Skeleton variant="text" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </div>
          }
        />
      </ListItem>

    );
  }

  if (isError) return <div>Error loading chat</div>;

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
         <div>
            <span style={{ color: currentMode.text_color }}>{chat?.subject}</span><br />
            <span style={{ color: currentMode.text_color }}>{message?.author.name}</span><br />
            <span style={{ color: currentMode.secondary_text_color }}>
              {message?.content || 'Немає повідомлення'}
            </span>
          </div>
        }
      />
    </ListItem>
  );
}

export default ChatItem;
