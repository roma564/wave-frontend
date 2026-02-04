import React, { useContext, useState } from 'react'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '@/app/context/SocketContext'; 
import Cookies from 'js-cookie'
import { useAppSelector } from '@/app/lib/hooks';
import ToysIcon from '@mui/icons-material/Toys';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachmentUploadButton from './upload/DrugDropUpload';

import { MessageType } from '@/app/types/MessageType';
import { themeConfig } from '@/app/config/theme.config';
import { Mode } from '@/app/types/Mode';
import { EmojiPortal } from './sickers/EmodjiPortal';
import StickerPicker from './sickers/StickerPicker';

export default function Form({ current_chat_id }: { current_chat_id: number }) {

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE 
    
  const { primaryColor, chatListBgColor, iconsColor } = theme
    
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [messageText, setMessageText] = useState('');

  const socket = useContext(SocketContext)
  const userIdFromCookie = Cookies.get('id')
  const CURRENT_USER_ID = userIdFromCookie ? Number(userIdFromCookie) : null

  const handleSend = async () => {
    if (!messageText.trim() || !CURRENT_USER_ID || !current_chat_id) return;

    try {
      socket.emit('createMessage', {
        type: MessageType.TEXT,
        content: messageText,
        chatId: current_chat_id,
        userId: CURRENT_USER_ID,
      });

      setMessageText('');
    } catch (err) {
      console.error('Failed to create message:', err);
    }
  };

  const handleStickerSend = (url: string) => {
    if (!CURRENT_USER_ID || !current_chat_id) return;

    socket.emit('createMessage', {
      type: MessageType.STICKER,
      chatId: current_chat_id,
      userId: CURRENT_USER_ID,
      fileUrl: url,
    });

    setShowStickerPicker(false);
  };

  return (
    <div className="flex flex-row h-auto items-center">

      {/* Контейнер  */}
      <div 
        className="flex flex-row items-center rounded-lg overflow-hidden m-2"
        style={{ backgroundColor: chatListBgColor }}
      >
        {/* Input */}
        <input
          className="w-140 h-10 px-3 outline-none border-none bg-transparent"
          placeholder="Message field"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />

        {/* Emoji button з*/}
        <Button 
          onClick={() => setShowEmojiPicker(prev => !prev)} 
          className="h-10  border-gray-300 rounded-none"
        >
          <EmojiEmotionsIcon style={{color:iconsColor}}/>
        </Button>

        {/* Sticker button з */}
        <Button 
          onClick={() => setShowStickerPicker(prev => !prev)} 
          className="h-10  border-gray-300 rounded-none"
        >
          <ToysIcon style={{color:iconsColor}}/>
        </Button>
        
      </div>

      {/* Send button */}
      <Button
        className="rounded-2xl ml-10"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSend}
        style={{ backgroundColor: primaryColor }}
      >
        Надіслати
      </Button>

      {CURRENT_USER_ID && (
        <AttachmentUploadButton
          chatId={current_chat_id}
          userId={CURRENT_USER_ID!}
        />
      )}
      
      {/* Pickers */}
      <div className="relative flex flex-row h-auto items-center">
        {showEmojiPicker && ( 
          <EmojiPortal onSelect={(emoji) => setMessageText(prev => prev + emoji)} /> 
        )}

        {showStickerPicker && (
          <StickerPicker onSelect={handleStickerSend} />
        )}
      </div>
    </div>
  )
}
