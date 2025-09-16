'use client';

import Link from 'next/link';
import MessageIcon from '@mui/icons-material/Message';

export default function Header() {
  return (
    <header className="bg-[#0B1D3A] text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-20 ">

            <div className=" flex flex-row logo">
                <MessageIcon fontSize="large" className="m-3" ></MessageIcon>
                <h1 className="text-2xl m-3 ml-0">Wave</h1>
            </div>
          
         

          {/* <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-3 py-1 rounded">
              <span className="bg-blue-300 text-white">Chat</span>
            </div>
            <span className="text-xs">Page</span>
          </div> */}

          {/* Меню */}
          <nav className="hidden md:flex space-x-6 font-medium text-sm">
            <Link href="/" className="hover:text-[#A3B8FA] transition">HOME</Link>
            <Link href="/about" className="hover:text-[#A3B8FA] transition">ABOUT</Link>
            <Link href="/service" className="hover:text-[#A3B8FA] transition">SERVICE</Link>
            <Link href="/projects" className="hover:text-[#A3B8FA] transition">PROJECTS</Link>
            <Link href="/blog" className="hover:text-[#A3B8FA] transition">BLOG</Link>
            <Link href="/contact" className="hover:text-[#A3B8FA] transition">CONTACT</Link>
          </nav>

          {/* CTA Кнопка */}
          <div>
            <button className="bg-[#BFFD00] text-[#0B1D3A] font-semibold px-5 py-2 rounded-full text-sm hover:bg-yellow-300 transition">
              TRY FOR FREE
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
