import React from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/app/lib/hooks';
import { useGetChatByIdQuery } from '@/app/lib/features/api/chatSlice';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography, Skeleton } from '@mui/material';
import { useGetLastMessageQuery } from '@/app/lib/features/api/messageSlice';
import Link from 'next/link';
import { Mode } from '@/app/types/Mode';
import { themeConfig } from '@/app/config/theme.config';

function ChatItem({ id }: { id: number }) {

  const { data: chat, isLoading, isError } = useGetChatByIdQuery(id);
  const { data: message, isLoading: isMessageLoading } = useGetLastMessageQuery(id);

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE 

  const { bgColor, textColor, secondaryTextColor, primaryColor } = theme
  



  if (isLoading || isMessageLoading) {
    return (
    <div className="flex items-start mt-2 py: 0, mb: 0">
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
    <Link href={`/chat?chatId=${id}`} className="no-underline w-full">
      <div
        className="mt-2 flex items-start transition-colors px-2 py-1 rounded-md"
        style={{
          backgroundColor: 'transparent',
          color: textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = primaryColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <ListItemAvatar>
          <Avatar alt={message?.user.name ?? 'Користувач'} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <div className="ml-3 flex flex-col">
          <span style={{ color: textColor }}>{chat?.subject}</span>
          <span style={{ color: textColor }}>{message?.user.name}</span>
          <span style={{ color: secondaryTextColor }}>
            {message?.content ?? 'Немає повідомлення'}
          </span>
        </div>
      </div>
    </Link>
  )

}

export default ChatItem;
