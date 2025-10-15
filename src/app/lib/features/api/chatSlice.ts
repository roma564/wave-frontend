import { Chat, CreateChatRequest, CreateChatResponse } from '@/app/types/Chat';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
    getChatsByIds: builder.query<Chat[], number[]>({
      query: (ids) => {
        const queryString = ids.join(',');
        return `chat/by-ids?ids=${queryString}`;
      },
      providesTags: (result, error, ids) =>
        result
          ? result.map(chat => ({ type: 'Chat' as const, id: chat.id }))
          : ids.map(id => ({ type: 'Chat' as const, id })),
    }),
    getChatsByUserId: builder.query<Chat[], number>({
      query: (id) => `chat/by-userID/${id}`,
      providesTags: (result, error, id) => [{ type: 'Chat', id }],
    }),

    createChat: builder.mutation<CreateChatResponse, CreateChatRequest>({
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
  useGetChatsByUserIdQuery,
  useGetChatsByIdsQuery
} = chatSlice;
