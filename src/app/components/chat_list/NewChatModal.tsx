'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAppSelector } from '@/app/lib/hooks'
import { useGetUsersQuery } from '@/app/lib/features/api/userSlice'
import { useCreateChatMutation } from '@/app/lib/features/api/chatSlice'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'

export default function NewChatModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatName, setChatName] = useState('')
  const [chatDescription, setChatDescription] = useState('')
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])

  const { data: users = [], isLoading, isError } = useGetUsersQuery()
  const [createChat] = useCreateChatMutation()

  const CURRENT_USER_ID = Number(Cookies.get('id'))

  const handleCreate = async () => {
    if (!chatName || selectedUserIds.length === 0 || !CURRENT_USER_ID) return

    try {
      await createChat({
        subject: chatName,
        userIds: [CURRENT_USER_ID, ...selectedUserIds],
      }).unwrap()

      setIsOpen(false)
      setChatName('')
      setChatDescription('')
      setSelectedUserIds([])
    } catch (err) {
      console.error('Помилка створення чату:', err)
    }
  }

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE // fallback

  const { bgColor, textColor, primaryColor } = theme

  const handleAddUser = (id: number) => {
    if (!selectedUserIds.includes(id)) {
      setSelectedUserIds([...selectedUserIds, id])
    }
  }

  const handleRemoveUser = (id: number) => {
    setSelectedUserIds(selectedUserIds.filter(uid => uid !== id))
  }

  const availableUsers = users.filter(u => u.id !== CURRENT_USER_ID && !selectedUserIds.includes(u.id))

  return (
    <div className="relative">
      {/* Floating "+" Button */}
      <div className='flex flex-row justify-center'>
          <button
            onClick={() => setIsOpen(true)}
            style={{ backgroundColor: primaryColor }}
            className="z-50 text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:scale-105 transition"
          >
            +
        </button>
      </div>
      

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="rounded-lg shadow-xl p-6 w-full max-w-md"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h2 className="text-xl font-semibold mb-4">Створити новий чат</h2>

            {/* Назва чату */}
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Назва чату"
            />


            {/* Вибір користувачів */}
            <label className="block mb-2 text-sm font-medium">Оберіть користувачів</label>
            <div className="mb-4 max-h-40 overflow-y-auto border rounded-md p-2 bg-white text-black">
              {isLoading && <div>Завантаження...</div>}
              {isError && <div>Помилка завантаження</div>}
              {availableUsers.length === 0 && <div>Усі користувачі вже обрані</div>}
              {availableUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleAddUser(user.id)}
                  className="block w-full text-left px-2 py-1 hover:bg-blue-100 rounded"
                >
                  {user.name}
                </button>
              ))}
            </div>

            {/* Відображення обраних */}
            {selectedUserIds.length > 0 && (
              <div className="mb-4 text-sm">
                <strong>Обрані:</strong>
                <ul className="mt-2 space-y-1">
                  {selectedUserIds.map((id) => {
                    const user = users.find((u) => u.id === id)
                    return user ? (
                      <li key={id} className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded text-black">
                        {user.name}
                        <button
                          onClick={() => handleRemoveUser(id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            )}

            {/* Кнопки */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Скасувати
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Створити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
