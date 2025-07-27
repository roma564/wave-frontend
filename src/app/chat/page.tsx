import React from 'react'
import Message from '../components/message'
import {Color} from '../components/message'

export default function page() {
  return (
    <div className='flex flex-row place-content-center border w-full min-h-full'>
        <div className="messages border w-200 h-80 ">
            chat page
            <Message direction={Color.Red} content="text content in props"/>
            <Message direction={Color.Blue} content="text content in props"/>
        </div>
        
    </div>
  )
}
