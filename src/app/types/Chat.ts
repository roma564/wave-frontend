export type Chat = {
  id: number;
  subject: string;
  userIds: number[]
};

export type CreateChatRequest = {
  subject: string
  userIds: number[]
}

export type CreateChatResponse = {
  chatId: number
  subject: string
  users: { id: number; name: string }[]
}