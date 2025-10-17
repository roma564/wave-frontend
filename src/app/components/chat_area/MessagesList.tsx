import React from 'react'
import { useGetMessagesQuery } from '@/app/lib/features/api/messageSlice'
import { useAppSelector } from '@/app/lib/hooks'
import { Message } from '@/app/types/Message'

interface MessageExcerptProps {
  message: Message
}

function MessageExcerpt({ message }: MessageExcerptProps) {
  console.log(message.imageUrl)
  return (
    <article className="message-excerpt mb-4 p-3 rounded shadow bg-white">
      {/* Текст */}
      {message.content && (
        <p className="text-gray-800 mb-2">{message.content}</p>
      )}

      {/* Зображення */}
      {message.imageUrl && (
  (() => {
    try {
      const src = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${message.imageUrl}`;
      return (
        <img
          src={src}
          alt="image"
          className="max-w-xs rounded mb-2"
          onError={(e) => {
            console.error("Помилка завантаження зображення:", src);
            (e.target as HTMLImageElement).style.display = "none"; // сховати биту картинку
          }}
        />
      );
    } catch (err) {
      console.error("Invalid imageUrl:", message.imageUrl, err);
      return null;
    }
  })()
)}



      {/* Файл */}
      {message.fileUrl && (
        <a
          href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${message.fileUrl}`}
          download={message.fileName ?? 'file'}
          className="text-blue-600 underline"
        >
          📎 {message.fileName} ({(message.fileSize ?? 0) / 1024} KB)
        </a>
      )}
    </article>
  );
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
      {messages.length === 0 && (
          <div className="text-gray-500">Немає повідомлень</div>
        )}

      <h2 className="text-lg font-semibold mb-4">Повідомлення</h2>
      {content}
    </section>
  )
}
