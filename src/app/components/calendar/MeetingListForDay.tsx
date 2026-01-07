'use client'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Meeting } from '@/app/types/Meeting'

type Props = {
  meetings: Meeting[]
  selectedDate: dayjs.Dayjs
  isLoading?: boolean
}

export default function MeetingListForDay({ meetings, selectedDate, isLoading }: Props) {
  const filtered = meetings.filter(m => dayjs(m.startDate).isSame(selectedDate, 'day'))

  return (
    <div className="mt-4">
      <h3 className="font-bold">
        Зустрічі на {selectedDate.format('DD.MM.YYYY')}
      </h3>

      {isLoading && <p>Завантаження...</p>}

      {filtered.map((m) => (
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
  )
}
