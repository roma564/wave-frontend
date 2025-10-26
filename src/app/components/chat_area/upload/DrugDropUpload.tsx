import { useState, useRef } from 'react'
import axios from 'axios'
import { socket } from '@/app/context/SocketContext'
import UploadProgressCircle from './UploadProgressCircle'
import { detectMessageType } from '@/app/utils/checkImage'

type Props = {
  chatId: number
  userId: number
}

export default function DragDropUpload({ chatId, userId }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragState = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) await uploadFile(file)
  }

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
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/upload/file`,
        formData,
        {
          onUploadProgress: ({ loaded, total }) => {
            const percent = Math.round((loaded * 100) / (total || 1))
            setProgress(percent)
          },
        }
      )

      const { path, fileName, fileSize, mimeType } = data
      const type = detectMessageType(mimeType)

      socket.emit('createMessage', {
        chatId,
        userId,
        type,
        fileUrl: path,
        mimeType,
        fileName: fileName ?? file.name,
        fileSize,
      })
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDragState}
      onDragLeave={handleDragState}
      onDragOver={handleDragState}
      onDrop={handleDrop}
      className={`cursor-pointer w-full max-w-md mx-auto p-10 border-2 border-dashed rounded-lg text-center transition-colors duration-200 ${
        isDragging ? 'bg-gray-100 border-blue-400' : 'bg-white border-gray-300'
      }`}
    >
      <p className="text-gray-600 mb-2">
        Перетягни файл сюди або <span className="text-blue-600 underline">натисни</span>, щоб вибрати
      </p>

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
