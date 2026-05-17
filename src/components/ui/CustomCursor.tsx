import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const allowedLabels = new Set(['VIEW', 'OPEN', 'COMPARE', 'SAVE', 'MATCH', 'PREVIEW', 'START', 'HOME']);

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const haloX = useSpring(cursorX, { stiffness: 170, damping: 24, mass: 0.35 });
  const haloY = useSpring(cursorY, { stiffness: 170, damping: 24, mass: 0.35 });

  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!pointerFine || reducedMotion || !desktop) return;

    setEnabled(true);

    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const updateLabel = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const cursorElement = target?.closest('[data-cursor]');
      const raw = cursorElement?.getAttribute('data-cursor')?.trim().toUpperCase();

      if (raw && allowedLabels.has(raw)) {
        setLabel(raw);
        return;
      }

      const clickable = target?.closest('a, button, input, select, textarea, [role="button"]');
      setLabel(clickable ? 'OPEN' : '');
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('pointerover', updateLabel, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('pointerover', updateLabel);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  const active = label !== '';

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden items-center justify-center lg:flex"
        style={{ x: haloX, y: haloY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 text-[9px] font-extrabold tracking-[0.18em] text-white shadow-[0_0_28px_rgba(0,229,255,0.22)] backdrop-blur-md"
          animate={{
            width: active ? 78 : 34,
            height: active ? 78 : 34,
            x: active ? -39 : -17,
            y: active ? -39 : -17,
            opacity: active ? 1 : 0.58,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <AnimatePresence mode="wait">
            {active && (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[121] hidden h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.7)] lg:block"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};
