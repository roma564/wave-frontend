export enum SmileMode {
  limited,
  extended
}

export type Mode = {
  id:number
  name: string
  primary_color: string
  secondary_color: string
  text_color: string
  secondary_text_color: string
  bg_color: string
  chats: number[]
  awaliable_answ: string[]
  scheduled_call_mode: boolean
  stickers: boolean
  restrictedSmileMode: boolean
}

export type CreateModeDto = {
  name: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  secondaryTextColor: string
  bgColor: string
  scheduledCallMode: boolean
  stickers: boolean
  restrictedSmileMode: boolean
}

