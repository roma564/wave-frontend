import React, { useMemo } from 'react'
import { List } from '@mui/material'
import { useAppSelector } from '../../lib/hooks'
import ChatItem from './ChatItem'
import { useGetChatsQuery } from '../../lib/features/api/chatSlice'
import NewChatModal from './NewChatModal'
import AddChatToModeModal from './AddChatToModeModal'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'

export default function ChatsList() {
  const { data: allChats = [], isLoading } = useGetChatsQuery()

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE // fallback

  const { bgColor, textColor, secondaryTextColor, primaryColor } = theme

  const isStandardMode = currentMode?.name === 'standartMode'

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
    <div className="flex flex-col items-center border-r min-w-80 overflow-y-auto sm:block py: 0, mb: 0" style={{color: textColor}}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: bgColor }}>
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Завантаження чатів...</div>
        ) : chatIds.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Немає доступних чатів</div>
        ) : (
          chatIds.map(id => <ChatItem key={id} id={id} />)
        )}

       
         

      

         
      </List>

       {currentMode?.name === 'standartMode'
        ? <NewChatModal />
        : <AddChatToModeModal />}

       

     

    </div>
  )
}
