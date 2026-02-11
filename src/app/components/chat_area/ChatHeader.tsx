'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PushPinIcon from '@mui/icons-material/PushPin';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useGetChatByIdQuery, useGetUsersByChatIdQuery } from '@/app/lib/features/api/chatSlice';
import { useAppSelector, useAppDispatch } from '@/app/lib/hooks';
import { Mode } from '@/app/types/Mode';
import { themeConfig } from '@/app/config/theme.config';
import ColorPickerModal from './color_picker/ColorPicker'; 
import { useSetModeThemeMutation } from '@/app/lib/features/chatMode/modeApi';
import { setModeThemeLocal } from '@/app/lib/features/chatMode/modeSlice';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';
import ThemeButton from '../header/ThemeButton';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie'
import { useGetUsersByChatQuery } from '@/app/lib/features/api/userSlice';


export default function ChatHeader({ current_chat_id }: { current_chat_id: number }) {
  
  const streamClient = useStreamClient();
  const router = useRouter();

  const userIdFromCookie = Cookies.get('id')
  const CURRENT_USER_ID = userIdFromCookie ? Number(userIdFromCookie) : null



 

  

  const {
    data: chat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChatByIdQuery(current_chat_id);

  const currentMode: Mode | null = useAppSelector((state) => state.mode.currentMode);
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE;
  const { textColor, primaryColor, borderColor, chatBgColorSecondary, iconsColor } = theme;

  let content: React.ReactNode;
  if (isLoading) content = 'loading';
  else if (isSuccess) content = chat.subject;
  else if (isError) content = <div>{error.toString()}</div>;



const handleStartCall = async () => {
  const URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const socket = io(URL, {
    withCredentials: true,
    transports: ["websocket"], 
  });

  if (!streamClient) return;

  const newCallId = `call-${Math.random().toString(36).substring(2, 10)}`;
  const call = streamClient.call('default', newCallId);
  await call.getOrCreate();



  socket.emit('startCall', {
    callerId: CURRENT_USER_ID,
    callId: newCallId,
    chatId: current_chat_id,
  });



  router.push(`/call?callId=${encodeURIComponent(newCallId)}`);
};




  return (
    <div className="flex flex-col border-b min-h-10 justify-center" style={{backgroundColor:chatBgColorSecondary , color: textColor, border: borderColor}}>
      <div className="flex place-content-between items-center flex-row">
        <h1 className="text-lg flex flex-col center pl-4" style={{ color: textColor }}>
          {content}
        </h1>
        <div className="mock_icons w-35 flex place-content-between gap-2 pr-4">
          <VideoCameraFrontIcon
            style={{ color: primaryColor, cursor: 'pointer' }}
            onClick={handleStartCall}
          />
          <PushPinIcon className="text-gray-500" />
          <ColorLensIcon className="text-gray-500" />

        </div>
      </div>

      

      
    </div>
  );
}
