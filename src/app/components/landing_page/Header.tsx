'use client';

import Link from 'next/link';
import MessageIcon from '@mui/icons-material/Message';



export default function Header() {
  return (
    <header className="bg-[#030613] text-white border-b-1 border-[#090D1A] ">
      


      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-20 ">

            <div className=" flex flex-row items-center logo">
                {/* <MessageIcon fontSize="large" className="m-3" ></MessageIcon> */}
                <img src="/images/logo.png" alt="Logo" className='w-15 h-10'/>
                <h1 className="text-2xl m-3 ml-0  font-bold font-exo2 font-20">Wave</h1>
            </div>
          
         

          {/* <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-3 py-1 rounded">
              <span className="bg-blue-300 text-white">Chat</span>
            </div>
            <span className="text-xs">Page</span>
          </div> */}

          {/* Меню */}
          <nav className={`hidden md:flex space-x-10 font-medium text-sm font-exo2 tracking-widest`}>
            <Link href="/" className="hover:text-[#A3B8FA] transition ">Головна</Link>
            <Link href="/about" className="hover:text-[#A3B8FA] transition">Переваги</Link>
            <Link href="/service" className="hover:text-[#A3B8FA] transition">Можливості</Link>
            <Link href="/projects" className="hover:text-[#A3B8FA] transition">Автор</Link>
            
          </nav>


          {/* Кнопка */}
          <div>
            <button className="bg-white text-[#0B1D3A] font-bold font-exo2 tracking-widest px-5 py-2 rounded-full text-sm transition hover:bg-yellow-300">
              СПРОБУЙ
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
