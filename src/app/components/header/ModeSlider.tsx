import { useState, useEffect } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Cookies from 'js-cookie'

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { setCurrentMode } from '@/app/lib/features/chatMode/modeSlice'
import { useGetUserModesQuery } from '@/app/lib/features/chatMode/modeApi'
import { Mode } from '@/app/types/Mode'
import { themeConfig } from '@/app/config/theme.config'

const ModeSlider = () => {
  const rawId = Cookies.get('id')
  const userId = rawId ? Number(rawId) : null

  const dispatch = useAppDispatch()
  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE // fallback

  const { bgColor, textColor, secondaryTextColor, primaryColor } = theme


  const { data: modes = [], isLoading } = useGetUserModesQuery(userId ?? 0)
  const [activeIndex, setActiveIndex] = useState(0)

  const getMode = (offset: number): Mode | null => {
    if (!modes.length) return null 
    const index = (activeIndex + offset + modes.length) % modes.length
    return modes[index]
  }

  const handlePrev = () =>
    setActiveIndex(prev => (prev - 1 + modes.length) % modes.length)

  const handleNext = () =>
    setActiveIndex(prev => (prev + 1) % modes.length)

  useEffect(() => {
    const mode = getMode(0)
    if (mode) {
      dispatch(setCurrentMode(mode))
    }
  }, [activeIndex, modes.length])

  if (isLoading || !currentMode) return null

  const prevMode = getMode(-1)
  const nextMode = getMode(1)

  return (
    <div className="flex items-center justify-between ml-30">
      {/* Ліва стрілка */}
      <div className="flex flex-col items-center" style={{ width: '80px', minWidth: '80px', textAlign: 'center' }}>
        <button onClick={handlePrev}>
          <ArrowBackIosNewIcon
            fontSize="large"
            style={{ color: textColor, width: '24px', height: '24px' }}
          />
        </button>
        <span style={{ color: secondaryTextColor }} className="text-xs mt-1">
          {prevMode?.name}
        </span>
      </div>

      {/* Центр — активний режим */}
      <div
        className="text-xl font-bold underline text-center"
        style={{
          color: primaryColor,
          width: '140px',
          minWidth: '140px',
          maxWidth: '140px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {currentMode.name}
      </div>

      {/* Права стрілка */}
      <div className="flex flex-col items-center" style={{ width: '80px', minWidth: '80px', textAlign: 'center' }}>
        <button onClick={handleNext}>
          <ArrowForwardIosIcon
            fontSize="large"
            style={{ color: textColor, width: '24px', height: '24px' }}
          />
        </button>
        <span style={{ color: secondaryTextColor }} className="text-xs mt-1">
          {nextMode?.name}
        </span>
      </div>
    </div>
  )
}

export default ModeSlider
