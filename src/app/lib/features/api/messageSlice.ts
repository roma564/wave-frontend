// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
// import type { Post } from '@/features/posts/postsSlice'
type Message = {  
  id:number,
  content: string;
  chatId: number;
  userId: number;
}


export type { Message }

// Define our single API slice object
export const messageSlice = createApi({

  reducerPath: 'api',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),

  endpoints: builder => ({

    getMessages: builder.query<Message[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => 'message'
    }),
     // The query accepts a number and returns a Post
    getMessageByChatId: builder.query({
      query: (id) => `message/allBy-chatId/${id}`, // The 'id' parameter is used here
    }),
    getLastMessage: builder.query({
      query: (id) => `message/lastBy-chatId/${id}`, // The 'id' parameter is used here
    }),
    createMessage: builder.mutation({
      query: (newMessage) => ({
        url: '/message',
        method: 'POST',
        body: newMessage,
      }),
    }),
    
  }),
})

// Export the auto-generated hook
export const { useGetMessagesQuery, useGetMessageByChatIdQuery, useCreateMessageMutation, useGetLastMessageQuery  } = messageSlice