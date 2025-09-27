import { createSlice } from '@reduxjs/toolkit'

enum SmileMode{
    limited, 
    extended
}


 

export type mode = {
    name: string
    primary_color: string
    secondary_color:string;
    text_color:string,
    secondary_text_color: string,
    bg_color: string
    chats: number[]
    awaliable_answ: string[]
    scheduled_call_mode: boolean
    stickers: boolean
    smile_mode: SmileMode
}

export type AddChatIdPayload = {
  modeName: string;
  chatId: number;
};



const workMode : mode = {
    name:'workMode',
    primary_color: '#3D99F5',
    secondary_color:'#21364A',
    text_color: '#E5E8EB',
    secondary_text_color: '#8FADCC',
    bg_color: '#0F1A24',
    chats:[14, 15, 16], //chat ID's
    awaliable_answ: ['+', 'Питання', 'Підтримую'],
    scheduled_call_mode: true,
    stickers: false, // abled/disabled
    smile_mode: SmileMode.limited // or extended
}

const familyMode: mode = {
    name:'familyMode',
    text_color: '#1C1A0D',
    secondary_text_color: '#9E8F47',
    primary_color: '#FAD938',
    secondary_color:'#F5F2E5',
    bg_color: '#FFFFFF',
    chats:[17, 18, 19, 20], //chat ID's
    awaliable_answ: ['Обійняти', 'Підтримати', 'Як справи?'],
    scheduled_call_mode: false,
    stickers: true, // abled/disabled
    smile_mode: SmileMode.extended // or extended
}

const standartMode: mode = {
    name:'standartMode',
    primary_color: '#3D99F5',
    secondary_color:'#21364A',
    text_color: '#E5E8EB',
    secondary_text_color: '#8FADCC',
    bg_color: '#0F1A24',
    chats:[], //chat ID's
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
    addChatIdToMode: (state, action) => {
      const { modeName, chatId } = action.payload;
      const targetMode = state.mods.find(item => item.name === modeName);
      if (targetMode && !targetMode.chats.includes(chatId)) {
        targetMode.chats.push(chatId);
      }
    },


  }

})

// Action creators are generated for each case reducer function
export const { setCurrentMode, addNewMode, deleteMode, addChatIdToMode } = modeSlice.actions

export default modeSlice.reducer