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
  PASTEL: { bgColor: '#E8F5E9',chatListBgColor: '#172134',chatBgColor:'#172134',chatBgColorSecondary:'#172134', textColor: '#1B5E20', secondaryTextColor: '#388E3C', primaryColor: '#4CAF50',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
  YELLOW: { bgColor: '#FEEF9F',chatListBgColor: '#FFEEBC',chatBgColor:'#FFEEBC',chatBgColorSecondary:'#F3DB8A', textColor: '#544A18', secondaryTextColor: '#B7AB74', primaryColor: '#FADA38',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
  PURPLE: { bgColor: '#2A1A32',chatListBgColor: '#4A3157',chatBgColor:'#4A3157',chatBgColorSecondary:'#1C1221', textColor: '#FFFFFF', secondaryTextColor: '#B891C9', primaryColor: '#A312ED',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
}
