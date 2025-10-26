import { MessageType } from "./MessageType"

export type Message = {
  id: number
  type:MessageType
  content: string | null
  fileUrl: string | null
  fileName: string | null
  fileSize: number | null
  mimeType: string | null
  chatId: number
  userId: number
  createdAt: string
  updatedAt: string

  user: {
    name: string
    lastname: string
    avatar: string | null
  }
}
