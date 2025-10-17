export type Message = {
  id: number;
  content: string | null;
  imageUrl: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  chatId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;


  user: {
    name: string;
    lastname: string;
    avatar: string | null;
  };
};
