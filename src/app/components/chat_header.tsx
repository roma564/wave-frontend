import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PushPinIcon from '@mui/icons-material/PushPin';



export default function ChatHeader() {
  return (
    <div className='flex place-content-between items-center  flex-row  border '>
      <h1 className='text-lg flex flex-col center pl-4'>Chat Subject</h1>
      <div className="mock_icons w-25 flex place-content-between">
          <LocalPhoneIcon/>
          <VideoCameraFrontIcon/>
          <PushPinIcon/>
      </div>
      
    </div>
  )
}
