import React, { useState } from 'react'
import { Message } from '@/app/types/Message'

export default function MessageExcerpt({ message }: { message: Message }) {
  const [hovered, setHovered] = useState(false)

  const isImage = message.mimeType?.startsWith('image/')

  return (
    <article
      className="message-excerpt mb-4 p-3 rounded shadow bg-white relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {message.content && !message.fileUrl && (
        <p className="text-gray-800 mb-2">{message.content}</p>
      )}

      {message.fileUrl && (
        <>
          {isImage ? (
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${message.fileUrl}`}
              alt={message.fileName ?? 'image'}
              className="max-w-xs rounded mb-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <div className="bg-gray-100 border rounded p-3 flex items-center justify-between">
              <span className="text-sm text-gray-700">
                📎 {message.fileName} ({Math.round((message.fileSize ?? 0) / 1024)} KB)
              </span>

              {hovered && (
                <a
                  href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${message.fileUrl}`}
                  download={message.fileName ?? 'file'}
                  className="ml-4 text-blue-600 underline text-sm"
                >
                  Завантажити
                </a>
              )}
            </div>
          )}
        </>
      )}
    </article>
  )
}
