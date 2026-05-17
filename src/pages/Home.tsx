import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Factory,
  GitBranch,
  Globe2,
  Layers3,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Warehouse,
  Zap,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockRobots } from '../data/robots';
import { RobotCard } from '../components/robot/RobotCard';
import {
  AnimatedCounter,
  BlueprintGridBackground,
  DataPill,
  GlassPanel,
  MotionSection,
  NetworkNodes,
  PointerGlow,
  SectionKicker,
} from '../components/ui/Premium';
import { cn } from '../utils/cn';

const placeholders = [
  'Find AMRs for 600kg warehouse transport',
  'Compare palletizing robots with Japan support',
  'Search inspection robots for manufacturing lines',
  'Match robots by payload, price, and deployment time',
];

const trustChips = [
  'Verified Manufacturers',
  'Japan Support Visibility',
  'Procurement Intelligence',
  'Global Robotics Network',
  'Deployment-Ready Data',
  'Vector Search Roadmap',
];

const industries = [
  {
    name: 'Logistics',
    icon: Activity,
    pain: 'Labor volatility, route congestion, and fast fulfillment SLAs.',
    robots: 'AMRs, sorting fleets, pallet transport',
    count: 124,
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    pain: 'Quality consistency, machine tending, and line-side movement.',
    robots: 'Cobots, inspection cells, palletizers',
    count: 185,
  },
  {
    name: 'Retail',
    icon: ShoppingCart,
    pain: 'Inventory accuracy and repetitive public-floor operations.',
    robots: 'Shelf scanners, cleaning AMRs, service robots',
    count: 56,
  },
  {
    name: 'Warehousing',
    icon: Warehouse,
    pain: 'Picking density, rack movement, and peak-season throughput.',
    robots: 'Goods-to-person AMRs, sortation, tuggers',
    count: 142,
  },
  {
    name: 'Facility Operations',
    icon: Building2,
    pain: 'Large-footprint cleaning and predictable autonomous coverage.',
    robots: 'Cleaning robots, inspection AMRs, patrol systems',
    count: 48,
  },
];

const workflow = [
  'Define challenge',
  'Match robot categories',
  'Compare solutions',
  'Request introduction',
  'Plan deployment',
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const fullText = placeholders[currentIdx];
      setPlaceholderText(fullText.slice(0, charIdx + (isDeleting ? -1 : 1)));
      charIdx += isDeleting ? -1 : 1;

      let speed = isDeleting ? 28 : 48;
      if (!isDeleting && charIdx === fullText.length) {
        speed = 1600;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % placeholders.length;
        speed = 360;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 550);
    return () => clearTimeout(timer);
  }, []);

  const featuredRobots = useMemo(() => mockRobots.slice(0, 4), []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    navigate(trimmed ? `/marketplace?q=${encodeURIComponent(trimmed)}` : '/marketplace');
  };

  return (
    <div className="w-full overflow-x-hidden bg-platinum-100">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8">
        <BlueprintGridBackground dense />
        <PointerGlow />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-platinum-100 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-cyber-cyan"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-cyan" />
              </span>
              Japan Automation Hub Online
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.08 }}
              className="max-w-[22rem] break-words text-balance text-[2.35rem] font-black leading-[1.04] tracking-tight text-white sm:max-w-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Global Robotics Intelligence for Japan's Automation Future
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.16 }}
              className="mt-6 max-w-[22rem] text-pretty text-base leading-8 text-platinum-300 sm:max-w-2xl sm:text-lg"
            >
              Discover, compare, and connect with verified global robotics manufacturers through structured data,
              deployment insight, and intelligent matching.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.24 }}
              className={cn(
                'mt-8 max-w-[22rem] rounded-2xl border bg-white/[0.065] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 sm:max-w-3xl',
                isFocused ? 'border-cyber-cyan/60 bg-white/[0.09]' : 'border-white/10',
              )}
            >
              <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2 transition-colors',
                      isFocused ? 'text-cyber-cyan' : 'text-white/42',
                    )}
                    size={20}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? 'Type a payload, task, environment, or manufacturer...' : placeholderText}
                    className="h-14 w-full rounded-xl bg-transparent px-12 text-sm font-semibold text-white placeholder:text-white/40 focus:outline-none sm:text-base"
                    aria-label="Search robotics database"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 shrink-0 gap-2" data-cursor="MATCH">
                  Analyze <ArrowRight size={18} />
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-6 flex max-w-[22rem] flex-wrap gap-2 sm:max-w-3xl"
            >
              {trustChips.map((chip, index) => (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 + index * 0.035 }}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/66 backdrop-blur-sm"
                >
                  {chip}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-8 flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row"
            >
              <Button size="lg" className="gap-2" onClick={() => navigate('/matching')} data-cursor="START">
                Start Robot Matching <Sparkles size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/14 bg-white/[0.045] text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate('/marketplace')}
                data-cursor="VIEW"
              >
                Explore Marketplace
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[540px]"
          >
            <NetworkNodes className="opacity-90" />
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 shadow-[0_0_80px_rgba(0,229,255,0.22)] backdrop-blur-xl sm:h-44 sm:w-44"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-4 rounded-full border border-dashed border-white/15" />
              <Bot className="h-12 w-12 text-white sm:h-16 sm:w-16" />
            </motion.div>

            <GlassPanel className="absolute left-0 top-8 w-[230px] p-4">
              <p className="technical-label mb-2 text-cyber-cyan">Live Query</p>
              <p className="text-sm font-bold leading-5 text-white">600kg transport, WMS integration, Japan SLA</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyber-cyan to-status-success"
                  initial={{ width: '12%' }}
                  animate={{ width: ['28%', '82%', '54%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </GlassPanel>

            <GlassPanel className="absolute bottom-12 right-0 w-[250px] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="technical-label text-cyber-cyan">Procurement Fit</p>
                <span className="rounded-full bg-status-success/15 px-2 py-1 text-[10px] font-black text-status-success">94%</span>
              </div>
              <div className="space-y-2">
                {['Japan support verified', '4 week deployment', 'ISO 3691-4'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-semibold text-white/72">
                    <CheckCircle2 size={14} className="text-status-success" /> {item}
                  </div>
                ))}
              </div>
            </GlassPanel>

            <div className="absolute bottom-0 left-8 hidden grid-cols-3 gap-2 sm:grid">
              <DataPill label="Payload" value="1000kg" />
              <DataPill label="Regions" value="38" />
              <DataPill label="SLA" value="JP" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 rounded-2xl border border-white bg-white/90 p-3 shadow-[0_24px_80px_rgba(2,6,23,0.12)] backdrop-blur-xl sm:grid-cols-4 sm:gap-4">
          {[
            ['420+', 420, 'Active robotics solutions'],
            ['38', 38, 'Manufacturing countries'],
            ['120+', 120, 'Verified manufacturers'],
            ['100%', 100, 'Japan support visibility'],
          ].map(([display, value, label]) => (
            <div key={label as string} className="rounded-xl border border-platinum-200 bg-platinum-50 p-4 text-center">
              <p className="text-3xl font-black text-ink-950 sm:text-4xl">
                <AnimatedCounter value={value as number} suffix={(display as string).includes('+') ? '+' : (display as string).includes('%') ? '%' : ''} />
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-surface-muted">{label as string}</p>
            </div>
          ))}
        </div>
      </section>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <SectionKicker className="border-ink-950/10 bg-ink-950/5 text-ink-800">Industry Challenge</SectionKicker>
            <h2 className="text-balance text-4xl font-black tracking-tight text-ink-950 sm:text-5xl">
              Procurement starts with operational friction, not product browsing.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={industry.name}
                  to={`/marketplace?industry=${encodeURIComponent(industry.name)}`}
                  data-cursor="VIEW"
                  className="group rounded-2xl focus-visible:ring-cyber-cyan"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ y: -6 }}
                    className="flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-platinum-200 bg-white p-5 shadow-[0_18px_55px_rgba(2,6,23,0.07)]"
                  >
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-cyber-cyan">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-xl font-black text-ink-950">{industry.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-surface-muted">{industry.pain}</p>
                    </div>
                    <div className="mt-6 border-t border-platinum-200 pt-4">
                      <p className="technical-label mb-2">Recommended categories</p>
                      <p className="text-sm font-bold leading-6 text-ink-800">{industry.robots}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-[0.16em] text-cyber-indigo">{industry.count} solutions</span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-platinum-100 text-ink-950 transition-colors group-hover:bg-ink-950 group-hover:text-white">
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-ink-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <BlueprintGridBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionKicker>Intelligent Matching</SectionKicker>
            <h2 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">
              A guided diagnostic engine for robotics fit, risk, and deployment readiness.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-platinum-300">
              Nexus turns unstructured facility needs into a ranked shortlist with payload, environment, Japan support,
              integration type, and readiness constraints visible from the first interaction.
            </p>
            <Button className="mt-8 gap-2" size="lg" onClick={() => navigate('/matching')} data-cursor="MATCH">
              Run Matching Engine <ArrowRight size={18} />
            </Button>
          </div>

          <GlassPanel className="p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="technical-label text-cyber-cyan">Live Intelligence Console</p>
                <h3 className="mt-1 text-2xl font-black">Constraint parsing</h3>
              </div>
              <Cpu className="text-cyber-cyan" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Payload', '600kg+ warehouse transport', Zap],
                ['Environment', 'Indoor high-traffic floor', Layers3],
                ['Integration', 'WMS / ERP visibility', GitBranch],
                ['Support', 'Japan SLA required', ShieldCheck],
              ].map(([label, value, Icon]) => (
                <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                  {React.createElement(Icon as typeof Zap, { size: 18, className: 'text-cyber-cyan mb-3' })}
                  <p className="technical-label mb-1">{label as string}</p>
                  <p className="text-sm font-bold text-white">{value as string}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionKicker className="border-ink-950/10 bg-ink-950/5 text-ink-800">Featured Intelligence</SectionKicker>
              <h2 className="text-balance text-4xl font-black tracking-tight text-ink-950 sm:text-5xl">
                Technical procurement cards, not ecommerce tiles.
              </h2>
            </div>
            <Button variant="outline" size="lg" className="w-full gap-2 md:w-auto" onClick={() => navigate('/marketplace')} data-cursor="VIEW">
              View Full Registry <ArrowRight size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredRobots.map((robot, index) => (
              <motion.div
                key={robot.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <RobotCard robot={robot} view="grid" />
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionKicker className="border-ink-950/10 bg-ink-950/5 text-ink-800">Manufacturer Network</SectionKicker>
            <h2 className="text-balance text-4xl font-black tracking-tight text-ink-950 sm:text-5xl">
              Global manufacturers mapped to Japan readiness.
            </h2>
            <p className="mt-5 text-base leading-8 text-surface-muted">
              The network view prioritizes verification, support visibility, certifications, and deployment history so
              teams can move from curiosity to qualified introduction.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Europe', '45%', 'Heavy AMRs and industrial palletizing'],
              ['Asia', '35%', 'High-speed sorting and facility automation'],
              ['North America', '20%', 'Retail intelligence and collaborative systems'],
              ['Japan SLA', '72%', 'Profiles with local support visibility'],
            ].map(([region, value, text]) => (
              <div key={region} className="rounded-2xl border border-platinum-200 bg-platinum-50 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <Globe2 className="text-cyber-indigo" />
                  <p className="text-3xl font-black text-ink-950">{value}</p>
                </div>
                <h3 className="font-black text-ink-950">{region}</h3>
                <p className="mt-2 text-sm leading-6 text-surface-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <SectionKicker className="border-ink-950/10 bg-ink-950/5 text-ink-800">Procurement Workflow</SectionKicker>
            <h2 className="text-balance text-4xl font-black tracking-tight text-ink-950 sm:text-5xl">
              From operational need to manufacturer introduction.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-5">
            {workflow.map((step, index) => (
              <motion.div
                key={step}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl border border-platinum-200 bg-white p-6 shadow-[0_16px_45px_rgba(2,6,23,0.06)]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-4xl font-black text-ink-950/10">0{index + 1}</span>
                  {index < workflow.length - 1 ? <ArrowRight className="hidden text-cyber-indigo lg:block" /> : <CheckCircle2 className="text-status-success" />}
                </div>
                <h3 className="text-lg font-black text-ink-950">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-surface-muted">
                  {index === 0 && 'Capture payload, floor, staffing, safety, and budget context.'}
                  {index === 1 && 'Translate constraints into compatible robot categories and use cases.'}
                  {index === 2 && 'Evaluate readiness, risk, price range, support, and integration fit.'}
                  {index === 3 && 'Route the opportunity to verified manufacturer or local partner.'}
                  {index === 4 && 'Move toward pilot planning with a shared technical baseline.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      <section className="relative overflow-hidden bg-ink-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <BlueprintGridBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionKicker>Enterprise Trust</SectionKicker>
            <h2 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">
              Built for teams that need confidence before they contact a manufacturer.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-platinum-300">
              Standardized specs, visible Japan support, procurement scoring, and workflow-first tools keep the
              experience serious without making it slow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button size="lg" className="gap-2" onClick={() => navigate('/inquiry')} data-cursor="START">
              Request Introduction <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/14 bg-white/[0.045] text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigate('/resources')}
              data-cursor="PREVIEW"
            >
              Preview Resources
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
