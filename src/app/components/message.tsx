import React from 'react'
import { useAppSelector } from '../lib/hooks';
import { Avatar } from '@mui/material';

export enum Color {
  Blue,
  Red,
}

type Props = {
  color: Color;
  content: string;
};

export default function MessageBox({ color, content }: Props) {
  const currentMode = useAppSelector(state => state.mode.currentMode)

  if(color === Color.Red){
    return(
      <div className="wrapper flex flex-row flex-end m-2">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className='mr-2' />
        <div className='  rounded-lg  p-1 w-60 max-w-100' style={{ backgroundColor: currentMode.secondary_color, color: currentMode.text_color }}>
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper flex flex-row flex-end m-2 justify-end">
      <div className='  rounded-lg  p-1 w-60 max-w-100 ' style={{ backgroundColor: currentMode.primary_color, color: currentMode.text_color }}>
        {content}
      </div>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" className='ml-2'/>
    </div>
  )


}
