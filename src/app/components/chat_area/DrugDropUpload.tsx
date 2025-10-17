import { socket } from '@/app/context/SocketContext';
import { useState } from 'react';

type ImageDropZoneProps = {
  chatId: number;
  userId: number;
};

const ImageDropZone: React.FC<ImageDropZoneProps> = ({ chatId, userId }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragState = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

const handleDropImage = async (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  const file = e.dataTransfer.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  // 1. Завантажуємо файл
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/upload/image`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  // 2. Створюємо повідомлення через сокет
  socket.emit('createMessage', {
    chatId,
    userId,
    imageUrl: data.path,
    fileName: data.fileName,
    fileSize: data.fileSize,
  });
};



  return (
    <div
      onDragEnter={handleDragState}
      onDragLeave={handleDragState}
      onDragOver={handleDragState}
      onDrop={handleDropImage}
      className={`w-full max-w-md mx-auto p-10 border-2 border-dashed rounded-lg text-center transition-colors duration-200 ${
        isDragging ? 'bg-gray-100 border-blue-400' : 'bg-white border-gray-300'
      }`}
    >
      <p className="text-gray-600">Перетягни зображення сюди або натисни, щоб вибрати</p>
    </div>
  );
};

export default ImageDropZone;
