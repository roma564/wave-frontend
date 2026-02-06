'use client'
import React, { useMemo } from 'react'
import { List } from '@mui/material'
import { useAppSelector } from '../../lib/hooks'
import ChatItem from './ChatItem'
import { useGetChatsByUserIdQuery, useGetChatsQuery } from '../../lib/features/api/chatSlice'
import NewChatModal from './NewChatModal'
import AddChatToModeModal from './AddChatToModeModal'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MeetingListForDay from '../calendar/MeetingListForDay'
import { useGetMeetingsQuery } from '@/app/lib/features/api/meetingSlice'
import dayjs from 'dayjs'


export default function ChatsList() {


  const userIdFromCookie = Cookies.get('id');
  const CURRENT_USER_ID = userIdFromCookie ? Number(userIdFromCookie) : null;

  const value = dayjs() 
  const { data: meetings = [], isLoading: isMeetingsLoading } = useGetMeetingsQuery()




  const { data: allChats = [], isLoading } = CURRENT_USER_ID !== null
    ? useGetChatsByUserIdQuery(CURRENT_USER_ID)
    : { data: [], isLoading: false };


  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE // fallback

  const { bgColor, textColor, secondaryTextColor, primaryColor, chatListBgColor } = theme

  const isStandardMode = currentMode?.name === 'Усі чати'
  const isMode = currentMode?.name === 'Усі чати'

  const chatIds = useMemo(() => {
    if (isStandardMode) {
      return allChats.map(chat => chat.id)
    }
    
    
    return (currentMode?.chats ?? []).map(chat =>
      //TODO
      typeof chat === 'number' ? chat : chat.id
    )
  }, [isStandardMode, allChats, currentMode])

  return (
    <div className="flex flex-col items-center border-r rounded-2xl m-1 min-w-80 overflow-y-auto sm:block py: 0, mb: 0" style={{ backgroundColor:chatListBgColor, border:secondaryTextColor}}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: chatListBgColor }}>
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Завантаження чатів...</div>
        ) : chatIds.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Немає доступних чатів</div>
        ) : (
          chatIds.map(id => <ChatItem key={id} id={id} />)
        )}

       
         

      

         
      </List>

       {isStandardMode
        ? <NewChatModal />
        
        : <AddChatToModeModal />}

        {isStandardMode  && (
          <>
            <div className="w-full max-h-64 overflow-y-auto px-2">
              <MeetingListForDay meetings={meetings} selectedDate={value} isLoading={isMeetingsLoading} />
            </div>

            <div className="flex flex-row items-center justify-center m-5">
              <Link
                href="/calendar"
                className="inline-flex items-center gap-2 p-5 rounded-2xl transition-colors"
                style={{ background: primaryColor, color: textColor }}
              >
                View all meetings
              </Link>
            </div>
          </>
        )}



         

       

     

    </div>
  )
}
