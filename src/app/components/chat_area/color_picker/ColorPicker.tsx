import React from 'react';
import { themeConfig } from '@/app/config/theme.config';
import { ThemeName } from '@/app/types/ThemeName';

type Props = {
  onClose: () => void;
  onSelectTheme: (theme: ThemeName) => void;
};

export default function ColorPickerModal({ onClose, onSelectTheme }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-64">
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
    </div>
  );
}
