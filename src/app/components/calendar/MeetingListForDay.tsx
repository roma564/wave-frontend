'use client'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Meeting } from '@/app/types/Meeting'
import { useAppSelector } from '@/app/lib/hooks'
import { themeConfig } from '@/app/config/theme.config'
import { Mode } from '@/app/types/Mode'

type Props = {
  meetings: Meeting[]
  selectedDate: dayjs.Dayjs
  isLoading?: boolean
}

export default function MeetingListForDay({ meetings, selectedDate, isLoading }: Props) {
  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const themeConfigObj = currentMode?.theme
    ? themeConfig[currentMode.theme]
    : themeConfig['BLUE']

  const { bgColor, textColor, primaryColor, secondaryTextColor } = themeConfigObj

  const filtered = meetings.filter(m => dayjs(m.startDate).isSame(selectedDate, 'day'))

  return (
    <div
      className="mt-4 max-h-100 overflow-y-auto pr-10"
      style={{ color: textColor }}
    >
      <h3 className="font-bold">
        Зустрічі на {selectedDate.format("DD.MM.YYYY")}
      </h3>

      {isLoading && (
        <p style={{ color: secondaryTextColor }}>Завантаження...</p>
      )}

      {filtered.map((m) => (
        <Link
          key={m.id}
          href={`/call?callId=${m.id}`}
          className="block border p-2 rounded mb-2 transition-colors"
          style={{
            backgroundColor: bgColor,
            borderColor: primaryColor,
            color: textColor,
          }}
        >
          <p className="font-semibold">{m.title}</p>
          <p className="text-sm" style={{ color: secondaryTextColor }}>
            {dayjs(m.startDate).format("HH:mm")}
          </p>
          <p className="text-sm" style={{ color: secondaryTextColor }}>
            Власник: {m.owner.name} {m.owner.lastname}
          </p>
        </Link>
      ))}
    </div>

  )
}
