'use client'
import { useState, useRef } from 'react'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { socket } from '@/app/context/SocketContext'
import UploadProgressCircle from './UploadProgressCircle'
import { detectMessageType } from '@/app/utils/checkImage'

type Props = {
  chatId: number
  userId: number
}

export default function AttachmentUploadButton({ chatId, userId }: Props) {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    setIsUploading(true)

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/files/upload`,
        formData,
        {
          onUploadProgress: ({ loaded, total }) => {
            const percent = Math.round((loaded * 100) / (total || 1))
            setProgress(percent)
          },
        }
      )

      const { url, mimeType, size, key } = data
      console.log('uploaded file - ' + key, url)
      const type = detectMessageType(mimeType as string)

      socket.emit('createMessage', {
        chatId,
        userId,
        type,
        fileUrl: url,
        mimeType,
        fileName: file.name ?? key,
        fileSize: size,
      })
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <IconButton
        color="primary"
        onClick={() => fileInputRef.current?.click()}
        aria-label="Прикріпити файл"
      >
        <AttachFileIcon />
      </IconButton>

      {isUploading && <UploadProgressCircle progress={progress} />}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        hidden
      />
    </div>
  )
}
