import React, { useMemo } from 'react'
import { List } from '@mui/material'
import { useAppSelector } from '../../lib/hooks'
import ChatItem from './ChatItem'
// import {NewChatModal} from './NewChatModal'
import { useGetChatsQuery } from '../../lib/features/api/chatSlice'

export default function ChatsList() {
  const currentMode = useAppSelector(state => state.mode.currentMode)
  const { data: allChats = [], isLoading } = useGetChatsQuery()

  // const isStandardMode = currentMode?.name === 'standartMode'
  const bgColor = currentMode?.bgColor ?? '#F5F5F5'
  // const modeChats = currentMode?.chats ?? []

  //TODO typisation
  const chatIds = (currentMode?.chats ?? []).map(chat => (chat as any).id ?? chat)




  console.log('chatIds:', chatIds)


  return (
    <div className="flex flex-col border-r items-center w-full overflow-y-auto sm:block">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: bgColor }}>
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Завантаження чатів...</div>
        ) : chatIds.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Немає доступних чатів</div>
        ) : (
          chatIds.map(id => <ChatItem key={id} id={id} />)
          
        )}
      </List>

      {/* <NewChatModal /> */}
    </div>
  )
}
