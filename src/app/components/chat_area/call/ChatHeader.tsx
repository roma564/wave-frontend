'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PushPinIcon from '@mui/icons-material/PushPin';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useGetChatByIdQuery } from '@/app/lib/features/api/chatSlice';
import { useAppSelector, useAppDispatch } from '@/app/lib/hooks';
import { Mode } from '@/app/types/Mode';
import { themeConfig } from '@/app/config/theme.config';
import ColorPickerModal from '../color_picker/ColorPicker'; 
import { useSetModeThemeMutation } from '@/app/lib/features/chatMode/modeApi';
import { setModeThemeLocal } from '@/app/lib/features/chatMode/modeSlice';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';

export default function ChatHeader({ current_chat_id }: { current_chat_id: number }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const [setModeTheme] = useSetModeThemeMutation();
  const streamClient = useStreamClient();
  const router = useRouter();

  const {
    data: chat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChatByIdQuery(current_chat_id);

  const currentMode: Mode | null = useAppSelector((state) => state.mode.currentMode);
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE;
  const { textColor, primaryColor } = theme;

  let content: React.ReactNode;
  if (isLoading) content = 'loading';
  else if (isSuccess) content = chat.subject;
  else if (isError) content = <div>{error.toString()}</div>;

  const handleStartCall = () => {
    if (!streamClient) return;

    router.push(`/call`);
  };


  return (
    <div className="flex flex-col border" style={{ color: textColor }}>
      <div className="flex place-content-between items-center flex-row">
        <h1 className="text-lg flex flex-col center pl-4" style={{ color: textColor }}>
          {content}
        </h1>
        <div className="mock_icons w-35 flex place-content-between gap-2 pr-4">
          <VideoCameraFrontIcon
            style={{ color: primaryColor, cursor: 'pointer' }}
            onClick={handleStartCall}
          />
          <PushPinIcon style={{ color: primaryColor }} />
          <ColorLensIcon style={{ color: primaryColor }} onClick={() => setShowModal(true)} />
        </div>
      </div>

      {showModal && (
        <ColorPickerModal
          onClose={() => setShowModal(false)}
          onSelectTheme={(theme) => {
            if (currentMode?.id) {
              setModeTheme({ modeId: currentMode.id, theme });
              dispatch(setModeThemeLocal(theme));
            }
          }}
        />
      )}
    </div>
  );
}
