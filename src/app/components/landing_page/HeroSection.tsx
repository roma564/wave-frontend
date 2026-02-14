import Link from "next/link";
import SendIcon from '@mui/icons-material/Send';
import FlyingMessages from "./FlyingMessages";

export default function HeroSection() {
  return (
    <div className="relative w-full h-full overflow-hidden mt-20">
      <div className="flex flex-row container">

        <div className="flex flex-col items-center xl:items-start">
          <div className="max-w-70">
            <h1 className="text-6xl w-full font-bold font-unbounded">Beyong</h1>
            <h1 className="text-6xl italic font-bold font-unbounded bg-gradient-to-r from-white via-[#E2C6FD] to-[#C087F6] bg-clip-text text-transparent">
              Digital.
            </h1>
          </div>

          <p className="mt-10 mb-10 text-[#a3a8b2] max-w-110 font-ubuntu">
            Спілкуйся з друзями та родиною у простому,
            інтуїтивному просторі...
          </p>

          <div className="flex justify-between w-100 gap">
            <Link
              href="/chat"
              className="h-12 w-50 flex items-center justify-center gap-1 bg-[#4F46E5] text-white text-sm font-exo2 rounded-lg shadow-glow-slow transition"
            >
              ESTABLISH LINK <SendIcon className="ml-2" fontSize="small" />
            </Link>

            <Link
              href="/chat"
              className="h-12 w-40 flex items-center justify-center gap-1 border border-[#a5a2a2] bg-[#b9b9b90e] text-white text-sm font-exo2 rounded-lg "
            >
              SPATIAL DEMO
            </Link>
          </div>
        </div>


        <div className="relative flex justify-center glow w-160">
          <img src="/images/landing_page/phone_2.png" alt="Welcome" className="w-80" />

          {/* Абсолютний шар для FlyingMessages */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <FlyingMessages />
          </div>
        </div>
      </div>
    </div>
  );
}

