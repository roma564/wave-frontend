import React, { useState } from 'react';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { themeConfig } from '@/app/config/theme.config';
import { ThemeName } from '@/app/types/ThemeName';
import { setModeThemeLocal } from '@/app/lib/features/chatMode/modeSlice';
import { useSetModeThemeMutation } from '@/app/lib/features/chatMode/modeApi';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { Mode } from '@/app/types/Mode';

export default function ThemeButton() {
  const [setModeTheme] = useSetModeThemeMutation();
  const dispatch = useAppDispatch();

  const currentMode: Mode | null = useAppSelector((state) => state.mode.currentMode);

  const themes: ThemeName[] = [
  ThemeName.BLUE,
  ThemeName.GREEN,
  ThemeName.YELLOW,
  ThemeName.PURPLE,
];


  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setAnchorEl(null);
  };

  const handleSelectTheme = (theme: ThemeName) => {
    if (currentMode?.id) {
      setModeTheme({ modeId: currentMode.id, theme });
      dispatch(setModeThemeLocal(theme));
    }
    handleClose();
  };

  return (
    <>
      <button onClick={handleClick}>
        <ColorLensIcon style={{ color: '#7B61FF' }} />
      </button>

      {show && anchorEl && (
  <div
    className="absolute z-50 bg-white p-4 rounded shadow-lg border"
    style={{
      top: anchorEl.getBoundingClientRect().bottom + window.scrollY + 8,
      left: anchorEl.getBoundingClientRect().left + window.scrollX,
      width: 500,
      height: 500,
      overflowY: 'auto',
    }}
  >
    <h2 className="text-lg font-semibold mb-4">Оберіть тему</h2>

    <div className="grid grid-cols-2 gap-4">
      {[
        ThemeName.BLUE,
        ThemeName.GREEN,
        ThemeName.YELLOW,
        ThemeName.PURPLE,
      ].map((theme) => (
        <label
          key={theme}
          className="border rounded-lg p-2 cursor-pointer flex flex-col items-center gap-2 hover:bg-gray-100 transition"
          onClick={() => handleSelectTheme(theme)}
        >
          <div className="w-full aspect-video rounded overflow-hidden bg-gray-100">

            <img
             src={`/images/theme_selector/${theme.toLowerCase()}_theme.png`}
              alt={theme}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="theme"
              checked={currentMode?.theme === theme}
              readOnly
            />
            <span className="text-sm font-medium">{theme}</span>
          </div>
        </label>
      ))}
    </div>

    <button
      className="mt-4 text-sm text-gray-500 underline flex items-center gap-1"
      onClick={handleClose}
    >
      Закрити
    </button>
  </div>
)}

    </>
  );
}
