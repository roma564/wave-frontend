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
          
           

          <div className="flex flex-col justify-center items-center pl-10 pr-10 xl:flex-row xl:justify-between w-full">

            
            <div className="flex flex-col items-center xl:items-start">
                <h1 className="text-6xl w-full font-dela font-bold">Найкращий чат для тебе</h1>
                <p className="mt-10 mb-10">Спілкуйся з друзями та родиною у простому, інтуїтивному просторі. Насолоджуйся безперервними розмовами з розширеними функціями та динамічним інтерфейсом.</p>
                <Link href="/chat" >
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    className="ml-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out"
                  >
                    Перейти до чату
                  </Button>
                </Link>

            </div>

            <img src="/images/welcome.png" alt="Welcome" className="w-120" /> 
          </div>
    
          <KeyFeatures/>
        </div>
        </div>

        

        
                
    </div>



 
    
);
}
