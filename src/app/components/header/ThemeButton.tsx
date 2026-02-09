import React, { useState, useEffect, useRef } from 'react';
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
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE;
  const { bgColor, textColor, secondaryTextColor, primaryColor, borderColor } = theme;

  const themes: ThemeName[] = [
    ThemeName.BLUE,
    ThemeName.PASTEL,
    ThemeName.YELLOW,
    ThemeName.PURPLE,
  ];

  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    // повторне натискання іконки закриває
    if (show) {
      handleClose();
    } else {
      setAnchorEl(e.currentTarget);
      setShow(true);
    }
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

  // Закриття при кліку поза діалогом
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && show) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <button onClick={handleClick} className="ml-5">
        <ColorLensIcon style={{ color: primaryColor }} />
      </button>

      {show && anchorEl && (
        <div
          ref={popupRef}
          className="absolute z-50 p-4 rounded shadow-lg border"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            borderColor: borderColor,
            top: anchorEl.getBoundingClientRect().bottom + window.scrollY + 8,
            left: anchorEl.getBoundingClientRect().left + window.scrollX,
            width: 500,
            height: 500,
            overflowY: 'auto',
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
            Оберіть тему
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <label
                key={theme}
                className="border rounded-lg p-2 cursor-pointer flex flex-col items-center gap-2 hover:opacity-80 transition"
                style={{ borderColor }}
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
                  <span className="text-sm font-medium" style={{ color: secondaryTextColor }}>
                    {theme}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <button
            className="mt-4 text-sm underline flex items-center gap-1"
            style={{ color: secondaryTextColor }}
            onClick={handleClose}
          >
            Закрити
          </button>
        </div>
      )}
    </>
  );
}
