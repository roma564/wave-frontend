import React from 'react'

export enum Color {
  Blue,
  Red,
}

type Props = {
  color: Color;
  content: string;
};

export default function MessageBox({ color, content }: Props) {
  if(color === Color.Red){
    return(
      <div className="wrapper flex flex-row flex-end m-2">
        <div className=' border rounded-lg rounded-bl-none bg-red-400 p-1 w-60 max-w-100'>
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper flex flex-row flex-end m-2 justify-end">
      <div className=' border rounded-lg rounded-br-none bg-blue-400 p-1 w-60 max-w-100 '>
        {content}
      </div>
    </div>
  )


}
