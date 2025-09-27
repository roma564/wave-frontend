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
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    lastname: string;
  };
}


export type { Message }

// Define our single API slice object
export const messageSlice = createApi({

  reducerPath: 'api',

  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL  }),

  endpoints: builder => ({

    getMessages: builder.query<Message[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => 'message'
    }),

    getMessageByChatId: builder.query({
      query: (id) => `message/allBy-chatId/${id}`, 
    }),
    getLastMessage: builder.query({
      query: (id) => `message/lastBy-chatId/${id}`, 
    }),
    getAllLastMessages: builder.query<Message[], void>({
      query: () => `message/allLast`, 
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
export const { useGetMessagesQuery, useGetMessageByChatIdQuery, useCreateMessageMutation, useGetLastMessageQuery, useGetAllLastMessagesQuery  } = messageSlice