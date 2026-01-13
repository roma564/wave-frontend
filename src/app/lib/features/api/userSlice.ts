import { User } from '@/app/types/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';







export const userSlice = createApi({
  reducerPath: 'user',

  baseQuery: fetchBaseQuery({ baseUrl:  process.env.NEXT_PUBLIC_SERVER_BASE_URL  }),

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'user',
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `user/${id}`,
    }),

    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'user',
        method: 'POST',
        body: newUser,
      }),
    }),
    getUsersByChat: builder.query<User[], number>({
      query: (chatId) => `user/chat/${chatId}`,
    }),


  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useGetUsersByChatQuery,
} = userSlice;
