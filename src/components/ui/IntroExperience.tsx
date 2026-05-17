import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const bootSteps = ['Armature', 'AMR fleet', 'Japan hub'];

export const IntroExperience: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return !params.has('skipIntro') && sessionStorage.getItem('nexus_intro_played') !== 'true';
  });

  const dismiss = useCallback(() => {
    sessionStorage.setItem('nexus_intro_played', 'true');
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      dismiss();
      return;
    }

    const timer = window.setTimeout(dismiss, 2800);
    return () => window.clearTimeout(timer);
  }, [dismiss, isVisible, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-[#02040A] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: 'blur(12px)' }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Nexus Robotics Japan intro"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-5 top-5 z-30 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/68 backdrop-blur-md transition-colors hover:text-white sm:right-8 sm:top-8"
          >
            Skip
          </button>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(0,229,255,0.26),transparent_30%),radial-gradient(circle_at_22%_24%,rgba(99,102,241,0.26),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(16,185,129,0.18),transparent_30%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-[-10%] top-[-18%] h-[52%] rounded-[100%] bg-cyber-cyan/18 blur-[70px]"
            animate={{ opacity: [0.42, 0.82, 0.48], scale: [0.96, 1.05, 0.98] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[-18%] left-1/2 h-[42%] w-[78%] -translate-x-1/2 rounded-[100%] bg-cyber-indigo/22 blur-[90px]"
            animate={{ opacity: [0.28, 0.62, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-90">
            <svg viewBox="0 0 900 620" className="h-full w-full max-w-6xl" aria-hidden="true">
              <defs>
                <linearGradient id="intro-arm" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#EAFBFF" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.78" />
                </linearGradient>
                <filter id="intro-glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d="M120 430 C210 385 290 382 370 412 S520 462 626 380 S748 270 820 302"
                fill="none"
                stroke="#00E5FF"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeDasharray="10 16"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
              />

              <motion.g
                filter="url(#intro-glow)"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
              >
                <motion.circle
                  cx="455"
                  cy="316"
                  r="118"
                  fill="rgba(0,229,255,0.035)"
                  stroke="rgba(0,229,255,0.26)"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.04, 1], opacity: [0.62, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '455px 316px' }}
                />
                <motion.circle
                  cx="455"
                  cy="316"
                  r="78"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="12 10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '455px 316px' }}
                />

                <motion.g
                  animate={{ rotate: [-7, 7, -5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '455px 316px' }}
                >
                  <rect x="350" y="292" width="112" height="38" rx="19" fill="rgba(255,255,255,0.10)" stroke="url(#intro-arm)" strokeWidth="3" />
                  <rect x="456" y="252" width="132" height="36" rx="18" fill="rgba(255,255,255,0.08)" stroke="url(#intro-arm)" strokeWidth="3" transform="rotate(-27 456 252)" />
                  <circle cx="350" cy="311" r="25" fill="rgba(0,229,255,0.16)" stroke="url(#intro-arm)" strokeWidth="4" />
                  <circle cx="462" cy="311" r="19" fill="rgba(0,229,255,0.12)" stroke="url(#intro-arm)" strokeWidth="3" />
                  <motion.g
                    animate={{ rotate: [0, -18, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '584px 223px' }}
                  >
                    <path d="M572 220 L626 198 L635 220 L588 245 Z" fill="rgba(0,229,255,0.10)" stroke="url(#intro-arm)" strokeWidth="3" />
                    <path d="M632 205 L668 196 M636 218 L672 230" stroke="#EAFBFF" strokeWidth="3" strokeLinecap="round" />
                  </motion.g>
                </motion.g>

                <motion.g
                  animate={{ x: [-18, 18, -18] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <rect x="292" y="410" width="310" height="54" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(0,229,255,0.55)" strokeWidth="2" />
                  <circle cx="345" cy="468" r="16" fill="rgba(0,0,0,0.5)" stroke="#00E5FF" strokeWidth="3" />
                  <circle cx="548" cy="468" r="16" fill="rgba(0,0,0,0.5)" stroke="#00E5FF" strokeWidth="3" />
                  <path d="M338 410 L384 372 H512 L560 410" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.45)" strokeWidth="2" />
                  <rect x="402" y="390" width="96" height="20" rx="10" fill="rgba(16,185,129,0.22)" />
                </motion.g>
              </motion.g>
            </svg>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70 shadow-[0_0_32px_rgba(0,229,255,0.75)]"
            initial={{ y: -180, opacity: 0 }}
            animate={{ y: 190, opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.85, delay: 0.55, ease: [0.45, 0, 0.55, 1] }}
          />

          <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-cyber-cyan"
            >
              Robotics Intelligence Boot
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[92vw] text-center text-3xl font-black uppercase tracking-tight sm:text-5xl lg:text-7xl"
            >
              <span className="block">NEXUS ROBOTICS</span>
              <span className="block text-cyber-cyan drop-shadow-[0_0_24px_rgba(0,229,255,0.48)]">JAPAN</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.16, duration: 0.46 }}
              className="mt-4 max-w-[88vw] text-center text-xs font-bold uppercase tracking-[0.16em] text-white/78 sm:text-sm sm:tracking-[0.28em] md:text-base"
            >
              Global Robotics Intelligence
            </motion.p>

            <motion.div
              className="mt-8 w-full min-w-[260px] max-w-[82vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.96 }}
            >
              <div className="mb-3 hidden grid-cols-3 gap-3 text-center text-[9px] font-bold uppercase leading-tight tracking-[0.16em] text-white/48 sm:grid">
                {bootSteps.map((step, index) => (
                  <motion.span
                    key={step}
                    animate={{ color: ['rgba(255,255,255,0.38)', '#00E5FF', 'rgba(255,255,255,0.62)'] }}
                    transition={{ duration: 0.9, delay: 0.55 + index * 0.36 }}
                  >
                    {step}
                  </motion.span>
                ))}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/12">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-white to-status-success shadow-[0_0_20px_rgba(0,229,255,0.75)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.45, duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
