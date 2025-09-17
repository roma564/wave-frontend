import React from 'react'
// import { Link } from 'react-router-dom'

// import { Spinner } from '@/components/Spinner'
// import { TimeAgo } from '@/components/TimeAgo'

import { useGetMessagesQuery, Message } from '../lib/features/api/messageSlice'
import { useAppSelector } from '../lib/hooks';


// import { messageAuthor } from './messageAuthor'
// import { ReactionButtons } from './ReactionButtons'

// Go back to passing a `message` object as a prop
interface MessageExcerptProps {
  message: Message
}

const currentMode = useAppSelector(state => state.mode.currentMode)

function MessageExcerpt({ message }: MessageExcerptProps) {
  return (
    <article className="message-excerpt" key={message.id}>
      <h3>
        <p>{message.content}</p>
      </h3>
      <div>
        {/* <p>{message.user}</p>
        <p>{message.date}</p> */}
      </div>
      {/* <p className="message-content">{message.content.substring(0, 100)}</p> */}
      {/* <ReactionButtons message={message} /> */}
    </article>
  );
}



export const MessagesList = () => {
  // Calling the `useGetmessagesQuery()` hook automatically fetches data!
  const {
    data: messages = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMessagesQuery()

  let content: React.ReactNode

  // Show loading states based on the hook status flags
  if (isLoading) {
    content = 'loading'
  } else if (isSuccess) {
    content = messages.map((message) => <MessageExcerpt key={message.id} message={message} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="messages-list flex-grow" style={{ backgroundColor: currentMode.bg_color, color: currentMode.text_color }}>
      <h2>messages</h2>
      {content}
     
    </section>
  )
}