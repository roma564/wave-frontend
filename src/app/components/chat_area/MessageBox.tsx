import React from 'react'
import { useAppSelector } from '@/app/lib/hooks'; 
import { Avatar } from '@mui/material';
import Cookies from 'js-cookie'

export enum Color {
  Blue,
  Red,
}

type Props = {
  color: Color;
  content: string;
  authorName: string;
};

export default function MessageBox({ color, content, authorName }: Props) {
  const currentMode = useAppSelector(state => state.mode.currentMode)

  const avatarSrc = Cookies.get('avatar') || '/static/images/avatar/2.jpg'


  if(color === Color.Red){
    return(
      <div className="wrapper flex flex-row flex-end m-2">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className='flex flex-end mr-2' />
        <div className='flex flex-col'>
          <div className="text-sm text-gray-500 mb-1" style={{ color: currentMode.secondary_text_color }}>{authorName}</div>
          <div className='  rounded-lg  p-1 w-60 max-w-100' style={{ backgroundColor: currentMode.secondary_color, color: currentMode.text_color }}>
            {content}
          </div>
        </div>
        
      </div>
    )
  }

  return (
    <div className="wrapper flex flex-row flex-end m-2 justify-end">
      
      <div className='flex flex-col'>
        <div className="text-sm mb-1 text-right" style={{ color: currentMode.secondary_text_color }}>{authorName}</div>
        <div className='rounded-lg p-1 w-60 max-w-100' style={{ backgroundColor: currentMode.primary_color, color: currentMode.text_color }}>
          {content}
        </div>
      </div>
      <Avatar alt="User Avatar" src={avatarSrc} className='ml-2' />
     
    </div>
  )


}
