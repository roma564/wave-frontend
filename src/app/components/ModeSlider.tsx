import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const modes = ['Друзі', 'Робота', 'Сім’я'];

const ModeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Початково "Робота"

  const getMode = (offset: number) =>
    modes[(activeIndex + offset + modes.length) % modes.length];

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + modes.length) % modes.length);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % modes.length);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg w-full max-w-70 ">
      <div className="flex items-center justify-between">
        {/* Ліва стрілка */}
        <div className="flex flex-col items-center">
          <button onClick={handlePrev}>
            <ArrowBackIosNewIcon fontSize="large" className="text-white" />
          </button>
          <span className="text-xs text-gray-400 mt-1">{getMode(-1)}</span>
        </div>


        {/* Центр — активний режим */}
        <div className="text-xl font-bold underline">{getMode(0)}</div>

        {/* Права стрілка */}
        <div className="flex flex-col items-center">
          <button onClick={handleNext}>
            <ArrowForwardIosIcon fontSize="large" className="text-white" />
          </button>
          <span className="text-xs text-gray-400 mt-1">{getMode(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default ModeSlider;
