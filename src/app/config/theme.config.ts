import { ThemeName } from "../types/ThemeName"

export const themeConfig: Record<ThemeName, {
  bgColor: string
  chatListBgColor: string   //!!!! Global secondary color
  chatBgColor:string,
  chatBgColorSecondary:string, 
  textColor: string,
  secondaryTextColor: string
  primaryColor: string,

  borderColor:string,
  iconsColor:string
}> = {
  BLUE: { bgColor: '#182235',chatListBgColor: '#172034',chatBgColor:'#2F394C',chatBgColorSecondary:'#3A4456', textColor: '#FFFFFF', secondaryTextColor: '#4B5465', primaryColor: '#2196F3',borderColor:'#ACACAC',iconsColor:'#C5C8CE' },
  GREEN: { bgColor: '#E8F5E9',chatListBgColor: '#172134',chatBgColor:'#172134',chatBgColorSecondary:'#172134', textColor: '#1B5E20', secondaryTextColor: '#388E3C', primaryColor: '#4CAF50',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
  YELLOW: { bgColor: '#FCFAF7',chatListBgColor: '#FFF8F0',chatBgColor:'#FFF6EB',chatBgColorSecondary:'#FFFBF5', textColor: '#544A18', secondaryTextColor: '#B7AB74', primaryColor: '#FADA38',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
  PURPLE: { bgColor: '#F3E5F5',chatListBgColor: '#F3E5F5',chatBgColor:'#172134',chatBgColorSecondary:'#172134', textColor: '#4A148C', secondaryTextColor: '#7B1FA2', primaryColor: '#9C27B0',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
}
