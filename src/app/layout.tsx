
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Provider } from 'react-redux'
import ChatsList from "./components/chat_list/ChatsList";
import { useAppSelector } from "./lib/hooks";
import localFont from 'next/font/local'

import { Exo_2 } from 'next/font/google'
import { Ubuntu } from 'next/font/google'

import { Unbounded } from 'next/font/google' 
const unbounded = Unbounded({ 
  subsets: ['latin', 'cyrillic'], 
  variable: '--font-unbounded', 
})

const ubuntu = Ubuntu({
  subsets: ['latin', 'cyrillic'], 
  weight: ['400', '500', '700'], 
  variable: '--font-ubuntu',
})



const exo2 = Exo_2({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-exo2',
})





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const michroma = localFont({
  src: [
    {
      path: '../../public/fonst/Exo2-VariableFont_wght.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-michroma',
})





export const metadata: Metadata = {
  title: "Wave",
  description: "Wave – the best online chat",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
      
        <html lang="en" className={`${ubuntu.variable} ${exo2.variable} ${unbounded.variable}`} >
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <StoreProvider>
                  {children}
            </StoreProvider>         
          </body>
        </html>

    
  );
}
