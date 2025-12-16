// app/components/Meetings.tsx
"use client"

import React from "react"

import { Meeting } from "@/app/types/Meeting"
import { useGetMeetingsQuery } from "@/app/lib/features/api/meetingSlice"

export const Meetings: React.FC = () => {
  const { data: meetings, isLoading, isError } = useGetMeetingsQuery()

  if (isLoading) return <p>Loading meetings...</p>
  if (isError) return <p>Error loading meetings</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Meetings</h2>
      <ul className="space-y-2">
        {meetings && meetings.length > 0 ? (
          meetings.map((meeting: Meeting) => (
            <li
              key={meeting.id}
              className="border rounded p-3 shadow-sm hover:bg-gray-50"
            >
              <p className="font-semibold">{meeting.title}</p>
              <p className="text-sm text-gray-600">
                Start: {new Date(meeting.startDate).toLocaleString()}
              </p>
              <p className="text-sm">
                Owner: {meeting.owner.name} {meeting.owner.lastname}
              </p>
              {meeting.invited_users.length > 0 && (
                <p className="text-sm text-gray-700">
                  Invited:{" "}
                  {meeting.invited_users
                    .map((u) => `${u.name} ${u.lastname}`)
                    .join(", ")}
                </p>
              )}
            </li>
          ))
        ) : (
          <p>No meetings found</p>
        )}
      </ul>
    </div>
  )
}
