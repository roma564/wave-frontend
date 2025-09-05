
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import ChatHeader from './chat_header';
import ChatsList from './ChatsList'
import MessageIcon from '@mui/icons-material/Message';

import { decrement, increment } from '../lib/features/counter/counterSlice';
import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { setCurrentMode } from '../lib/features/chatMode/modeSlice';
import { Color } from './message';

import NotificationsIcon from '@mui/icons-material/Notifications';
import UserInfo from './UserInfo';


 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const dispatch = useAppDispatch()



    const currentMode = useAppSelector(state => state.mode.currentMode)

    const handleChange = (event: SelectChangeEvent) => {

      dispatch(setCurrentMode(event.target.value))
    };

    useEffect(() => {
      console.log('-----------------------------------')
      console.log('current mode - ' + currentMode.name)
      console.log('current chats - ' + currentMode.chats)
      console.log('current awaliable_answ - ' + currentMode.awaliable_answ)
      console.log('bg color - ' + currentMode.bg_color)
    }, [handleChange]);
    

    const [age, setAge] = useState('');

    

    


  return (
    <>
      {/* <ChatsList /> */}
      <div className="flex flex-row place-content-between" style={{ backgroundColor: currentMode.bg_color, color: currentMode.text_color }}>
        <header className={`flex flex-row w-screen`}  >
          <MessageIcon fontSize="large" className="m-3" ></MessageIcon>
          <h1 className="text-2xl m-3 ml-0">Wavely</h1>
          <h1 className="text-2xl m-3 ml-0">{currentMode.name}</h1>
          {/* <NotificationsIcon/> */}
          
          <FormControl className='w-min' sx={{ m: 1, minWidth: 120 }}  size="small">
            <InputLabel  id="demo-select-small-label">Mode</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem  value={'workMode'}>Work</MenuItem>
              <MenuItem value={'familyMode'}>Family</MenuItem>
              <MenuItem value={'standartMode'}>Standart</MenuItem>
            </Select>
          </FormControl>
        </header>

        

        <UserInfo/>

        


        <div className={`sidebar  max-h-full order border-white bg-[] `}>
        {/* <MessageList></MessageList> */}
        </div>

         

        

        



        

    </div>
      <main>{children}</main>

    </>
  )
}