
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import LayersIcon from '@mui/icons-material/Layers';
import VibrationIcon from '@mui/icons-material/Vibration';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SpatialCanvas from './SpatialCanvas';
import CallIcon from '@mui/icons-material/Call';
import EventIcon from '@mui/icons-material/Event';
import Link from 'next/link';
import SendIcon from '@mui/icons-material/Send';


gsap.registerPlugin(ScrollTrigger);

const SpatialDashboard = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          x: -60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: { each: 0.4 },
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <div id="spatial-dashboard" className="py-16 px-6 min-h-120">
      <div className="max-w-4xl mx-auto" ref={contentRef}>
        <h2 className="text-4xl font-bold text-white mb-6 font-ubuntu">
          Глобальна взаємодія
        </h2>
        <p className="text-[#8FADCC] text-base font-ubuntu leading-relaxed mb-10 max-w-2xl">
          Спілкуйся без кордонів. Насолоджуйся дзвінками по всьому світу, розширеними повідомленнями та інтерактивною взаємодією. 
          Наша система впорядковує інформацію за важливістю, забезпечуючи багаторівневу навігацію 
          та безпечне спілкування в затишному середовищі.
        </p>


        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="flex flex-col items-start gap-6 flex-1">
           
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5">
                <CallIcon fontSize="medium" className="text-white opacity-80" />
              </div>
              <span className="text-white font-ubuntu text-sm">Дзвінки</span>
            </div>


            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5">
                <EventIcon fontSize="medium" className="text-white opacity-80" />
              </div>
              <span className="text-white font-ubuntu text-sm">Заплановані онлайн зустрічі</span>
            </div>
              <Link
                href="/chat"
                className="mt-10 h-12 w-50 flex items-center justify-center gap-1 bg-[#4F46E5] text-white text-sm font-exo2 rounded-lg shadow-glow-slow transition"
              >
                ПОЧАТИ CПІЛКУВАННЯ <SendIcon className="ml-2 " fontSize="small" />
              </Link>
          </div>

          <div className="flex-1 w-full ">
            <SpatialCanvas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialDashboard;
