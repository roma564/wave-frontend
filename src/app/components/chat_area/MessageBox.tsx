'use client'
import React, { useState } from 'react'

import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { MessageType } from '@/app/types/MessageType'

export enum Color {
  Blue,
  Red,
}

type MessageBoxProps = {
  color: Color
  type?: MessageType
  content?: string | null
  authorName: string
  fileUrl?: string | null
  fileName?: string | null
  fileSize?: number | null
  mimeType?: string | null
}

export default function MessageBox({
  color,
  content,
  fileUrl,
  fileName,
  fileSize,
  mimeType,
  authorName,
  type,
}: MessageBoxProps) {
  const [hovered, setHovered] = useState(false)

  const base = process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? ''
  const encodedFileUrl = encodeURIComponent(fileUrl ?? '')
  const downloadUrl = `${base}/files/download?fileUrl=${encodedFileUrl}&fileName=${encodeURIComponent(fileName ?? 'file')}`


  const isPublicSupabaseUrl =
    typeof fileUrl === 'string' &&
    fileUrl.startsWith('https://') &&
    fileUrl.includes('supabase.co/storage/v1/object/public/')
  const displaySrc = isPublicSupabaseUrl ? fileUrl : downloadUrl

  const isImage = mimeType?.startsWith('image/')
  const isVideo = mimeType?.startsWith('video/')
  const isSticker = type === MessageType.STICKER

  return (
    <div
      className={`wrapper flex flex-col m-2 ${
        color === Color.Blue ? 'items-end' : 'items-start'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-sm mb-1 text-gray-500">{authorName}</div>

      {/* Текст */}
      {content && (
        <div className="rounded-lg p-2 mb-1 bg-gray-200 text-black">
          {content}
        </div>
      )}

      {fileUrl && (
        <div
          className={`rounded p-3 flex flex-col gap-2 max-w-xs ${
            isSticker ? '' : 'bg-gray-100 border'
          }`}
        >
          {isSticker ? (
            <img
              src={fileUrl}
              alt="sticker"
              className="w-50 h-50 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : isImage ? (
            <img
              src={displaySrc}
              alt={fileName ?? 'image'}
              className="rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : isVideo ? (
            <video
              src={displaySrc}
              controls
              className="rounded max-h-64"
              onError={(e) => {
                (e.target as HTMLVideoElement).style.display = 'none'
              }}
            />
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <InsertDriveFileRoundedIcon
                fontSize="small"
                className="text-gray-600"
              />
              <span>
                {fileName} ({Math.round((fileSize ?? 0) / 1024)} KB)
              </span>
            </div>
          )}


          {!isSticker && hovered && (
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = fileName ?? 'file'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
            >
              <DownloadRoundedIcon fontSize="small" />
              Завантажити
            </button>
          )}
        </div>
      )}
    </div>
  )
}
