import { ThemeName } from "./ThemeName"

export enum SmileMode {
  limited,
  extended
}



export type Mode = {
  id: number
  name: string               
  theme: ThemeName           
  chats: number[]           
  availableAnswers: string[] 

  scheduledCallMode: boolean
  stickers: boolean
  restrictedSmileMode: boolean
}



export type CreateModeDto = {
  name: string
  theme: ThemeName

  scheduledCallMode: boolean
  stickers: boolean
  restrictedSmileMode: boolean
}


