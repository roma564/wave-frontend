'use client';

import React, { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PushPinIcon from '@mui/icons-material/PushPin';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useGetChatByIdQuery } from '@/app/lib/features/api/chatSlice';
import { useAppSelector, useAppDispatch } from '@/app/lib/hooks';
import { Mode } from '@/app/types/Mode';
import { themeConfig } from '@/app/config/theme.config';
import ColorPickerModal from './color_picker/ColorPicker'; 
import { useSetModeThemeMutation } from '@/app/lib/features/chatMode/modeApi';
import { setModeThemeLocal } from '@/app/lib/features/chatMode/modeSlice';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';
import type { Call } from '@stream-io/video-react-sdk';

import CallUI from './upload/LocalParcipiantTitle';

export default function ChatHeader({ current_chat_id }: { current_chat_id: number }) {
  const [showModal, setShowModal] = useState(false);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);


  const dispatch = useAppDispatch();
  const [setModeTheme] = useSetModeThemeMutation();
  const streamClient = useStreamClient();

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

  const handleStartCall = async () => {
    if (!streamClient) return;
    const callId = `call-${Math.random().toString(36).substring(2, 10)}`;
    const call = streamClient.call('default', callId);
    await call.getOrCreate();
    await call.join();
    setActiveCall(call);
    setActiveCallId(callId);
  };

  return (
    <div className="flex flex-col border" style={{ color: textColor }}>
      <div className="flex place-content-between items-center flex-row">
        <h1 className="text-lg flex flex-col center pl-4" style={{ color: textColor }}>
          {content}
        </h1>
        {activeCallId && (
          <div className="text-sm text-gray-500 pl-4 pb-2">
            📞 Call ID: <span className="font-mono">{activeCallId}</span>
          </div>
        )}
        <div className="mock_icons w-35 flex place-content-between gap-2 pr-4">
          <LocalPhoneIcon
            style={{ color: primaryColor, cursor: 'pointer' }}
            onClick={handleStartCall}
          />
          <VideoCameraFrontIcon style={{ color: primaryColor }} />
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

      {activeCall && streamClient && (
        <div className="h-[500px] border-t mt-2">
          <CallUI client={streamClient} call={activeCall} />
        </div>
      )}
    </div>
  );
}
