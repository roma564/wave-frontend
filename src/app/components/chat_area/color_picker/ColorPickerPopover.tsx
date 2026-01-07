import React, { useEffect, useLayoutEffect, useState } from 'react';
import { themeConfig } from '@/app/config/theme.config';
import { ThemeName } from '@/app/types/ThemeName';

type Props = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelectTheme: (theme: ThemeName) => void;
};

export default function ColorPickerPopover({ anchorEl, onClose, onSelectTheme }: Props) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
  }, [anchorEl]);

  if (!anchorEl) return null;

  return (
    <div
      className="absolute z-50 bg-white p-4 rounded shadow-lg w-64 border"
      style={{ top: position.top, left: position.left }}
    >
      <h2 className="text-lg font-semibold mb-2">Оберіть тему</h2>
      <div className="grid grid-cols-2 gap-2">
        {(
          Object.entries(themeConfig) as [ThemeName, { primaryColor: string; textColor: string }][]
        ).map(([key, theme]) => (
          <button
            key={key}
            className="p-2 rounded border flex items-center justify-center"
            style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
            onClick={() => {
              onSelectTheme(key);
              onClose();
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <button
        className="mt-4 text-sm text-gray-500 underline"
        onClick={onClose}
      >
        Закрити
      </button>
    </div>
  );
}
