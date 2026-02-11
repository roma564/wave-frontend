'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAppSelector } from '@/app/lib/hooks'
import { ThemeName } from '@/app/types/ThemeName'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'
import { useCreateModeForUserMutation } from '@/app/lib/features/chatMode/modeApi'


export default function NewModeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modeName, setModeName] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(ThemeName.BLUE)
  const [scheduledCallMode, setScheduledCallMode] = useState(false)
  const [stickers, setStickers] = useState(false)
  const [restrictedSmileMode, setRestrictedSmileMode] = useState(false)
  const [quickMessages, setQuickMessages] = useState<string[]>([])

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)

  // Вибір кольорів для UI
  const themeConfigObj = currentMode?.theme
    ? themeConfig[currentMode.theme]
    : themeConfig[selectedTheme]

  const { bgColor, textColor, secondaryTextColor, primaryColor } = themeConfigObj

  const [createModeForUser] = useCreateModeForUserMutation()
  const CURRENT_USER_ID = Number(Cookies.get('id'))

  const handleCreate = async () => {
    if (!modeName || !CURRENT_USER_ID) return

    try {
      await createModeForUser({
        userId: CURRENT_USER_ID,
        dto: {
          name: modeName,
          theme: selectedTheme,
          scheduledCallMode,
          stickers,
          restrictedSmileMode,
          userId: CURRENT_USER_ID,
          quickMessages,
        },
      }).unwrap()

      // reset state
      setIsOpen(false)
      setModeName('')
      setQuickMessages([])
      setScheduledCallMode(false)
      setStickers(false)
      setRestrictedSmileMode(false)
      setSelectedTheme(ThemeName.BLUE)
    } catch (err) {
      console.error('Помилка створення режиму:', err)
    }
  }

  return (
    <div className="relative">
      {/* Floating "+" Button */}
      <div className="flex flex-row justify-center">
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: primaryColor }}
          className="z-50 text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:scale-105 transition"
        >
          +
        </button>
      </div>

      {/* Modal */}

      
      


  {/* Modal */}
{isOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 backdrop-blur-sm">
    <div
      className="rounded-lg shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto transition"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${primaryColor}`,
      }}
    >
       <div
        className="rounded-lg shadow-xl p-6 w-full max-w-md transition"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${primaryColor}`,
        }}
      >
        <h2 className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}>
          Створити новий режим
        </h2>

        {/* Назва режиму */}
        <input
          type="text"
          value={modeName}
          onChange={(e) => setModeName(e.target.value)}
          className="w-full px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 transition"
          style={{
            border: `1px solid ${secondaryTextColor}`,
            color: textColor,
            backgroundColor: themeConfigObj.chatBgColorSecondary,
          }}
          placeholder="Назва режиму"
        />

        {/* Вибір теми */}
        <label className="block mb-2 text-sm font-medium"
              style={{ color: secondaryTextColor }}>
          Оберіть тему
        </label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[ThemeName.BLUE, ThemeName.PASTEL, ThemeName.YELLOW, ThemeName.PURPLE].map((theme) => (
            <label
              key={theme}
              className={`border rounded-lg p-2 cursor-pointer flex flex-col items-center gap-2 hover:scale-105 transition ${
                selectedTheme === theme ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedTheme(theme)}
              style={{ borderColor: primaryColor }}
            >
              <div className="w-full aspect-video rounded overflow-hidden bg-gray-100">
                <img
                  src={`/images/theme_selector/${theme.toLowerCase()}_theme.png`}
                  alt={theme}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="theme" checked={selectedTheme === theme} readOnly />
                <span className="text-sm font-medium">{theme}</span>
              </div>
            </label>
          ))}
        </div>

     
        {/* Опції */}
        <div className="flex flex-col gap-2 mb-4" style={{ color: secondaryTextColor }}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={scheduledCallMode}
              onChange={() => setScheduledCallMode(!scheduledCallMode)}
            />
            <span>Режим запланованих дзвінків</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={stickers}
              onChange={() => setStickers(!stickers)}
            />
            <span>Стікери</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={restrictedSmileMode}
              onChange={() => setRestrictedSmileMode(!restrictedSmileMode)}
            />
            <span>Обмежений режим смайлів</span>
          </label>
        </div>




        {/* Quick Messages */}
        <label className="block mb-2 text-sm font-medium"
              style={{ color: secondaryTextColor }}>
          Швидкі повідомлення
        </label>
        <input
          type="text"
          value={quickMessages.join(',')}
          onChange={(e) => setQuickMessages(e.target.value.split(','))}
          className="w-full px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 transition"
          style={{
            border: `1px solid ${secondaryTextColor}`,
            color: textColor,
            backgroundColor: themeConfigObj.chatBgColorSecondary,
          }}
          placeholder="Введіть повідомлення через кому"
        />

        {/* Кнопки */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded transition"
            style={{
              backgroundColor: secondaryTextColor,
              color: textColor,
            }}
          >
            Скасувати
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded transition"
            style={{
              backgroundColor: primaryColor,
              color: textColor,
            }}
          >
            Створити
          </button>
        </div>
      </div>
    </div>
  </div>
)}

  
     



    </div>
  )
}
