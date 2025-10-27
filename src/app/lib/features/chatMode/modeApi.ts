import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateModeDto, Mode } from '@/app/types/Mode'
import { ThemeName } from '@/app/types/ThemeName';

export const modeApi = createApi({
  reducerPath: 'modeApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL }),
  tagTypes: ['Mode', 'UserModes'],
  endpoints: (builder) => ({
    getUserModes: builder.query<Mode[], number>({
      query: (userId) => `mode/user/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'UserModes', id: userId }],
    }),

    createModeForUser: builder.mutation<Mode, { userId: number; dto: CreateModeDto }>({
      query: ({ userId, dto }) => ({
        url: `mode/user/${userId}`,
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: (_res, _err, { userId }) => [{ type: 'UserModes', id: userId }],
    }),

    addChatToMode: builder.mutation<Mode, { modeId: number; chatId: number }>({
      query: ({ modeId, chatId }) => ({
        url: `mode/${modeId}/add-chat/${chatId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (_res, _err, { modeId }) => [{ type: 'Mode', id: modeId }],
    }),

    getChatsByMode: builder.query<number[], number>({
      query: (modeId) => `mode/${modeId}/chats`,
      providesTags: (_res, _err, modeId) => [{ type: 'Mode', id: modeId }],
    }),

    setModeTheme: builder.mutation<Mode, { modeId: number; theme: ThemeName }>({
      query: ({ modeId, theme }) => ({
        url: `mode/${modeId}/set-theme`,
        method: 'PATCH',
        body: { theme },
      }),
      invalidatesTags: (_res, _err, { modeId }) => [{ type: 'Mode', id: modeId }],
    }),
    

  }),
})

export const {
  useGetUserModesQuery,
  useCreateModeForUserMutation,
  useAddChatToModeMutation,
  useGetChatsByModeQuery,
  useSetModeThemeMutation
} = modeApi
