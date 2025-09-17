import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type { User };



export const userSlice = createApi({
  reducerPath: 'user',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),

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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
} = userSlice;
