import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Robot } from '../../data/robots';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSavedRobots } from '../../contexts/SavedRobotsContext';
import { useCompare } from '../../contexts/CompareContext';
import {
  ArrowRight,
  BadgeCheck,
  BarChart2,
  BookmarkCheck,
  BookmarkPlus,
  CalendarClock,
  Factory,
  Gauge,
  Handshake,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MatchScoreRing } from '../ui/Premium';

interface RobotCardProps {
  robot: Robot;
  view?: 'grid' | 'list';
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(price);

const readinessLabel = (robot: Robot) => {
  if (robot.integrationTypes.includes('API') && robot.japanSupport) return 'High';
  if (robot.integrationTypes.includes('API') || robot.japanSupport) return 'Moderate';
  return 'Specialist review';
};

export const RobotCard: React.FC<RobotCardProps> = ({ robot, view = 'grid' }) => {
  const navigate = useNavigate();
  const { isSaved, toggleSaveRobot } = useSavedRobots();
  const { isCompared, addToCompare, removeFromCompare } = useCompare();

  const saved = isSaved(robot.id);
  const compared = isCompared(robot.id);
  const score = robot.matchScore || 85;

  const handleCompareClick = () => {
    if (compared) {
      removeFromCompare(robot.id);
      toast('Removed from comparison');
      return;
    }

    const added = addToCompare(robot);
    if (added) toast.success('Added to comparison matrix');
    else toast.error('Comparison matrix is full or already includes this robot');
  };

  const handleSaveClick = () => {
    toggleSaveRobot(robot);
    toast.success(saved ? 'Removed from shortlist' : 'Saved to shortlist');
  };

  const requestIntro = () => navigate(`/inquiry?robotId=${robot.id}`);

  const CertBadges = () => (
    <div className="flex flex-wrap gap-1.5">
      {robot.certifications.slice(0, 3).map((cert) => (
        <span
          key={cert}
          className="rounded-md border border-white/10 bg-white/[0.055] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/68"
        >
          {cert}
        </span>
      ))}
    </div>
  );

  if (view === 'list') {
    return (
      <motion.article
        layout
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="group/card overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-white shadow-[0_18px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-colors hover:border-cyber-cyan/45"
      >
        <div className="grid gap-0 md:grid-cols-[220px_1fr_auto]">
          <Link to={`/robot/${robot.id}`} data-cursor="VIEW" className="relative block min-h-[210px] overflow-hidden bg-ink-800 md:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-indigo/16 opacity-0 transition-opacity group-hover/card:opacity-100" />
            <img
              src={robot.image}
              alt={robot.name}
              className="h-full min-h-[210px] w-full object-cover opacity-70 grayscale transition-all duration-500 group-hover/card:scale-105 group-hover/card:opacity-100 group-hover/card:grayscale-0"
            />
            <div className="absolute left-3 top-3">
              <Badge variant={robot.japanSupport ? 'success' : 'warning'}>{robot.japanSupport ? 'Japan SLA' : 'Remote Support'}</Badge>
            </div>
          </Link>

          <div className="p-5 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyber-cyan">
                  <Factory size={13} /> {robot.manufacturer}
                </p>
                <Link to={`/robot/${robot.id}`} data-cursor="VIEW">
                  <h3 className="text-2xl font-black leading-tight tracking-tight text-white transition-colors group-hover/card:text-cyber-cyan">
                    {robot.name}
                  </h3>
                </Link>
                <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-white/52">
                  <MapPin size={14} /> {robot.manufacturerCountry} / {robot.category}
                </p>
              </div>
              <MatchScoreRing score={score} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ['Payload', `${robot.payloadKg}kg`, PackageCheck],
                ['Deploy', `${robot.deploymentWeeks} wks`, CalendarClock],
                ['Price from', formatPrice(robot.priceMinJPY), Gauge],
                ['Integration', readinessLabel(robot), Zap],
              ].map(([label, value, Icon]) => (
                <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
                  {React.createElement(Icon as typeof Zap, { size: 15, className: 'mb-2 text-cyber-cyan' })}
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/38">{label as string}</p>
                  <p className="mt-1 truncate text-sm font-black text-white">{value as string}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 min-h-[64px] rounded-xl border border-white/10 bg-white/[0.035] p-3">
              <p className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-cyber-cyan">Why this fits</p>
              <p className="line-clamp-2 text-xs font-semibold leading-5 text-white/62">
                {robot.bestFor} {robot.strengths[0]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 p-5 md:w-[190px] md:border-l md:border-t-0">
            <CertBadges />
            <div className="mt-auto grid grid-cols-2 gap-2 md:grid-cols-1">
              <Button size="sm" className="gap-2" onClick={() => navigate(`/robot/${robot.id}`)} data-cursor="VIEW">
                View <ArrowRight size={15} />
              </Button>
              <Button size="sm" variant={compared ? 'primary' : 'secondary'} onClick={handleCompareClick} data-cursor="COMPARE">
                <BarChart2 size={15} className="mr-1.5" /> {compared ? 'Added' : 'Compare'}
              </Button>
              <Button size="sm" variant={saved ? 'primary' : 'secondary'} onClick={handleSaveClick} data-cursor="SAVE">
                {saved ? <BookmarkCheck size={15} className="mr-1.5" /> : <BookmarkPlus size={15} className="mr-1.5" />}
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button size="sm" variant="outline" className="bg-white text-ink-950 hover:text-ink-950" onClick={requestIntro} data-cursor="START">
                <Handshake size={15} className="mr-1.5" /> Intro
              </Button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      whileHover={{ y: -7 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-colors hover:border-cyber-cyan/45"
    >
      <Link to={`/robot/${robot.id}`} data-cursor="VIEW" className="relative block h-52 overflow-hidden bg-ink-800">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
        <img
          src={robot.image}
          alt={robot.name}
          className="h-full w-full object-cover opacity-74 grayscale transition-all duration-500 group-hover/card:scale-105 group-hover/card:opacity-100 group-hover/card:grayscale-0"
        />
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          <Badge variant={robot.japanSupport ? 'success' : 'warning'} className="text-[9px]">
            {robot.japanSupport ? 'Japan Support' : 'Partner Needed'}
          </Badge>
        </div>
        <div className="absolute right-3 top-3 z-20 rounded-full border border-white/10 bg-ink-950/72 p-1 backdrop-blur-md">
          <MatchScoreRing score={score} size="sm" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyber-cyan">{robot.category}</p>
          <h3 className="mt-1 line-clamp-2 text-xl font-black leading-tight tracking-tight text-white">{robot.name}</h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/46">
              <Factory size={12} /> {robot.manufacturer}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-white/56">
              <MapPin size={13} /> {robot.manufacturerCountry}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/38">From</p>
            <p className="text-base font-black text-white">{formatPrice(robot.priceMinJPY)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            ['Payload', `${robot.payloadKg} kg`],
            ['Deployment', `${robot.deploymentWeeks} wks`],
            ['Support', robot.japanSupport ? 'Japan SLA' : 'Remote'],
            ['Integration', readinessLabel(robot)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/36">{label}</p>
              <p className="mt-1 truncate text-sm font-black text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 min-h-[88px] rounded-xl border border-white/10 bg-white/[0.035] p-3 transition-colors group-hover/card:bg-cyber-cyan/[0.055]">
          <div className="mb-2 flex items-center gap-2">
            <BadgeCheck size={14} className="text-cyber-cyan" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyber-cyan">Why this fits</p>
          </div>
          <p className="line-clamp-2 text-xs font-semibold leading-5 text-white/62">{robot.bestFor}</p>
        </div>

        <div className="mt-4">
          <CertBadges />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
          <Button size="sm" variant={compared ? 'primary' : 'secondary'} onClick={handleCompareClick} data-cursor="COMPARE" aria-label={`Compare ${robot.name}`}>
            <BarChart2 size={15} className="mr-1.5" />
            Compare
          </Button>
          <Button size="sm" variant={saved ? 'primary' : 'secondary'} onClick={handleSaveClick} data-cursor="SAVE" aria-label={`Save ${robot.name}`}>
            {saved ? <BookmarkCheck size={15} className="mr-1.5" /> : <BookmarkPlus size={15} className="mr-1.5" />}
            {saved ? 'Saved' : 'Save'}
          </Button>
          <Button size="sm" variant="outline" className="bg-white text-ink-950 hover:text-ink-950" onClick={() => navigate(`/robot/${robot.id}`)} data-cursor="VIEW">
            View
          </Button>
          <Button size="sm" variant="outline" className="bg-white text-ink-950 hover:text-ink-950" onClick={requestIntro} data-cursor="START">
            <ShieldCheck size={15} className="mr-1.5" /> Intro
          </Button>
        </div>
      </div>
    </motion.article>
  );
};
