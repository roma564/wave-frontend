import React, { useState } from 'react'


import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

export enum Color {
  Blue,
  Red,
}


type MessageBoxProps = {
  color: Color
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
}: MessageBoxProps) {
  const [hovered, setHovered] = useState(false)

  const isImage = mimeType?.startsWith('image/')

  return (
    <div
      className={`wrapper flex flex-col m-2 ${color === Color.Blue ? 'items-end' : 'items-start'}`}
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

      {/* Файл */}
      {fileUrl && (
  <div className="bg-gray-100 border rounded p-3 flex flex-col gap-2 max-w-xs">
    {isImage ? (
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${fileUrl}`}
        alt={fileName ?? 'image'}
        className="rounded"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    ) : (
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <InsertDriveFileRoundedIcon fontSize="small" className="text-gray-600" />
        <span>
          {fileName} ({Math.round((fileSize ?? 0) / 1024)} KB)
        </span>
      </div>
    )}

    {hovered && (
      <a
        href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${fileUrl}`}
        download={fileName ?? 'file'}
        className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
      >
        <DownloadRoundedIcon fontSize="small" />
        Завантажити
      </a>
    )}
  </div>
)}
    </div>
  )
}
