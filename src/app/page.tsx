"use client"

import Image from "next/image";
import MessageIcon from '@mui/icons-material/Message';

import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./lib/features/counter/counterSlice";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";
import KeyFeatures from "./components/welcome_page/KeyFeatures";
import Header from "./components/welcome_page/Header";





export default function Home() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
 
  return (
    
    // <Layout>
      <div className="flex flex-col bg-[#0d1730] ">
          
        <Header/>
        <div className="flex flex-col items-center mt-10">
          
          <div className=" flex flex-col max-w-[1000px] items-center">
          
           

          <div className="flex justify-between w-full ">
            
            <div className="items-center">
                <h1 className="text-6xl w-100 font-dela font-bold">Найкращий чат для тебе</h1>
                <p className="mt-20 mb-20">Connect with friends and family in a simple, intuitive space. Enjoy seamless conversations with enhanced features and a dynamic interface.</p>
                <Link  href={`/chat`}>
                  <Button className='rounded-2xl ml-3 place-content-center' variant="contained" endIcon={<SendIcon />} >
                    To chat
                  </Button>
                </Link>
            </div>

            <img src="/images/welcome.png" alt="Welcome" className="w-120" /> 
          </div>
    
          <KeyFeatures/>
        </div>
        </div>

        

        
                
    </div>
  // </Layout>
    
);
}
