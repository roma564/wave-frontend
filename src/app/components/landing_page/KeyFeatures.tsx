import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GroupIcon from '@mui/icons-material/Group';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const features = [
  {
    icon: ChatBubbleOutlineIcon,
    bg: 'from-purple-600 to-purple-900',
    progressColor: 'bg-purple-500',
    progressValue: 50,
    title: 'Titan Protocol',
    description: 'Professional-grade workspace featuring neural threading and priority bandwidth for critical communications.',
  },
  {
    icon: GroupIcon,
    bg: 'from-pink-500 to-purple-700',
    progressColor: 'bg-pink-400',
    progressValue: 80,
    title: 'Legacy Mode',
    description: 'Encrypted vaults for family archives and synchronous life-event tracking in a warm, haptic environment.',
  },
  {
    icon: ShieldOutlinedIcon,
    bg: 'from-gray-700 to-gray-900',
    progressColor: 'bg-gray-500',
    progressValue: 100,
    title: 'Vibe Engine',
    description: 'Low-latency social channels with dynamic visual themes and collaborative media synchronization.',
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-16 px-6 text-center min-h-120">
      <p className="text-[#3B35B1] text-sm mb-2 font-exo2 tracking-widest">
        ОСНОВНІ ПЕРЕВАГИ
      </p>

      <h2 className="text-4xl font-bold text-white mb-10 font-ubuntu">
        Ключові можливості
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="bg-[#0F172A] rounded-xl shadow-sm p-6 w-72 hover:shadow-md transition duration-300 text-left flex flex-col justify-between h-80"
            >
              <div>
                {/* Іконка */}
                <div
                  className={`flex items-center justify-center w-20 h-20 mb-4 rounded-xl 
                              bg-gradient-to-br ${feature.bg} 
                              shadow-[0_8px_20px_rgba(0,0,0,0.7)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.8)] transition`}
                >
                  <IconComponent fontSize="large" className="text-white" />
                </div>

                {/* Текст */}
                <h3 className="text-xl font-semibold font-ubuntu text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#8FADCC] text-sm font-ubuntu">
                  {feature.description}
                </p>
              </div>

              {/* Прогрес-бар */}
              <div className="mt-4 w-full bg-[#1E1E2F] rounded-full h-1 overflow-hidden">
                <div
                  className={`${feature.progressColor} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${feature.progressValue}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KeyFeatures;
