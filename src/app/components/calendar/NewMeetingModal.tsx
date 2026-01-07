'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAppSelector } from '@/app/lib/hooks'
import { useCreateMeetingMutation } from '@/app/lib/features/api/meetingSlice'
import { useGetUsersQuery } from '@/app/lib/features/api/userSlice'
import dayjs from 'dayjs'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'


type Props = { onMeetingCreated?: () => void}


export default function NewMeetingModal({ onMeetingCreated }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [time, setTime] = useState(dayjs().format('HH:mm'))
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])

  const { data: users = [] } = useGetUsersQuery()
  const [createMeeting] = useCreateMeetingMutation()

  const CURRENT_USER_ID = Number(Cookies.get('id'))
  const currentMode = useAppSelector(state => state.mode.currentMode)
  const { primaryColor = '#3B82F6', textColor = '#fff', bgColor = '#F5F5F5' } = currentMode ?? {}

  const handleCreate = async () => {
  if (!title || selectedUserIds.length === 0 || !CURRENT_USER_ID) return

  const selectedUsers = users.filter(u => selectedUserIds.includes(u.id))

  const payload = {
    title,
    startDate: dayjs(`${date} ${time}`).toISOString(),
    ownerId: CURRENT_USER_ID,
    invitedUserIds: selectedUserIds,
    }



  try {
    await createMeeting(payload).unwrap()
    if (onMeetingCreated) onMeetingCreated()


    setIsOpen(false)
    setTitle('')
    setSelectedUserIds([])
  } catch (err) {
    console.error('Помилка створення мітингу:', err)
  }
}


  return (
    <div className="relative">
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: primaryColor }}
          className="z-50 text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:scale-105 transition"
        >
          <CalendarMonthIcon fontSize="large" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="rounded-lg shadow-xl p-6 w-full max-w-md"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h2 className="text-xl font-semibold mb-4">Запланувати мітинг</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 text-black"
              placeholder="Назва мітингу"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 text-black"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 text-black"
            />

            <label className="block mb-2 text-sm font-medium">Оберіть учасників</label>
            <div className="mb-4 max-h-40 overflow-y-auto border rounded-md p-2 bg-white text-black">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() =>
                    setSelectedUserIds(prev =>
                      prev.includes(user.id) ? prev : [...prev, user.id]
                    )
                  }
                  className="block w-full text-left px-2 py-1 hover:bg-blue-100 rounded"
                >
                  {user.name}
                </button>
              ))}
            </div>

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
                          onClick={() =>
                            setSelectedUserIds(prev => prev.filter(uid => uid !== id))
                          }
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
