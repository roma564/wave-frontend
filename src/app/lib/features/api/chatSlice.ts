// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
// import type { Post } from '@/features/posts/postsSlice'
type Chat = {  
  id:number,
  subject :  string;
  userAId: number
  userBId: number
}


export type { Chat }

// Define our single API slice object
export const chatSlice = createApi({

  reducerPath: 'chat',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),

  endpoints: builder => ({

    getChats: builder.query<Chat[], void>({

      query: () => 'chat'
    }),
     // The query accepts a number and returns a chat
    // getMessageByChatId: builder.query({
    //   query: (id) => `message/allBy-chatId/${id}`, // The 'id' parameter is used here
    // }),
    // createMessage: builder.mutation({
    //   query: (newMessage) => ({
    //     url: '/message',
    //     method: 'POST',
    //     body: newMessage,
    //   }),
    // }),
    
  }),
})

// Export the auto-generated hook
export const { useGetChatsQuery} = chatSlice