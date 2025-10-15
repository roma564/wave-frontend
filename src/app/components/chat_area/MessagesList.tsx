import React from 'react'
import { useGetMessagesQuery, Message } from '@/app/lib/features/api/messageSlice'
import { useAppSelector } from '@/app/lib/hooks'

interface MessageExcerptProps {
  message: Message
}

function MessageExcerpt({ message }: MessageExcerptProps) {
  return (
    <article className="message-excerpt">
      <h3>{message.content}</h3>
    </article>
  )
}

export const MessagesList = () => {
  const currentMode = useAppSelector(state => state.mode.currentMode)

  const {
    data: messages = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMessagesQuery()

  const {
    bgColor = '#F5F5F5',
    textColor = '#333',
    primaryColor
  } = currentMode ?? {}

  let content: React.ReactNode

  if (isLoading) {
    content = <div className="p-4 text-gray-500">Завантаження повідомлень...</div>
  } else if (isSuccess) {
    content = messages.map((message: Message) => (
      <MessageExcerpt key={message.id} message={message} />
    ))

  } else if (isError) {
    content = <div className="p-4 text-red-500">{error.toString()}</div>
  }

  return (
    <section
      className="messages-list flex-grow p-4"
      style={{ backgroundColor:  primaryColor, color: textColor }}
    >
      <h2 className="text-lg font-semibold mb-4">Повідомлення</h2>
      {content}
    </section>
  )
}
