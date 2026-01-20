'use client'

import dynamic from 'next/dynamic'

const CallPageInner = dynamic(() => import('./CallPageInner'), { ssr: false })

export default function CallPage() {
  return <CallPageInner />
}
