import { useGetChatByIdQuery } from '../../lib/features/api/chatSlice';
import ChatItem from './ChatItem';

export const ChatLoader = ({ chatId }: { chatId: number }) => {
  const { data: chat, isLoading } = useGetChatByIdQuery(chatId);

  if (isLoading || !chat) return null;

  return <ChatItem id={chat.id} key={chat.id} />;
};
