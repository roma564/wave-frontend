import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Mode } from '@/app/types/Mode'
import { standartMode } from './defaultMode' 
import { ThemeName } from '@/app/types/ThemeName'

type ModeState = {
  currentMode: Mode | null
}

const initialState: ModeState = {
  currentMode: standartMode
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setCurrentMode: (state, action: PayloadAction<Mode>) => {
      state.currentMode = action.payload
    },
    clearCurrentMode: (state) => {
      state.currentMode = standartMode
    },
    setModeThemeLocal(state, action: PayloadAction<ThemeName>) {
      if (state.currentMode) {
        state.currentMode.theme = action.payload;
      }
    },
    addChatToCurrentMode(state, action: PayloadAction<number>) {
    if (state.currentMode) {
      state.currentMode.chats = [...(state.currentMode.chats ?? []), action.payload]
    }
  }

  }
})

export const { setCurrentMode, clearCurrentMode, setModeThemeLocal, addChatToCurrentMode } = modeSlice.actions
export default modeSlice.reducer
