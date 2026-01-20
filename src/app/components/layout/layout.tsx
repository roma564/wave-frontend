import { useRef, useState, useLayoutEffect } from 'react';
import ColorLensIcon from '@mui/icons-material/ColorLens'; // Or your own icon
import { useAppSelector } from '@/app/lib/hooks';
import { themeConfig } from '@/app/config/theme.config';
import { Mode } from '@/app/types/Mode';

export default function CustomPopover() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (show && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY + 8,   // 8px offset below
        left: rect.left + window.scrollX
      });
    }
  }, [show]);

  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode)
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE 
    
  const { primaryColor } = theme

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setShow((s) => !s)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        aria-haspopup="true"
        aria-expanded={show}
      >
        <ColorLensIcon style={{ color: primaryColor }} />
      </button>

      {show && (
        <div
          style={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            minWidth: 220,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            padding: 12,
            zIndex: 1000
          }}
          role="dialog"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Вибір кольору</strong>
            <button onClick={() => setShow(false)} style={{ border: 'none', background: 'transparent' }}>
              ✕
            </button>
          </div>
          {/* Content */}
        </div>
      )}
    </>
  );
}
