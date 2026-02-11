'use client'

import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'

import { useStreamClient } from '@/app/lib/features/api/stream/streamClient'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/lib/hooks'
import { themeConfig } from '@/app/config/theme.config'
import { Mode } from '@/app/types/Mode'

export default function CallPageInner() {
  const client = useStreamClient()
  const searchParams = useSearchParams()
  const router = useRouter()
  const callId = searchParams.get('callId')

  const [call, setCall] = useState<any>(null)
  const callRef = useRef<any>(null)

  // беремо поточний режим з Redux
  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const themeConfigObj = currentMode?.theme
    ? themeConfig[currentMode.theme]
    : themeConfig['BLUE'] // дефолтна тема

  const { bgColor, textColor, primaryColor, secondaryTextColor } = themeConfigObj

  useEffect(() => {
    if (!client || !callId || callRef.current) return

    const newCall = client.call('default', callId)
    callRef.current = newCall

    newCall.getOrCreate({ ring: false }).then(() => {
      if (newCall.state.callingState !== 'joined') {
        newCall.join()
      }
      setCall(newCall)
    })

    return () => {
      callRef.current = null
    }
  }, [client, callId])

  if (!client || !call || !callId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4"
           style={{ color: textColor, backgroundColor: bgColor }}>
        <span className="text-lg font-medium">📞 Call initializing...</span>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
             style={{ borderColor: primaryColor }}></div>
      </div>
    )
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="h-screen flex flex-col" style={{ backgroundColor: bgColor, color: textColor }}>
            {/* Toolbar */}
           

            {/* Main */}
            <div className="flex-1">
              <SpeakerLayout />
              <CallControls
                onLeave={async () => {
                  
                  router.back()
                }}
                
              />
            </div>
          </div>
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  )
}
