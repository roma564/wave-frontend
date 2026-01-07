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
          <div className="mt-4">
            <h3 className="font-bold">
              Зустрічі на {value?.format('DD.MM.YYYY')}
            </h3>
            {isLoading && <p>Завантаження...</p>}
           {meetings
            ?.filter((m) => dayjs(m.startDate).isSame(value, 'day'))
            .map((m) => (
              <Link
                key={m.id}
                href={`/call?callId=${m.id}`}
                className="block border p-2 rounded mb-2 hover:bg-gray-100"
              >
                <p className="font-semibold">{m.title}</p>
                <p className="text-sm text-gray-600">
                  {dayjs(m.startDate).format('HH:mm')}
                </p>
                <p className="text-sm">
                  Owner: {m.owner.name} {m.owner.lastname}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page
