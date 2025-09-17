import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Chat = {
  id: number;
  subject: string;
  userAId: number;
  userBId: number;
};

export type { Chat };

export const chatSlice = createApi({
  reducerPath: 'chat',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Chat'], // ← обов’язково

  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      query: () => 'chat',
      providesTags: ['Chat'], // ← кешування
    }),

    getChatById: builder.query<Chat, number>({
      query: (id) => `chat/${id}`,
      providesTags: (result, error, id) => [{ type: 'Chat', id }],
    }),

    createChat: builder.mutation<Chat, Partial<Chat>>({
      query: (newChat) => ({
        url: 'chat',
        method: 'POST',
        body: newChat,
      }),
      invalidatesTags: ['Chat'], // ← оновлення кешу
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
} = chatSlice;
