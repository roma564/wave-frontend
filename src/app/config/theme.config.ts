import { ThemeName } from "../types/ThemeName"

export const themeConfig: Record<ThemeName, {
  bgColor: string
  textColor: string
  secondaryTextColor: string
  primaryColor: string
}> = {
  BLUE: { bgColor: '#E3F2FD', textColor: '#0D47A1', secondaryTextColor: '#1976D2', primaryColor: '#2196F3' },
  GREEN: { bgColor: '#E8F5E9', textColor: '#1B5E20', secondaryTextColor: '#388E3C', primaryColor: '#4CAF50' },
  YELLOW: { bgColor: '#FFFDE7', textColor: '#F57F17', secondaryTextColor: '#FBC02D', primaryColor: '#FFEB3B' },
  PURPLE: { bgColor: '#F3E5F5', textColor: '#4A148C', secondaryTextColor: '#7B1FA2', primaryColor: '#9C27B0' },
}
