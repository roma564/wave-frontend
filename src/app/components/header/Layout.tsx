
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import ChatHeader from '../chat_area/call/ChatHeader'; 
import ChatsList from '../chat_list/ChatsList'
import MessageIcon from '@mui/icons-material/Message';

import { decrement, increment } from '../../lib/features/counter/counterSlice';
import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { setCurrentMode } from '../../lib/features/chatMode/modeSlice';
import { Color } from '../chat_area/MessageBox'; 

import NotificationsIcon from '@mui/icons-material/Notifications';
import UserInfo from './UserInfo';
import ModeSlider from './ModeSlider';
import { Mode } from '@/app/types/Mode';
import { themeConfig } from '@/app/config/theme.config';
import ThemeButton from '../chat_area/color_picker/ThemeButton';


 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
    const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE // fallback
     
    const { bgColor, textColor, secondaryTextColor, primaryColor } = theme










    


  return (
    <>
      {/* <ChatsList /> */}
      <div className="flex flex-row border-b place-content-between h-20 items-center" style={{ backgroundColor: bgColor, color: textColor }}>
        <header className={`flex flex-row w-screen`}  >


          <img src="/images/logo.png" alt="Logo" className='h-12 mt-1 ml-20 hidden sm:inline' />
          <h1 className="text-2xl m-3 ml-0 font-dela font-bold font-200 hidden md:inline">Wave</h1>

          <ModeSlider/>
          <ThemeButton/>
          
          
        </header>

        

        <UserInfo/>

        


        <div className={`sidebar  max-h-full order border-white bg-[] `}>

        </div>

         

    </div>
      <main>{children}</main>

    </>
  )
}