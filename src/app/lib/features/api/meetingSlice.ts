import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Meeting } from '@/app/types/Meeting'

export const meetingSlice = createApi({
  reducerPath: 'meetingApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL }),
  endpoints: (builder) => ({
    // GET /meeting
    getMeetings: builder.query<Meeting[], void>({
      query: () => 'meeting',
    }),

    // GET /meeting/:id
    getMeetingById: builder.query<Meeting, string>({
      query: (id) => `meeting/${id}`,
    }),

    // GET /meeting/user/:userId
    getMeetingsForUser: builder.query<Meeting[], string>({
      query: (userId) => `meeting/user/${userId}`,
    }),

    // POST /meeting
    createMeeting: builder.mutation<Meeting, Partial<Meeting>>({
      query: (newMeeting) => ({
        url: 'meeting',
        method: 'POST',
        body: newMeeting,
      }),
    }),

    // PATCH /meeting/:id
    updateMeeting: builder.mutation<Meeting, { id: string; data: Partial<Meeting> }>({
      query: ({ id, data }) => ({
        url: `meeting/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    // DELETE /meeting/:id
    deleteMeeting: builder.mutation<Meeting, string>({
      query: (id) => ({
        url: `meeting/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetMeetingsQuery,
  useGetMeetingByIdQuery,
  useGetMeetingsForUserQuery,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
} = meetingSlice
