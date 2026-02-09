import { ThemeName } from "../types/ThemeName"

export const themeConfig: Record<ThemeName, {
  bgColor: string,
  chatListBgColor: string,  
  chatBgColor:string,
  chatBgColorSecondary:string, 
  textColor: string,
  secondaryTextColor: string
  primaryColor: string,
  borderColor:string,
  iconsColor:string
}> = {
  BLUE: { bgColor: '#182235',chatListBgColor: '#172034',chatBgColor:'#2F394C',chatBgColorSecondary:'#3A4456', textColor: '#FFFFFF', secondaryTextColor: '#4B5465', primaryColor: '#2196F3',borderColor:'#ACACAC',iconsColor:'#C5C8CE' },
  PASTEL: { bgColor:'#FDF6F0', chatListBgColor:'#E3F2FD', chatBgColor:'#FCE4EC', chatBgColorSecondary:'#FFFDE7', textColor:'#37474F', secondaryTextColor:'#607D8B', primaryColor:'#FF80AB', borderColor:'#B0BEC5', iconsColor:'#90A4AE' },
  YELLOW: { bgColor: '#FEEF9F',chatListBgColor: '#FFEEBC',chatBgColor:'#FFEEBC',chatBgColorSecondary:'#F3DB8A', textColor: '#544A18', secondaryTextColor: '#B7AB74', primaryColor: '#FADA38',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
  PURPLE: { bgColor: '#2A1A32',chatListBgColor: '#4A3157',chatBgColor:'#4A3157',chatBgColorSecondary:'#1C1221', textColor: '#FFFFFF', secondaryTextColor: '#B891C9', primaryColor: '#A312ED',borderColor:'#2196F3',iconsColor:'#C5C8CE' },
}
