import { createSlice } from '@reduxjs/toolkit'

enum SmileMode{
    limited, 
    extended
}


 

export type mode = {
    name: string
    primary_color: string
    bg_color: string
    chats: number[]
    awaliable_answ: string[]
    scheduled_call_mode: boolean
    stickers: boolean
    smile_mode: SmileMode
}



const workMode : mode = {
    name:'workMode',
    primary_color: '#fffff',
    bg_color: '#fffff',
    chats:[], //chat ID's
    awaliable_answ: ['+', 'Питання', 'Підтримую'],
    scheduled_call_mode: true,
    stickers: false, // abled/disabled
    smile_mode: SmileMode.limited // or extended
}

const familyMode: mode = {
    name:'familyMode',
    primary_color: '#fffff',
    bg_color: '#fffff',
    chats:[], //chat ID's
    awaliable_answ: ['Обійняти', 'Підтримати', 'Як справи?'],
    scheduled_call_mode: false,
    stickers: true, // abled/disabled
    smile_mode: SmileMode.extended // or extended
}

const standartMode: mode = {
    name:'standartMode',
    primary_color: '#fffff',
    bg_color: '#fffff',
    chats:[1 ,2 ,3], //chat ID's
    awaliable_answ: ['Обійняти', 'Підтримати', 'Як справи?'],
    scheduled_call_mode: false,
    stickers: true, // abled/disabled
    smile_mode: SmileMode.extended // or extended
}


export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    mods: [familyMode, workMode],
    currentMode: standartMode,
   
  },
  reducers: {
    setCurrentMode: (state, action) => {
      const foundMode = state.mods.find(item => item.name === action.payload)
      state.currentMode = foundMode || standartMode
    },
    addNewMode:(state, action) => {
      state.mods.push(action.payload)
    },
    deleteMode:(state, action) => {
      state.mods.filter(item => item.name !== action.payload)
    },

  }

})

// Action creators are generated for each case reducer function
export const { setCurrentMode, addNewMode, deleteMode } = modeSlice.actions

export default modeSlice.reducer