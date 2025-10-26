import { MessageType } from "../types/MessageType"; 

export function detectMessageType(mimeType: string | null | undefined): MessageType {
  if (!mimeType) return MessageType.FILE;

  const mime = mimeType.toLowerCase();

  if (mime.startsWith('image/')) return MessageType.IMAGE;
  if (mime.startsWith('video/')) return MessageType.VIDEO;
  if (mime === 'text/plain') return MessageType.TEXT;

  return MessageType.FILE;
}
