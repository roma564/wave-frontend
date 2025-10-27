'use client'

import React from 'react'
import { useAppSelector } from '@/app/lib/hooks'
import type { Socket } from 'socket.io-client'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'

const QUICK_MESSAGES = [
  { label: 'OK', content: 'OK' },
  { label: 'Заверждено', content: 'Заверждено' },
  { label: 'Треба уточнення!', content: ' Треба уточнення!' },
  { label: '+1', content: '+1' },
  { label: 'Підтримую', content: 'Підтримую' },
  { label: 'Питання', content: 'Питання' },
]

type QuickMessageBarProps = {
  chatId: number
  userId: number
  socket: Socket
}

export default function QuickMessageBar({ chatId, userId, socket }: QuickMessageBarProps) {
   const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
      const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE 
      
      const { textColor, primaryColor } = theme

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

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {QUICK_MESSAGES.map(msg => (
        <button
          key={msg.label}
          onClick={() => handleClick(msg.content)}
          className="px-3 py-1 rounded-full text-sm font-medium shadow transition hover:scale-105"
          style={{
            backgroundColor: primaryColor ?? '#3B82F6',
            color: textColor ?? '#fff',
          }}
        >
          {msg.label}
        </button>
      ))}
    </div>
  )
}
