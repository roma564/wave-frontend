'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAppSelector } from '@/app/lib/hooks'
import { useGetChatsByUserIdQuery } from '@/app/lib/features/api/chatSlice'
import { useAddChatToModeMutation } from '@/app/lib/features/chatMode/modeApi'
import { themeConfig } from '@/app/config/theme.config'
import { Mode } from '@/app/types/Mode'

export default function AddChatToModeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)

  const CURRENT_USER_ID = Number(Cookies.get('id'))

  const { data: chats = [], isLoading, isError } =
    useGetChatsByUserIdQuery(CURRENT_USER_ID)

  const [addChatToMode] = useAddChatToModeMutation()

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme
    ? themeConfig[currentMode.theme]
    : themeConfig.BLUE

  const { bgColor, textColor, primaryColor } = theme

  const alreadyAdded = new Set(currentMode?.chats ?? [])
  const availableChats = chats.filter(chat => !alreadyAdded.has(chat.id))

  const handleAdd = async () => {
    if (!selectedChatId || !currentMode?.id) return

    try {
      await addChatToMode({
        modeId: currentMode.id,
        chatId: selectedChatId,
      }).unwrap()

      setSelectedChatId(null)
      setIsOpen(false)
    } catch (err) {
      console.error('Помилка додавання чату до режиму:', err)
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-center ">
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: primaryColor }}
          className="text-white rounded-full w-14 h-14 text-2xl shadow-lg hover:scale-105 transition"
        >
          ＋
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="rounded-lg shadow-xl p-6 w-full max-w-md"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h2 className="text-xl font-semibold mb-4">Додати чат до режиму</h2>

            <select
              value={selectedChatId ?? ''}
              onChange={(e) => setSelectedChatId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md text-black mb-6"
            >
              <option value="">Оберіть чат</option>

              {isLoading && <option disabled>Завантаження...</option>}
              {isError && <option disabled>Помилка завантаження</option>}

              {availableChats.map(chat => (
                <option key={chat.id} value={chat.id}>
                  {chat.subject || `Чат #${chat.id}`}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Скасувати
              </button>

              <button
                onClick={handleAdd}
                disabled={!selectedChatId}
                className={`px-4 py-2 rounded transition ${
                  selectedChatId
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Додати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
