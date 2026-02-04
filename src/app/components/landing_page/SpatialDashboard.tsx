import React, { useEffect, useRef } from 'react';
import LayersIcon from '@mui/icons-material/Layers';
import VibrationIcon from '@mui/icons-material/Vibration';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SpatialCanvas from './SpatialCanvas';

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
          The Spatial Dashboard
        </h2>
        <p className="text-[#8FADCC] text-base font-ubuntu leading-relaxed mb-10 max-w-2xl">
          Experience communication in three dimensions. Our proprietary layout engine organizes data based on cognitive priority, enabling multi-layer navigation and real-time haptic feedback in a warm, ambient environment.
        </p>

        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="flex flex-col items-start gap-6 flex-1">
            {/* Multi-Layer Navigation */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5">
                <LayersIcon fontSize="medium" className="text-white opacity-80" />
              </div>
              <span className="text-white font-ubuntu text-sm">Multi-Layer Navigation</span>
            </div>

            {/* Real-time Haptic Feedback */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5">
                <VibrationIcon fontSize="medium" className="text-white opacity-80" />
              </div>
              <span className="text-white font-ubuntu text-sm">Real-time Haptic Feedback</span>
            </div>
          </div>

          <div className="flex-1 w-full">
            <SpatialCanvas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialDashboard;
