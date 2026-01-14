'use client'

import React from 'react'
import { useAppSelector } from '@/app/lib/hooks'
import type { Socket } from 'socket.io-client'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'
import { useGetQuickMessagesQuery } from '@/app/lib/features/chatMode/modeApi'

type QuickMessageBarProps = {
  chatId: number
  userId: number
  socket: Socket
}

export default function QuickMessageBar({ chatId, userId, socket }: QuickMessageBarProps) {
  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE
  const { textColor, primaryColor } = theme

  const { data: quickMessages = [], isLoading } = useGetQuickMessagesQuery(currentMode?.id ?? 0)

  const handleClick = (content: string) => {
    if (!content.trim() || !chatId || !userId) return

    try {
      socket.emit('createMessage', {
        chatId,
        userId,
        content,
        type: 'TEXT',
      })
    } catch (err) {
      console.error('Помилка надсилання швидкого повідомлення через сокет:', err)
    }
  }

  if (isLoading) {
    return <div className="p-2 text-sm text-gray-500">Завантаження швидких повідомлень...</div>
  }

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {quickMessages.map((msg, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(msg)}
          className="px-3 py-1 rounded-full text-sm font-medium shadow transition hover:scale-105"
          style={{
            backgroundColor: primaryColor ?? '#3B82F6',
            color: textColor ?? '#fff',
          }}
        >
          {msg}
        </button>
      ))}
    </div>
  )
}
