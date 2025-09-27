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
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL, credentials: 'include'}),
  tagTypes: ['Chat'], 

  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      query: () => 'chat',
      providesTags: ['Chat'], 
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
      invalidatesTags: ['Chat'], 
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
} = chatSlice;
