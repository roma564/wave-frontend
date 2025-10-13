import React from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/app/lib/hooks';
import { useGetChatByIdQuery } from '@/app/lib/features/api/chatSlice';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography, Skeleton } from '@mui/material';
import { useGetLastMessageQuery } from '@/app/lib/features/api/messageSlice';
import Link from 'next/link';

function ChatItem({ id }: { id: number }) {
  const currentMode = useAppSelector(state => state.mode.currentMode);

  const { data: chat, isLoading, isError } = useGetChatByIdQuery(id);
  const { data: message, isLoading: isMessageLoading } = useGetLastMessageQuery(id);

  if (isLoading || isMessageLoading) {
    return (
    <div className="flex items-start mt-2">
      {/* Аватар */}
      <img
        src="/path/to/avatar.jpg"
        alt="User avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Текстовий блок */}
      <div className="flex flex-col gap-1 ml-4">
       <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> 
       <Skeleton variant="text" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> 
       <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      </div>
    </div>
);

  }

  if (isError) return <div>Error loading chat </div>;



  return (
 
      <div
        className="mt-2 transition-colors flex items-start"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = currentMode.primary_color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Link href={`/chat?chatId=${id}`} className="flex w-full no-underline">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          
              <div>
                <span style={{ color: currentMode.text_color }}>{chat?.subject}</span><br />
                <span style={{ color: currentMode.text_color }}>{message?.user.name}</span><br />
                <span style={{ color: currentMode.secondary_text_color }}>
                  {message?.content || 'Немає повідомлення'}
                </span>
              </div>
            
          
        </Link>
      </div>

  );
}

export default ChatItem;
