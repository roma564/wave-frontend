import { Mode } from '@/app/types/Mode'
import { ThemeName } from '@/app/types/ThemeName'

export const standartMode: Mode = {
  id: 0,
  name: 'standartMode',
  theme: ThemeName.BLUE, 
  chats: [],
  availableAnswers: ['Обійняти', 'Підтримати', 'Як справи?'],
  scheduledCallMode: false,
  stickers: true,
  restrictedSmileMode: false
}

