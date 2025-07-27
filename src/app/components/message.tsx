import React from 'react'

export enum Color {
  Blue,
  Red,
}

type Props = {
  color: Color;
  content: string;
};

export default function Message({ color, content }: Props) {
  if(color === Color.Red){
    return(
       <div className='flex flex-end border rounded-sm bg-red-400 p-1 m-2 w-60 max-w-100'>
      {content}
    </div>
    )
  }

  return (
    <div className='flex flex-end border rounded-sm bg-blue-400 p-1 m-2 w-60 max-w-100'>
      {content}
    </div>
  )


}
