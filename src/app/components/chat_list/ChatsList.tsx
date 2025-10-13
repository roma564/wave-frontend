// import { useGetChatsByUserIdQuery, useGetChatsByIdsQuery } from '../../lib/features/api/chatSlice'
// import { useAppSelector } from '../../lib/hooks'
// import Cookies from 'js-cookie'
// import { Chat } from '@/app/types/Chat'

// export function useModeChats() {
//   const rawId = Cookies.get('id')
//   const currentUserId = rawId ? Number(rawId) : null

//   const { currentMode } = useAppSelector(state => state.mode)
//   const { chats: currentChats, name: modeName } = currentMode

//   const { data: ownChats = [] } = useGetChatsByUserIdQuery(currentUserId ?? 0)
//   const isStandardMode = modeName === 'standartMode'

//   const rawChats: number[] = isStandardMode
//     ? ownChats.map((chat: Chat) => chat.id)
//     : currentChats

//   const { data: chatsByIds = [], isLoading } = useGetChatsByIdsQuery(rawChats, {
//     skip: rawChats.length === 0,
//   })

//   return {
//     chats: chatsByIds,
//     isLoading,
//     bgColor: currentMode.bg_color,
//   }
// }
