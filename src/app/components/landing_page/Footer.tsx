import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const Footer = () => {
  return (
    <footer className="bg-[#03050b] text-[#ababab] py-20 px-6 font-ubuntu">
      <div className="max-w-6xl mx-auto">
        {/* Верхній блок: брендинг + чотири колонки */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-16 min-h-[320px]">
          {/* Брендинг */}
          <div className="md:w-2/5 flex flex-col items-center text-center md:text-left md:items-start">
          {/* <img src="/landing_page/logo.png" alt="Logo" /> */}
            <h3 className="text-white text-2xl mb-2 font-exo2 font-bold tracking-widest">WAVE</h3>
            <p className="leading-loose font-exo2">
              Engineering the future of high-bandwidth human connection through precise spatial architecture.
            </p>
          </div>

          {/* Чотири колонки */}
          <div className="flex flex-col font-exo2 md:flex-row md:gap-16 gap-10 md:w-3/5 items-center md:items-start text-center md:text-left">
            {/* SYSTEM */}
            <div className="leading-[3] space-y-2">
              <h4 className="text-[#483fcd] font-semibold mb-2 tracking-widest ">SYSTEM</h4>
              <ul>
                <li>Nodes</li>
                <li>Sync Engine</li>
                <li>API Kit</li>
              </ul>
            </div>

            {/* COLLECTIVE */}
            <div className="leading-[3] space-y-2">
              <h4 className="text-[#6E36A3] font-semibold mb-2 tracking-widest ">COLLECTIVE</h4>
              <ul>
                <li>Nexus</li>
                <li>Signal Pad</li>
                <li>Results</li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="leading-[3] space-y-2">
              <h4 className="text-white font-semibold mb-2 tracking-widest ">LEGAL</h4>
              <ul>
                <li>Protocols</li>
                <li>Trust</li>
              </ul>
            </div>

            {/* CONNECT */}
            <div className="leading-[3] space-y-2">
              <h4 className="text-[#483fcd] font-semibold mb-2 tracking-widest ">CONNECT</h4>
              <div className="flex gap-4 mt-2 justify-center md:justify-start">
                <div className="w-8 h-8 flex items-center justify-center  border rounded-md border-white/20 bg-white/5">
                  <InstagramIcon fontSize="small" className="text-white opacity-80" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center border rounded-md border-white/20 bg-white/5">
                  <LinkedInIcon fontSize="small" className="text-white opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижній ряд */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs border-t border-white/10 pt-6">
          {/* Копірайт */}
          <div className="text-center md:text-right font-exo2 font-bold tracking-widest">
            © 2026 WAVELY HIGH-TECH. ALL RIGHTS RESERVED.
          </div>

          {/* Метрики */}
          <div className="flex gap-6 font-exo2 font-bold tracking-widest">
            <span className="text-[#6E36A3]">LATENCY: <span >0.28ms</span></span>
            <span className="text-[#4441c7]">UPTIME: <span >99.9%</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
