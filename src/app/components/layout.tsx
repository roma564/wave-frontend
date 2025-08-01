
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import ChatHeader from './chat_header';
import ChatsList from './ChatsList'
import MessageIcon from '@mui/icons-material/Message';

import { decrement, increment } from '../lib/features/counter/counterSlice';
 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()


  return (
    <>
      {/* <ChatsList /> */}
      <div className="flex flex-col">
        <header className="flex flex-row bg-[#696969]">
          <MessageIcon fontSize="large" className="m-3" ></MessageIcon>
          <h1 className="text-2xl m-3 ml-0">Wavely</h1>
          <ChatHeader/>
        </header>

        <div className="sidebar  max-h-full order border-white bg-[#696969]">
        {/* <MessageList></MessageList> */}
        </div>

         

        

        



        

    </div>
      <main>{children}</main>

    </>
  )
}