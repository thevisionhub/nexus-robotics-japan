import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { cn } from '../../utils/cn';

export const motionPresets = {
  page: {
    initial: { opacity: 1, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0.92, y: -8 },
    transition: { duration: 0.28, ease: 'easeOut' as const },
  },
  section: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  stagger: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  },
};

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-cyber-cyan via-cyber-indigo to-status-success"
      style={{ scaleX }}
    />
  );
};

export const BlueprintGridBackground: React.FC<{ className?: string; dense?: boolean }> = ({ className, dense }) => (
  <div
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute inset-0 overflow-hidden',
      className,
    )}
  >
    <div
      className={cn(
        'absolute inset-0 opacity-60',
        dense ? 'bg-[size:24px_24px]' : 'bg-[size:44px_44px]',
        'bg-[linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)]',
      )}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.13),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(99,102,241,0.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent_30%)]" />
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_92%)]" />
  </div>
);

export const NetworkNodes: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 900 560"
    preserveAspectRatio="xMidYMid meet"
    className={cn('pointer-events-none absolute inset-0 h-full w-full overflow-visible', className)}
  >
    <defs>
      <linearGradient id="nexus-line" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.05" />
        <stop offset="45%" stopColor="#00E5FF" stopOpacity="0.42" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.06" />
      </linearGradient>
      <filter id="nexus-node-glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {[
      [118, 150, 520, 266],
      [190, 422, 520, 266],
      [358, 92, 520, 266],
      [704, 132, 520, 266],
      [760, 398, 520, 266],
      [612, 452, 520, 266],
    ].map(([x1, y1, x2, y2], index) => (
      <motion.line
        key={`line-${index}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#nexus-line)"
        strokeWidth="1.3"
        strokeDasharray="8 12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.2 + index * 0.08, duration: 1.4, ease: 'easeOut' }}
      />
    ))}
    {[
      [118, 150, 'DE'],
      [190, 422, 'SG'],
      [358, 92, 'SE'],
      [704, 132, 'US'],
      [760, 398, 'KR'],
      [612, 452, 'CN'],
      [520, 266, 'JP'],
    ].map(([x, y, label], index) => {
      const isHub = label === 'JP';
      return (
        <g key={`${label}-${index}`} filter="url(#nexus-node-glow)">
          <motion.circle
            cx={x as number}
            cy={y as number}
            r={isHub ? 18 : 7}
            fill={isHub ? '#00E5FF' : '#94A3B8'}
            fillOpacity={isHub ? 0.24 : 0.24}
            stroke={isHub ? '#00E5FF' : '#CBD5E1'}
            strokeWidth={isHub ? 2 : 1}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 150, damping: 18 }}
          />
          <motion.text
            x={(x as number) + (isHub ? 27 : 14)}
            y={(y as number) + 4}
            fill={isHub ? '#FFFFFF' : '#CBD5E1'}
            fontSize={isHub ? 15 : 11}
            fontWeight="700"
            letterSpacing="0.16em"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + index * 0.06 }}
          >
            {label as string}
          </motion.text>
        </g>
      );
    })}
  </svg>
);

export const PointerGlow: React.FC<{ className?: string }> = ({ className }) => {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    enabledRef.current = true;
    let raf = 0;

    const handleMove = (event: MouseEvent) => {
      if (!glowRef.current || !enabledRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const parent = glowRef.current?.parentElement;
        const rect = parent?.getBoundingClientRect();
        const x = rect ? event.clientX - rect.left : event.clientX;
        const y = rect ? event.clientY - rect.top : event.clientY;
        glowRef.current?.style.setProperty('transform', `translate3d(${x - 280}px, ${y - 280}px, 0)`);
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      enabledRef.current = false;
      window.removeEventListener('mousemove', handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute left-0 top-0 hidden h-[560px] w-[560px] rounded-full bg-cyber-cyan/10 blur-[90px] will-change-transform lg:block',
        className,
      )}
    />
  );
};

interface MotionSectionProps {
  as?: 'section' | 'div';
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  as = 'section',
  className,
  id,
  children,
}) => {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'show'}
      viewport={{ once: true, margin: '-100px' }}
      variants={motionPresets.section}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      id={id}
    >
      {children}
    </Component>
  );
};

export const GlassPanel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl',
      className,
    )}
    {...props}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    {children}
  </div>
);

export const SectionKicker: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn(
      'mb-4 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-cyber-cyan',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const DataPill: React.FC<React.HTMLAttributes<HTMLDivElement> & { label: string; value: React.ReactNode }> = ({
  label,
  value,
  className,
  ...props
}) => (
  <div className={cn('rounded-xl border border-white/10 bg-white/[0.055] p-3 backdrop-blur-sm', className)} {...props}>
    <p className="technical-label mb-1">{label}</p>
    <p className="text-sm font-extrabold text-white">{value}</p>
  </div>
);

export const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string; className?: string }> = ({
  value,
  suffix = '',
  prefix = '',
  className,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 56;
    const animate = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(value * Math.min(progress, 1)));
      if (frame < totalFrames) window.requestAnimationFrame(animate);
    };
    const raf = window.requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('ja-JP')}
      {suffix}
    </span>
  );
};

export const MatchScoreRing: React.FC<{ score: number; label?: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  score,
  label = 'Match',
  size = 'md',
  className,
}) => {
  const clamped = Math.max(0, Math.min(100, score));
  const circumference = 264;
  const sizeClass = size === 'lg' ? 'h-24 w-24' : size === 'sm' ? 'h-12 w-12' : 'h-16 w-16';
  const labelClass = size === 'sm' ? 'text-[8px]' : 'text-[9px]';
  const valueClass = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-[11px]' : 'text-base';

  return (
    <div className={cn('relative flex shrink-0 items-center justify-center', sizeClass, className)}>
      <svg className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="50%" cy="50%" r="42%" stroke="rgba(148,163,184,0.18)" strokeWidth="8%" fill="transparent" />
        <motion.circle
          cx="50%"
          cy="50%"
          r="42%"
          stroke="#00E5FF"
          strokeWidth="8%"
          fill="transparent"
          strokeDasharray={`${circumference}%`}
          initial={{ strokeDashoffset: `${circumference}%` }}
          whileInView={{ strokeDashoffset: `${circumference - (circumference * clamped) / 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="relative text-center leading-none">
        <p className={cn('font-extrabold text-white', valueClass)}>{clamped}</p>
        {size !== 'sm' && <p className={cn('mt-1 font-bold uppercase tracking-[0.16em] text-cyber-cyan', labelClass)}>{label}</p>}
      </div>
    </div>
  );
};

export const ProcurementGauge: React.FC<{ value: number; label: string; className?: string }> = ({ value, label, className }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('relative flex items-end justify-center', className)}>
      <svg viewBox="0 0 180 98" className="h-28 w-48 overflow-visible">
        <path d="M 20 88 A 70 70 0 0 1 160 88" fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="14" strokeLinecap="round" />
        <motion.path
          d="M 20 88 A 70 70 0 0 1 160 88"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: clamped / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute bottom-0 text-center">
        <p className="text-3xl font-extrabold text-white">{clamped}</p>
        <p className="technical-label text-cyber-cyan">{label}</p>
      </div>
    </div>
  );
};
