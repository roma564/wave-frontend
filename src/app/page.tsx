"use client"

import Image from "next/image";
import MessageIcon from '@mui/icons-material/Message';
import ChatHeader from "./components/chat_header";

import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./lib/features/counter/counterSlice";
import { MessagesList } from "./components/MessagesList";
import Layout from "./components/layout";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";





export default function Home() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
 
  return (
  
    <Layout>
      <div className="flex flex-col">
        <header className="flex flex-row bg-[#696969]">
          <MessageIcon fontSize="large" className="m-3" ></MessageIcon>
          <h1 className="text-2xl m-3 ml-0">Wave</h1>
          {/* <ChatHeader></ChatHeader> */}
        </header>

        <div className="sidebar  max-h-full order border-white bg-[#696969]">

        </div>

         

        

        <div>
          <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </div>
        </div>

        {/* <MessagesList/> */}
                <Link  href={`/chat/?chatId=${2}`}>
                  <Button className='rounded-2xl ml-3 place-content-center' variant="contained" endIcon={<SendIcon />} >
                    To chat
                  </Button>
                </Link>
        

    </div>
    </Layout>
    
  );
}
