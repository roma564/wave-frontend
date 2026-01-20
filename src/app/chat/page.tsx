'use client'

import { Suspense } from 'react'
import ChatPageInner from './ChatPageInner'

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading chat...</div>}>
      <ChatPageInner />
    </Suspense>
  )
}
