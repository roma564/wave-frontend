"use client"

import Image from "next/image";
import MessageIcon from '@mui/icons-material/Message';

import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./lib/features/counter/counterSlice";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";
import KeyFeatures from "./components/landing_page/KeyFeatures";
import Header from "./components/landing_page/Header";
import BoltIcon from '@mui/icons-material/Bolt';



import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SpatialDashboard from "./components/landing_page/SpatialDashboard";
import Footer from "./components/landing_page/Footer";




export default function Home() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()


  // const container = useRef();

  const boxRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // gsap code here...
    gsap.to('.box', {
       y: 30,
       yoyo: true,
       duration: 2, 
       repeat: -1
      });
     // <-- automatically reverted
  }); // <-- scope is for selector text (optional)


 
  return (
    
    // <Layout>

      <div className="flex flex-col bg-[#030712] ">
       
        <Header/>
        <div className="flex flex-col items-center mt-10 h-140">

          
          {/* Container */}
          <div className=" flex flex-col max-w-[1700px] items-center">
          
           

          <div className="flex flex-col   between  pl-10 pr-10 xl:flex-row xl:justify-between w-full">
            {/* Hero Section */}
            <div className="flex flex-row ">
                <div className="flex flex-col items-center xl:items-start">
                  {/* Beyong Digital */}
                  <div className="max-w-70">
                    <h1 className="text-6xl w-full font-bold font-unbounded ">Beyong</h1>
                    <h1 className="text-6xl italic font-bold font-unbounded bg-gradient-to-r from-white via-[#E2C6FD] to-[#C087F6] bg-clip-text text-transparent">
                      Digital.
                    </h1>
                  </div>
                  

                  <p className="mt-10 mb-10 text-[#a3a8b2] max-w-110 font-ubuntu">
                    Спілкуйся з друзями та родиною у простому,
                     інтуїтивному просторі.
                    Насолоджуйся безперервними розмовами з розширеними функціями
                     та динамічним інтерфейсом.
                    </p>

                  <div className="flex justify-between w-100 gap">
                      <Link
                          href="/chat"
                          className="h-12 w-50 flex items-center justify-center gap-1 bg-[#4F46E5] text-white text-sm font-exo2 rounded-lg shadow-glow-slow  transition"
                        >
                          ESTABLISH LINK <SendIcon className="ml-2" fontSize="small" />
                        </Link>


                      <Link
                          href="/chat"
                          className="h-12 w-40 flex items-center justify-center gap-1 border border-[#a5a2a2] bg-[#b9b9b90e] text-white text-sm font-exo2 rounded-lg "
                        >
                          SPATIAL DEMO
                        </Link>



                  </div>

                 

                </div>
                <img src="/images/welcome.png" alt="Welcome" className="w-120" /> 
                
            </div>  
            
            

            
          </div>
    
          
          </div>
        
                 


        </div>

        <KeyFeatures/>

        <SpatialDashboard />

        <Footer/>
        

        

        
                
    </div>



 
    
);
}
