import React from 'react'
import { useAppSelector } from '@/app/lib/hooks'

export enum Color {
  Blue,
  Red,
}

type Props = {
  color: Color
  content?: string | null
  imageUrl?: string | null
  authorName: string
}

export default function MessageBox({ color, content, imageUrl, authorName }: Props) {
  const currentMode = useAppSelector(state => state.mode.currentMode)

  const isOwn = color === Color.Blue

  return (
    <div className={`wrapper flex flex-row m-2 ${isOwn ? 'justify-end' : ''}`}>
      <div className="flex flex-col max-w-xs">
        <div
          className={`text-sm mb-1 ${isOwn ? 'text-right' : ''}`}
          style={{ color: currentMode?.secondaryTextColor }}
        >
          {authorName}
        </div>

        {/* Текст */}
        {content && (
          <div
            className="rounded-lg p-2 mb-1"
            style={{
              backgroundColor: isOwn ? currentMode?.primaryColor : currentMode?.secondaryColor,
              color: currentMode?.textColor,
            }}
          >
            {content}
          </div>
        )}

        {/* Зображення */}
        {imageUrl && (
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${imageUrl}`}
            alt="message image"
            className="max-w-xs rounded mb-1"
          />
        )}
      </div>
    </div>
  )
}
