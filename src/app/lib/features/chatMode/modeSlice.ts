import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Mode } from '@/app/types/Mode'
import { standartMode } from './defaultMode' 

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
    }
  }
})

export const { setCurrentMode, clearCurrentMode } = modeSlice.actions
export default modeSlice.reducer
