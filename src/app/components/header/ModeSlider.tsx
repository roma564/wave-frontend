import { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { setCurrentMode } from '@/app/lib/features/chatMode/modeSlice';

const modes = ['Стандартний', 'Робота', 'Сім’я'];
const modeMap: Record<string, string> = {
  'Стандартний': 'standartMode',
  'Робота': 'workMode',
  'Сім’я': 'familyMode',
};

const ModeSlider = () => {
  const currentMode = useAppSelector(state => state.mode.currentMode);

  const [activeIndex, setActiveIndex] = useState(1); // Початково "Робота"
  const dispatch = useAppDispatch();

  const getMode = (offset: number) =>
    modes[(activeIndex + offset + modes.length) % modes.length];

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + modes.length) % modes.length);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % modes.length);


  useEffect(() => {
    const modeName = getMode(0);
    const modeKey = modeMap[modeName];
    dispatch(setCurrentMode(modeKey));
  }, [activeIndex]);

  return (
    <div className="flex items-center justify-between ml-20">
      {/* Ліва стрілка */}
      <div
        className="flex flex-col items-center"
        style={{ width: '80px', minWidth: '80px', textAlign: 'center' }}
      >
        <button onClick={handlePrev}>
          <ArrowBackIosNewIcon
            fontSize="large"
            style={{ color: currentMode.text_color, width: '24px', height: '24px' }}
          />
        </button>
        <span
          style={{ color: currentMode.secondary_text_color }}
          className="text-xs mt-1"
        >
          {getMode(-1) }
        </span>
      </div>

      {/* Центр — активний режим */}
      <div
        className="text-xl font-bold underline text-center"
        style={{
          color: currentMode.primary_color,
          width: '140px',
          minWidth: '140px',
          maxWidth: '140px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {getMode(0)}
      </div>

      {/* Права стрілка */}
      <div
        className="flex flex-col items-center"
        style={{ width: '80px', minWidth: '80px', textAlign: 'center' }}
      >
        <button onClick={handleNext}>
          <ArrowForwardIosIcon
            fontSize="large"
            style={{ color: currentMode.text_color, width: '24px', height: '24px' }}
          />
        </button>
        <span
          style={{ color: currentMode.secondary_text_color }}
          className="text-xs mt-1"
        >
          {getMode(1)}
        </span>
      </div>
    </div>

  );
};

export default ModeSlider;
