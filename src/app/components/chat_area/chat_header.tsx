import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useGetChatByIdQuery } from '@/app/lib/features/api/chatSlice';
import { useAppSelector } from '@/app/lib/hooks';





export default function ChatHeader( {current_chat_id}: {current_chat_id : number }) {


    const {
        data: chat,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetChatByIdQuery(current_chat_id)

      const currentMode = useAppSelector(state => state.mode.currentMode)

       let content: React.ReactNode

        if (isLoading) {
            content = 'loading'
          } else if (isSuccess) {
            content = chat.subject
          } else if (isError) {
            content = <div>{error.toString()}</div>
          }


  // console.log("chat ChatHeader: " + chat)

  return (
    <div className='flex place-content-between items-center  flex-row border' style={{color: currentMode?.textColor}}>
      <h1 className='text-lg flex flex-col center pl-4' style={{color: currentMode?.textColor}}>{content}</h1>
      <div className="mock_icons w-25 flex place-content-between">
          {/* //TODO dark-light theme */}
          <LocalPhoneIcon style={{color: currentMode?.primaryColor}}/>
          <VideoCameraFrontIcon style={{color: currentMode?.primaryColor}}/>
          <PushPinIcon style={{color: currentMode?.primaryColor}}/>
      </div>
      
    </div>
  )
}
