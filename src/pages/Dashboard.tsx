import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { dashboardData } from '../data/dashboardData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Activity, Users, Map, Cpu, TrendingUp, Radar as RadarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../components/ui/Badge';
import { BlueprintGridBackground } from '../components/ui/Premium';

const COLORS = ['#2563EB', '#38BDF8', '#10B981', '#F59E0B', '#6366F1', '#8B5CF6'];

export const Dashboard: React.FC = () => {
  // Animated gauge logic
  const [gaugeValue, setGaugeValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setGaugeValue(78), 500);
    return () => clearTimeout(timer);
  }, []);

  const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [value]);
    return <span>{prefix}{count}{suffix}</span>;
  };

  const chartCardClass = "h-full border-white/10 bg-white/[0.065] text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl";
  const chartHeaderClass = "border-b border-white/10 bg-white/[0.045]";

  return (
    <div className="relative flex-1 overflow-hidden bg-ink-950 p-4 pt-28 sm:p-6 sm:pt-28 lg:p-8 lg:pt-28 min-h-[calc(100vh-64px)] pb-20">
      <BlueprintGridBackground dense className="opacity-45" />
      <div className="relative z-10 mx-auto max-w-[1600px]">
        
        <div className="mb-6 sm:mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-6 text-white shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyber-cyan">
              <RadarIcon size={14} /> Executive Robotics Cockpit
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Market Intelligence</h1>
            <p className="text-platinum-300 text-sm sm:text-base mt-3 max-w-2xl">Live analytics, deployment trends, support coverage, and procurement signals for the Japanese robotics market.</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status-success"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">Data Sync: Live</span>
          </motion.div>
          </div>
        </div>

        {/* Animated KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {[
            { title: 'Total Active Robots', value: 420, icon: Cpu, iconClass: 'text-brand-600', iconBg: 'bg-brand-600/10', change: '+12% this month' },
            { title: 'Verified Vendors', value: 120, icon: Users, iconClass: 'text-status-success', iconBg: 'bg-status-success/10', change: '+3 this week' },
            { title: 'Global Regions', value: 38, icon: Map, iconClass: 'text-cyber-cyan', iconBg: 'bg-cyber-cyan/10', change: 'Stable' },
            { title: 'Monthly Inquiries', value: 446, icon: Activity, iconClass: 'text-cyber-indigo', iconBg: 'bg-cyber-indigo/10', change: '+24% this month' }
          ].map((kpi, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="shadow-[0_18px_55px_rgba(0,0,0,0.22)] border-white/10 overflow-hidden relative group h-full bg-white/[0.075] text-white backdrop-blur-xl">
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-transform duration-500 group-hover:scale-110 ${kpi.iconClass}`}>
                  <kpi.icon size={100} />
                </div>
                <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className={`p-2.5 ${kpi.iconBg} ${kpi.iconClass} rounded-lg inline-flex mb-3 sm:mb-4 shadow-sm`}>
                      <kpi.icon size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-wider mb-1 line-clamp-1">{kpi.title}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2">
                      <AnimatedCounter value={kpi.value} />
                    </h3>
                    <p className="text-[10px] sm:text-xs font-semibold text-status-success flex items-center gap-1"><TrendingUp size={12} /> {kpi.change}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Gauge Widget */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <Card className={`${chartCardClass} flex flex-col items-center justify-center p-6 text-center group hover:border-cyber-cyan/40 transition-colors`}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Japan Automation Opportunity Index</h3>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-180">
                  <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.10)" strokeWidth="10%" fill="transparent" strokeDasharray="141% 141%" strokeLinecap="round" />
                  <motion.circle 
                    cx="50%" cy="50%" r="45%" 
                    stroke="#38BDF8" strokeWidth="10%" fill="transparent" 
                    strokeDasharray="141% 141%" 
                    initial={{ strokeDashoffset: "141%" }}
                    animate={{ strokeDashoffset: `${141 - (141 * gaugeValue) / 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center mt-6">
                  <p className="text-4xl font-extrabold text-white">{gaugeValue}</p>
                  <p className="text-[10px] font-bold text-white/45 uppercase">Out of 100</p>
                </div>
              </div>
              <p className="text-xs text-platinum-300 mt-4 max-w-xs">Score indicates high readiness for warehouse robotic expansion in Q3 2026.</p>
            </Card>
          </motion.div>

          {/* Line Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2">
            <Card className={`${chartCardClass} group hover:border-cyber-cyan/40 transition-colors`}>
              <CardHeader className={`${chartHeaderClass} pb-4`}>
                <CardTitle className="text-sm sm:text-base font-bold flex justify-between items-center text-white">
                  Deployment Demand Trend
                  <Badge variant="outline" className="bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/25">+24% MoM</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 sm:h-80 pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.deploymentTrend} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.10)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: '#0B1120', color: '#fff', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.4)', padding: '12px' }} 
                      itemStyle={{ fontWeight: 'bold' }}
                      cursor={{ stroke: 'rgba(56,189,248,0.28)', strokeWidth: 2 }}
                    />
                    <Line type="monotone" dataKey="requests" stroke="#38BDF8" strokeWidth={4} dot={{ r: 4, fill: '#0B1120', stroke: '#38BDF8', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#38BDF8', stroke: '#0B1120', strokeWidth: 3 }} animationDuration={2000} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Radar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className={`${chartCardClass} group hover:border-cyber-cyan/40 transition-colors`}>
              <CardHeader className={chartHeaderClass}>
                <CardTitle className="text-sm sm:text-base font-bold text-white">Industry Fitment</CardTitle>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center pt-6 pb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={dashboardData.industryFitScores}>
                    <PolarGrid stroke="rgba(255,255,255,0.12)" />
                    <PolarAngleAxis dataKey="industry" tick={{ fill: '#CBD5E1', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="AMR" dataKey="AMR" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} animationDuration={1500} />
                    <Radar name="Arm" dataKey="Arm" stroke="#10B981" fill="#10B981" fillOpacity={0.3} animationDuration={1500} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: '#0B1120', color: '#fff', boxShadow: '0 4px 20px rgb(0 0 0 / 0.35)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card className={`${chartCardClass} group hover:border-cyber-cyan/40 transition-colors`}>
              <CardHeader className={chartHeaderClass}>
                <CardTitle className="text-sm sm:text-base font-bold text-white">Global Origin</CardTitle>
              </CardHeader>
              <CardContent className="h-72 pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.manufacturerRegions}
                      cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5}
                      dataKey="value" stroke="none" animationDuration={1500}
                    >
                      {dashboardData.manufacturerRegions.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: '#0B1120', color: '#fff', boxShadow: '0 10px 25px rgb(0 0 0 / 0.35)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600, color: '#CBD5E1' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Executive Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="h-full shadow-xl border-white/10 bg-[#0B1120] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/20 rounded-full blur-[50px] -z-10 group-hover:bg-brand-500/30 transition-colors duration-500" />
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-sm sm:text-base font-bold flex items-center gap-2"><Activity size={16} className="text-brand-400" /> Executive Insights</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm cursor-default">
                  <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider mb-1">Surging Demand</p>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-surface-light">Logistics AMRs have seen a 24% MoM increase in procurement inquiries, driven by Q3 warehouse expansions.</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm cursor-default">
                  <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider mb-1">Japan SLA Coverage</p>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-surface-light">72% of European manufacturers now offer verified local support SLAs through tier-1 Japanese deployment partners.</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
