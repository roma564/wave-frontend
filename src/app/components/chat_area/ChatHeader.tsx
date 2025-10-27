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


export default function ChatHeader({ current_chat_id }: { current_chat_id: number }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const [setModeTheme] = useSetModeThemeMutation();

  const {
    data: chat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChatByIdQuery(current_chat_id);

  const currentMode: Mode | null = useAppSelector((state) => state.mode.currentMode);
  const modeId = currentMode?.id;
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE;
  const { textColor, primaryColor } = theme;

  let content: React.ReactNode;
  if (isLoading) content = 'loading';
  else if (isSuccess) content = chat.subject;
  else if (isError) content = <div>{error.toString()}</div>;

  return (
    <div className="flex place-content-between items-center flex-row border" style={{ color: textColor }}>
      <h1 className="text-lg flex flex-col center pl-4" style={{ color: textColor }}>
        {content}
      </h1>
      <div className="mock_icons w-35 flex place-content-between gap-2 pr-4">
        <LocalPhoneIcon style={{ color: primaryColor }} />
        <VideoCameraFrontIcon style={{ color: primaryColor }} />
        <PushPinIcon style={{ color: primaryColor }} />
        <ColorLensIcon style={{ color: primaryColor }} onClick={() => setShowModal(true)} />
      </div>

      {showModal && (
        <ColorPickerModal
          onClose={() => setShowModal(false)}
          onSelectTheme={(theme) => {
            if (currentMode?.id) {
              // бекенд
              setModeTheme({ modeId: currentMode.id, theme });
              // локально одразу оновлюємо
              dispatch(setModeThemeLocal(theme));
            }
          }}
        />

      )}
    </div>
  );
}
