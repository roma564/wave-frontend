import React, { useContext, useState } from 'react'
import { useCreateMessageMutation } from '@/app/lib/features/api/messageSlice';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '@/app/context/SocketContext'; 
import Link from 'next/link';
import Cookies from 'js-cookie'
import { useAppSelector } from '@/app/lib/hooks';

import EmojiPicker from 'emoji-picker-react';
import { MessageType } from '@/app/types/MessageType';
import StickerPicker from './sickers/StickerPicker';







export default function Form( {current_chat_id}: {current_chat_id : number }) {
    
   

    const [createMessage] = useCreateMessageMutation();
    const currentMode = useAppSelector(state => state.mode.currentMode)
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
        type: MessageType.TEXT, // ← додано
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
    <div className="flex flex-row h-auto ">

      
              

                <TextField className='bg-white w-full rounded-2xl no-underline active:no-underline '
              id="filled-search"
              label="Message field"
              type="search"
              variant="filled"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}/>

            <Button onClick={() => setShowEmojiPicker(prev => !prev)} className="ml-2">
                😊
            </Button>

            


              
              <Button className='rounded-2xl ml-3 ' variant="contained" endIcon={<SendIcon />} onClick={handleSend}  style={{ backgroundColor: currentMode?.primaryColor}} >
                Send
              </Button>




              {showEmojiPicker && (
                <EmojiPicker 
                  onEmojiClick={(emoji) => setMessageText(prev => prev + emoji.emoji)} 
                />
              )}

              <Button onClick={() => setShowStickerPicker(prev => !prev)} className="ml-2">
              🧸
            </Button>

            {showStickerPicker && (
              <StickerPicker onSelect={handleStickerSend} />
            )}

                

              
    </div>
  )


}

