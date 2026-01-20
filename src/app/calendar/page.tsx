'use client'
import React from 'react'
import Layout from '../components/header/Layout'
import ChatsList from '../components/chat_list/ChatsList'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'

import dayjs, { Dayjs } from 'dayjs'
import { useGetMeetingsQuery } from '../lib/features/api/meetingSlice'
import { Meeting } from '@/app/types/Meeting'
import Link from 'next/link'
import NewMeetingModal from '../components/calendar/NewMeetingModal'
import MeetingListForDay from '../components/calendar/MeetingListForDay'

function Page() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs())
  const { data: meetings = [], isLoading, isError, refetch } = useGetMeetingsQuery()

  const handleDateSelect = (newValue: Dayjs | null) => {
    setValue(newValue)
  }

  const hasMeetingsOnDay = (day: Dayjs) => {
    return meetings?.some((m: Meeting) =>
      dayjs(m.startDate).isSame(day, 'day')
    )
  }

  return (
    <Layout>
      <div className="flex flex-row">
        <ChatsList />
        <div className="flex flex-col flex-1 p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
              <DemoItem label="Meetings calendar">
                <DateCalendar
                  value={value}
                  onChange={handleDateSelect}
                  slotProps={{
                    day: (ownerState) => {
                      const day = ownerState.day
                      const isSelected = value?.isSame(day, 'day')
                      const hasMeeting = hasMeetingsOnDay(day)

                      return {
                        children: (
                          <div className="flex flex-col items-center">
                            <span>{day.date()}</span>

                            {isSelected && (
                              <div className="mt-1  px-1 rounded bg-blue-600 text-white">
                              
                              </div>
                            )}

                            {hasMeeting && (
                              <div className="mt-1 text-[10px] px-1 rounded bg-green-600 text-white">
                                зустріч
                              </div>
                            )}
                          </div>
                        ),
                      }
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <NewMeetingModal onMeetingCreated={refetch} />


          {/* список зустрічей для вибраного дня */}
          <MeetingListForDay meetings={meetings} selectedDate={value as Dayjs} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  )
}

export default Page
