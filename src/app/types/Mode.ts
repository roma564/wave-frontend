export enum SmileMode {
  limited,
  extended
}

export type Mode = {
  id: number
  name: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  secondaryTextColor: string
  bgColor: string
  chats: number[]
  availableAnswers: string[]
  scheduledCallMode: boolean
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

