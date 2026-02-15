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
import InteractiveSpace from "./components/landing_page/InteractiveSpace";
import HeroSection from "./components/landing_page/HeroSection";




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
        
        <HeroSection/>

        <InteractiveSpace/>

        <KeyFeatures/>

        <SpatialDashboard />

        <Footer/>
        

        

        
                
    </div>



 
    
);
}
