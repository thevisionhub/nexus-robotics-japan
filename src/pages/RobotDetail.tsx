import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowLeft,
  BarChart2,
  Battery,
  BookmarkCheck,
  BookmarkPlus,
  Bot,
  CalendarClock,
  ChevronDown,
  Cpu,
  Factory,
  FileText,
  Gauge,
  GitBranch,
  Globe2,
  Handshake,
  Layers3,
  MapPin,
  PackageCheck,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { mockRobots } from '../data/robots';
import { mockManufacturers } from '../data/manufacturers';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCompare } from '../contexts/CompareContext';
import { useSavedRobots } from '../contexts/SavedRobotsContext';
import { cn } from '../utils/cn';
import {
  BlueprintGridBackground,
  MatchScoreRing,
  MotionSection,
  ProcurementGauge,
  SectionKicker,
} from '../components/ui/Premium';
import { RobotCard } from '../components/robot/RobotCard';

type TabId = 'overview' | 'specs' | 'capabilities' | 'deployment' | 'risks' | 'manufacturer';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(price);

const readiness = (score: number) => (score >= 92 ? 96 : score >= 86 ? 88 : 78);

export const RobotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedRisk, setExpandedRisk] = useState(0);

  const { isSaved, toggleSaveRobot } = useSavedRobots();
  const { isCompared, addToCompare, removeFromCompare } = useCompare();

  const robot = mockRobots.find((item) => item.id === id);
  const manufacturer = robot ? mockManufacturers.find((item) => item.id === robot.manufacturerId) : undefined;

  const relatedRobots = useMemo(
    () => (robot ? mockRobots.filter((item) => item.category === robot.category && item.id !== robot.id).slice(0, 3) : []),
    [robot],
  );

  if (!robot) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-ink-950 p-4 text-white">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-black">Robot Data Not Found</h1>
          <p className="mt-3 text-platinum-300">The requested technical profile could not be located in the registry.</p>
          <Button onClick={() => navigate('/marketplace')} className="mt-8">
            Return to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const saved = isSaved(robot.id);
  const compared = isCompared(robot.id);
  const score = robot.matchScore || 85;
  const readinessScore = readiness(score);

  const handleSave = () => {
    toggleSaveRobot(robot);
    toast.success(saved ? 'Removed from shortlist' : 'Saved to shortlist');
  };

  const handleCompare = () => {
    if (compared) {
      removeFromCompare(robot.id);
      toast('Removed from comparison');
      return;
    }
    const added = addToCompare(robot);
    if (added) toast.success('Added to comparison matrix');
    else toast.error('Comparison matrix is full or already includes this robot');
  };

  const tabs: { id: TabId; label: string; icon: typeof Activity }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'specs', label: 'Technical Specs', icon: Cpu },
    { id: 'capabilities', label: 'Capabilities', icon: Radar },
    { id: 'deployment', label: 'Deployment', icon: CalendarClock },
    { id: 'risks', label: 'Integration & Risks', icon: ShieldAlert },
    { id: 'manufacturer', label: 'Manufacturer', icon: Factory },
  ];

  const snapshot = [
    { label: 'Best for', value: robot.bestFor, icon: Sparkles },
    { label: 'Payload', value: `${robot.payloadKg} kg`, icon: PackageCheck },
    { label: 'Speed', value: robot.maxSpeed, icon: Zap },
    { label: 'Battery', value: `${robot.batteryLifeHours} hrs`, icon: Battery },
    { label: 'Deployment', value: `${robot.deploymentWeeks} weeks`, icon: CalendarClock },
    { label: 'Price range', value: `${formatPrice(robot.priceMinJPY)} - ${formatPrice(robot.priceMaxJPY)}`, icon: Gauge },
    { label: 'Pricing model', value: robot.priceModel || 'Manufacturer quote required', icon: FileText },
    { label: 'ROI baseline', value: robot.roiMonths ? `${robot.roiMonths} months` : 'Pilot dependent', icon: Activity },
    { label: 'Japan support', value: robot.japanSupport ? 'Local SLA visible' : 'Partner review needed', icon: ShieldCheck },
    { label: 'Japan regions', value: robot.japanRegions?.join(', ') || 'Support path under review', icon: MapPin },
    { label: 'Certifications', value: robot.certifications.join(', '), icon: FileText },
    { label: 'Integration', value: robot.integrationTypes.join(', '), icon: GitBranch },
    { label: 'Risk level', value: robot.limitations.length > 1 ? 'Managed review' : 'Low friction', icon: ShieldAlert },
  ];

  const industryFit = robot.industries.map((industry, index) => ({
    industry,
    score: Math.max(70, score - index * 6),
  }));

  const riskCards = [
    {
      title: 'Integration complexity',
      level: robot.integrationTypes.includes('API') ? 'Medium-low' : 'Specialist',
      text: `${robot.name} supports ${robot.integrationTypes.join(', ')}. Facility systems should be mapped before pilot planning.`,
    },
    {
      title: 'Facility readiness',
      level: robot.operatingEnvironment,
      text: robot.facilityRequirements?.join(', ') || robot.limitations[0] || 'Confirm floor quality, obstacle density, and safety zoning before deployment.',
    },
    {
      title: 'Training requirement',
      level: robot.navigationType.includes('SLAM') ? 'Operator onboarding' : 'Integrator-led',
      text: 'Nexus recommends a short operator enablement plan and post-pilot KPI review for production handoff.',
    },
    {
      title: 'Support notes',
      level: robot.japanSupport ? 'Japan visible' : 'Remote first',
      text: robot.supportTier || manufacturer?.supportDetails || 'Support path requires manufacturer confirmation.',
    },
  ];

  return (
    <div className="flex-1 overflow-x-hidden bg-platinum-100 pb-32 lg:pb-20">
      <section className="relative overflow-hidden bg-ink-950 px-4 pb-28 pt-24 text-white sm:px-6 lg:px-8 lg:pb-32">
        <BlueprintGridBackground dense />
        <div className="relative z-10 mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} className="mr-2" /> Registry
          </button>

          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/60 to-transparent" />
                <img src={robot.image} alt={robot.name} className="relative z-10 h-full w-full object-cover opacity-38 grayscale transition duration-700 hover:scale-105" />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink-950/78 via-transparent to-transparent" />
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyber-cyan/25 bg-ink-950/45 shadow-[0_0_70px_rgba(56,189,248,0.20)] backdrop-blur-[2px] sm:h-44 sm:w-44">
                    <div className="absolute inset-4 rounded-[1.5rem] border border-dashed border-white/15" />
                    <Bot className="h-14 w-14 text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.55)] sm:h-20 sm:w-20" />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 z-40 flex flex-wrap items-center gap-2">
                  <Badge variant="navy" className="bg-ink-950/80">{robot.category}</Badge>
                  <Badge variant={robot.japanSupport ? 'success' : 'warning'}>
                    {robot.japanSupport ? 'Japan Support Verified' : 'Japan Partner Review'}
                  </Badge>
                  <Badge variant="outline" className="border-white/15 bg-white/10 text-white/72">
                    {robot.countryCode}
                  </Badge>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
              <SectionKicker>Engineering Decision Dashboard</SectionKicker>
              <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">{robot.name}</h1>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-base font-semibold text-platinum-300">
                <Factory size={18} className="text-cyber-cyan" /> {robot.manufacturer}
                <span className="text-white/24">/</span>
                <MapPin size={18} className="text-cyber-cyan" /> {robot.manufacturerCountry}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-platinum-300">{robot.shortDescription}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-[auto_auto_1fr] sm:items-center">
                <MatchScoreRing score={score} label="Match" size="lg" />
                <ProcurementGauge value={readinessScore} label="Readiness" className="justify-start" />
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <p className="technical-label mb-2 text-cyber-cyan">Procurement position</p>
                  <p className="text-sm font-semibold leading-6 text-white/72">
                    Strong candidate for {robot.industries.join(', ')} with {robot.integrationTypes.join(', ')} integration and
                    {robot.japanSupport ? ' visible Japan support.' : ' support pathway requiring partner validation.'}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" onClick={() => navigate(`/inquiry?robotId=${robot.id}`)} data-cursor="START">
                  Request Introduction <Handshake size={18} />
                </Button>
                <Button
                  size="lg"
                  variant={compared ? 'primary' : 'outline'}
                  className={compared ? '' : 'border-white/14 bg-white/[0.045] text-white hover:bg-white/10 hover:text-white'}
                  onClick={handleCompare}
                  data-cursor="COMPARE"
                >
                  <BarChart2 size={18} className="mr-2" /> {compared ? 'In Compare' : 'Compare'}
                </Button>
                <Button
                  size="lg"
                  variant={saved ? 'primary' : 'outline'}
                  className={saved ? '' : 'border-white/14 bg-white/[0.045] text-white hover:bg-white/10 hover:text-white'}
                  onClick={handleSave}
                  data-cursor="SAVE"
                >
                  {saved ? <BookmarkCheck size={18} className="mr-2" /> : <BookmarkPlus size={18} className="mr-2" />}
                  {saved ? 'Saved' : 'Save'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {snapshot.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.035 }}
                className={cn(
                  'rounded-2xl border border-platinum-200 bg-white p-4 shadow-[0_14px_45px_rgba(2,6,23,0.08)]',
                  index === 0 && 'sm:col-span-2 lg:col-span-2',
                )}
              >
                <Icon size={18} className="mb-3 text-cyber-indigo" />
                <p className="technical-label mb-1">{item.label}</p>
                <p className="line-clamp-2 text-sm font-black leading-6 text-ink-950">{item.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="min-w-0">
            <div className="sticky top-20 z-30 mb-6 overflow-x-auto rounded-2xl border border-platinum-200 bg-white/92 p-1.5 shadow-[0_12px_40px_rgba(2,6,23,0.08)] backdrop-blur-xl hide-scrollbar">
              <div className="flex min-w-max gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'relative flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition-colors',
                        activeTab === tab.id ? 'text-ink-950' : 'text-surface-muted hover:text-ink-950',
                      )}
                    >
                      {activeTab === tab.id && (
                        <motion.span
                          layoutId="robot-detail-tab"
                          className="absolute inset-0 rounded-xl border border-cyber-cyan/20 bg-cyber-cyan/10"
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        />
                      )}
                      <Icon size={15} className="relative z-10" />
                      <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
                  <section className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)] sm:p-8">
                    <h2 className="text-2xl font-black text-ink-950">Executive Summary</h2>
                    <p className="mt-4 text-base leading-8 text-surface-muted">
                      {robot.name} is best suited for {robot.bestFor.toLowerCase()} It combines {robot.navigationType} navigation,
                      {robot.payloadKg}kg payload capacity, and a {robot.deploymentWeeks}-week deployment estimate. Procurement confidence
                      is strongest where teams need {robot.capabilities.slice(0, 2).join(' and ')}.
                    </p>
                  </section>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)] sm:p-8">
                      <h3 className="text-xl font-black text-ink-950">Industry Fit</h3>
                      <div className="mt-6 space-y-4">
                        {industryFit.map((item) => (
                          <div key={item.industry}>
                            <div className="mb-2 flex items-center justify-between text-sm font-bold">
                              <span>{item.industry}</span>
                              <span className="text-cyber-indigo">{item.score}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-platinum-200">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-cyber-indigo to-cyber-cyan"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.score}%` }}
                                viewport={{ once: true }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-3xl border border-ink-900 bg-ink-950 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.24)] sm:p-8">
                      <h3 className="text-xl font-black">Japan Market Fit</h3>
                      <p className="mt-4 text-sm leading-7 text-platinum-300">
                        {manufacturer?.supportDetails || 'Local support details require manufacturer confirmation.'}
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                          <p className="technical-label text-cyber-cyan">SLA visibility</p>
                          <p className="mt-2 text-xl font-black">{robot.japanSupport ? 'Verified' : 'Limited'}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                          <p className="technical-label text-cyber-cyan">Cert coverage</p>
                          <p className="mt-2 text-xl font-black">{robot.certifications.length} docs</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <section className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)] sm:p-8">
                    <h2 className="text-2xl font-black text-ink-950">Engineering Specification Grid</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        ['Category', robot.category],
                        ['Dimensions', robot.dimensions],
                        ['Weight', `${robot.weight} kg`],
                        ['Max payload', `${robot.payloadKg} kg`],
                        ['Max speed', robot.maxSpeed],
                        ['Battery', `${robot.batteryLifeHours} hours`],
                        ['Charging', `${robot.chargingTimeHours} hours`],
                        ['Navigation', robot.navigationType],
                        ['Environment', robot.operatingEnvironment],
                        ['Sensors', robot.sensors.join(', ')],
                        ['Connectivity', robot.connectivity.join(', ')],
                        ['Safety', robot.safetyFeatures.join(', ')],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-platinum-200 bg-platinum-50 p-4">
                          <p className="technical-label mb-2">{label}</p>
                          <p className="text-sm font-black leading-6 text-ink-950">{value}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'capabilities' && (
                <motion.div key="capabilities" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <section className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)] sm:p-8">
                    <h2 className="text-2xl font-black text-ink-950">Capability Matrix</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {robot.capabilities.map((capability, index) => (
                        <motion.div
                          key={capability}
                          whileHover={{ y: -4 }}
                          className="rounded-2xl border border-platinum-200 bg-platinum-50 p-5"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-cyber-cyan">
                              <Layers3 size={20} />
                            </div>
                            <span className="text-sm font-black text-cyber-indigo">{Math.max(84, score - index * 4)}%</span>
                          </div>
                          <h3 className="font-black text-ink-950">{capability}</h3>
                          <p className="mt-2 text-sm leading-6 text-surface-muted">
                            Suitable for procurement teams evaluating {robot.category.toLowerCase()} performance against operational KPIs.
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'deployment' && (
                <motion.div key="deployment" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <section className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)] sm:p-8">
                    <h2 className="text-2xl font-black text-ink-950">Deployment Timeline</h2>
                    <div className="mt-8 space-y-4">
                      {['Requirement review', 'Manufacturer introduction', 'Pilot planning', 'Integration', 'Staff training', 'Production rollout'].map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="grid gap-4 rounded-2xl border border-platinum-200 bg-platinum-50 p-4 sm:grid-cols-[64px_1fr]"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 text-sm font-black text-white">0{index + 1}</div>
                          <div>
                            <h3 className="font-black text-ink-950">{step}</h3>
                            <p className="mt-1 text-sm leading-6 text-surface-muted">
                              {index === 0 && 'Confirm payload, route, safety, and facility constraints.'}
                              {index === 1 && 'Route the opportunity to a verified manufacturer or Japan partner.'}
                              {index === 2 && 'Define pilot KPIs, integration scope, and acceptance criteria.'}
                              {index === 3 && `Connect via ${robot.integrationTypes.join(', ')} and validate operational handoff.`}
                              {index === 4 && 'Train operators, maintenance owners, and floor supervisors.'}
                              {index === 5 && 'Move from pilot to production rollout with procurement documentation.'}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'risks' && (
                <motion.div key="risks" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <section className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)] sm:p-8">
                    <h2 className="text-2xl font-black text-ink-950">Integration & Risk Review</h2>
                    <div className="mt-6 space-y-3">
                      {riskCards.map((risk, index) => (
                        <button
                          type="button"
                          key={risk.title}
                          onClick={() => setExpandedRisk(index)}
                          className="w-full rounded-2xl border border-platinum-200 bg-platinum-50 p-5 text-left transition-colors hover:border-cyber-indigo/40"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="technical-label mb-2">{risk.level}</p>
                              <h3 className="font-black text-ink-950">{risk.title}</h3>
                            </div>
                            <ChevronDown className={cn('shrink-0 text-surface-muted transition-transform', expandedRisk === index && 'rotate-180')} />
                          </div>
                          <AnimatePresence>
                            {expandedRisk === index && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 overflow-hidden text-sm leading-7 text-surface-muted"
                              >
                                {risk.text}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </button>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'manufacturer' && (
                <motion.div key="manufacturer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <section className="overflow-hidden rounded-3xl border border-platinum-200 bg-white shadow-[0_16px_55px_rgba(2,6,23,0.06)]">
                    <div className="bg-ink-950 p-6 text-white sm:p-8">
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                        <Badge variant={manufacturer?.japanSupportAvailable ? 'success' : 'warning'}>
                          {manufacturer?.japanSupportAvailable ? 'Verified Partner' : 'Partner Needed'}
                        </Badge>
                        <Badge variant="outline" className="border-white/15 bg-white/10 text-white/72">
                          {manufacturer?.country || robot.manufacturerCountry}
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-black">{manufacturer?.name || robot.manufacturer}</h2>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-platinum-300">{manufacturer?.overview}</p>
                    </div>
                    <div className="grid gap-0 sm:grid-cols-3">
                      {[
                        ['Founded', manufacturer?.foundedYear || 'N/A'],
                        ['Deployments', `${manufacturer?.globalDeployments || 'N/A'}+`],
                        ['Japan readiness', manufacturer?.japanSupportAvailable ? 'Verified' : 'Limited'],
                      ].map(([label, value]) => (
                        <div key={label} className="border-b border-platinum-200 p-6 sm:border-r sm:last:border-r-0">
                          <p className="technical-label mb-2">{label}</p>
                          <p className="text-2xl font-black text-ink-950">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="font-black text-ink-950">Certifications</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(manufacturer?.certifications || robot.certifications).map((cert) => (
                          <span key={cert} className="rounded-lg border border-platinum-200 bg-platinum-50 px-3 py-2 text-xs font-black text-ink-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <Button className="mt-6 gap-2" onClick={() => navigate('/manufacturers')} data-cursor="OPEN">
                        Open Manufacturer Network <Globe2 size={18} />
                      </Button>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>

            {relatedRobots.length > 0 && (
              <MotionSection className="mt-10">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-2xl font-black text-ink-950">Compare Similar Solutions</h2>
                  <Link to="/marketplace" className="text-xs font-black uppercase tracking-[0.18em] text-cyber-indigo" data-cursor="VIEW">
                    Marketplace
                  </Link>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {relatedRobots.map((item) => (
                    <RobotCard key={item.id} robot={item} view="grid" />
                  ))}
                </div>
              </MotionSection>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="overflow-hidden rounded-3xl border border-ink-900 bg-ink-950 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                <p className="technical-label mb-2 text-cyber-cyan">Procurement estimate</p>
                <p className="text-3xl font-black">{formatPrice(robot.priceMinJPY)}</p>
                <p className="mt-1 text-sm font-semibold text-white/44">to {formatPrice(robot.priceMaxJPY)}</p>
                <div className="mt-6 space-y-2">
                  <Button fullWidth size="lg" onClick={() => navigate(`/inquiry?robotId=${robot.id}`)} data-cursor="START">
                    Request Introduction
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    className="border-white/14 bg-white/[0.045] text-white hover:bg-white/10 hover:text-white"
                    onClick={handleCompare}
                    data-cursor="COMPARE"
                  >
                    Compare Profile
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_16px_55px_rgba(2,6,23,0.06)]">
                <div className="mb-4 flex items-center gap-3">
                  <Wrench className="text-cyber-indigo" />
                  <h3 className="font-black text-ink-950">Deployment Notes</h3>
                </div>
                <p className="text-sm leading-7 text-surface-muted">
                  {robot.deploymentWeeks} week baseline. Confirm site survey, integration owner, and SLA path before production purchase order.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-platinum-200 bg-white/96 p-3 shadow-[0_-14px_40px_rgba(2,6,23,0.14)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <div className="mr-auto">
            <p className="technical-label">From</p>
            <p className="text-sm font-black text-ink-950">{formatPrice(robot.priceMinJPY)}</p>
          </div>
          <Button size="sm" variant="outline" className="h-11 w-11 px-0" onClick={handleSave} aria-label="Save robot" data-cursor="SAVE">
            {saved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
          </Button>
          <Button size="sm" variant="outline" className="h-11 w-11 px-0" onClick={handleCompare} aria-label="Compare robot" data-cursor="COMPARE">
            <BarChart2 size={18} />
          </Button>
          <Button size="sm" className="h-11 px-4" onClick={() => navigate(`/inquiry?robotId=${robot.id}`)} data-cursor="START">
            Intro
          </Button>
        </div>
      </div>
    </div>
  );
};
