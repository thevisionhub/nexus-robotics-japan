import React, { useState } from 'react';
import { useCompare } from '../contexts/CompareContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { X, CheckCircle2, Activity, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export const Compare: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  if (compareList.length === 0) {
    return (
      <div className="flex-1 bg-surface-light min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-surface-gray max-w-lg w-full">
          <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center mx-auto mb-6 text-surface-muted">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-deep mb-4">Comparison Matrix Empty</h1>
          <p className="text-surface-muted mb-8 text-sm sm:text-base leading-relaxed">Add up to 4 robotics solutions from the registry to evaluate their technical specifications side-by-side.</p>
          <Button size="lg" onClick={() => navigate('/marketplace')} className="w-full sm:w-auto shadow-md">
            Browse Registry
          </Button>
        </motion.div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumSignificantDigits: 3 }).format(price);
  };

  const findBestValue = () => {
    if (compareList.length < 2) return null;
    return [...compareList].sort((a, b) => a.priceMinJPY - b.priceMinJPY)[0].id;
  };

  const findFastestDeployment = () => {
    if (compareList.length < 2) return null;
    return [...compareList].sort((a, b) => a.deploymentWeeks - b.deploymentWeeks)[0].id;
  };

  const findBestPayload = () => {
    if (compareList.length < 2) return null;
    return [...compareList].sort((a, b) => b.payloadKg - a.payloadKg)[0].id;
  };

  const findBestJapanSupport = () => {
    if (compareList.length < 2) return null;
    return compareList.find(r => r.japanSupport)?.id || null;
  };

  const bestValueId = findBestValue();
  const fastestId = findFastestDeployment();
  const bestPayloadId = findBestPayload();
  const bestJapanSupportId = findBestJapanSupport();
  const recommendedRobot = [...compareList].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))[0];

  const specs = [
    { key: 'category', label: 'Classification', render: (r: any) => <Badge variant="outline" className="font-bold">{r.category}</Badge> },
    { key: 'price', label: 'Est. Capital Required', render: (r: any) => (
      <div className="flex flex-col items-center sm:items-start">
        <span className="font-extrabold text-navy-deep text-lg">{formatPrice(r.priceMinJPY)}</span>
        {r.id === bestValueId && <span className="text-[10px] text-status-success font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><CheckCircle2 size={12}/> Lowest Cost</span>}
      </div>
    )},
    { key: 'deploymentWeeks', label: 'Implementation Time', render: (r: any) => (
      <div className="flex flex-col items-center sm:items-start">
        <span className="font-bold text-navy-charcoal">{r.deploymentWeeks} weeks</span>
        {r.id === fastestId && <span className="text-[10px] text-brand-600 font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><Activity size={12}/> Fastest Setup</span>}
      </div>
    )},
    { key: 'payloadKg', label: 'Max Payload', render: (r: any) => (
      <div className="flex flex-col items-center sm:items-start">
        <span className="font-bold text-navy-charcoal">{r.payloadKg} kg</span>
        {r.id === bestPayloadId && <span className="text-[10px] text-cyber-indigo font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><CheckCircle2 size={12}/> Best Payload</span>}
      </div>
    )},
    { key: 'batteryLifeHours', label: 'Endurance', render: (r: any) => <span className="font-bold text-navy-charcoal">{r.batteryLifeHours} hrs</span> },
    { key: 'navigationType', label: 'Navigation Tech', render: (r: any) => r.navigationType },
    { key: 'japanSupport', label: 'Japan Support', render: (r: any) => (
      <div className="flex flex-col items-center sm:items-start gap-1">
        {r.japanSupport ? <Badge variant="success" className="text-[10px] sm:text-xs">Local SLA Available</Badge> : <Badge variant="outline" className="text-[10px] sm:text-xs">Standard Support</Badge>}
        {r.id === bestJapanSupportId && <span className="text-[10px] text-status-success font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12}/> Best Japan Support</span>}
      </div>
    )},
  ];

  const hasDifference = (key: string) => {
    if (compareList.length <= 1) return true;
    const firstVal = String(compareList[0][key as keyof typeof compareList[0]]);
    return compareList.some(r => String(r[key as keyof typeof r]) !== firstVal);
  };

  const visibleSpecs = showDifferencesOnly ? specs.filter(s => hasDifference(s.key)) : specs;

  return (
    <div className="flex-1 bg-surface-light min-h-[calc(100vh-64px)] pb-20">
      
      {/* Enterprise Header */}
      <div className="bg-[#0B1120] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="relative mx-auto max-w-[1600px] z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-surface-gray">Comparison Matrix</h1>
            <p className="text-surface-gray text-sm sm:text-base">Evaluating {compareList.length} technical profiles</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-surface-gray cursor-pointer hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <input 
                type="checkbox" 
                checked={showDifferencesOnly} 
                onChange={(e) => setShowDifferencesOnly(e.target.checked)}
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-brand-500 focus:ring-brand-500"
              />
              Show differences only
            </label>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={clearCompare}>
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-ink-950 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.22)] md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyber-cyan">Procurement Recommendation</p>
            <h2 className="mt-2 text-2xl font-extrabold">{recommendedRobot.name}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-surface-gray">
              Highest current readiness score with {recommendedRobot.deploymentWeeks} week deployment baseline and
              {recommendedRobot.japanSupport ? ' verified Japan support.' : ' a support path that should be validated.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {recommendedRobot.id === bestPayloadId && <Badge variant="default">Best Payload</Badge>}
            {recommendedRobot.id === fastestId && <Badge variant="default">Fastest Deployment</Badge>}
            {recommendedRobot.id === bestValueId && <Badge variant="success">Best Budget Fit</Badge>}
            {recommendedRobot.id === bestJapanSupportId && <Badge variant="success">Best Japan Support</Badge>}
          </div>
        </motion.div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-surface-gray overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-light border-b-2 border-surface-gray">
                  <th className="p-6 min-w-[200px] align-bottom bg-surface-light sticky left-0 z-20 border-r border-surface-gray shadow-[4px_0_15px_-5px_rgba(0,0,0,0.05)]">
                    <span className="text-xs font-bold text-surface-muted uppercase tracking-wider block">Technical Parameters</span>
                  </th>
                  <AnimatePresence>
                    {compareList.map((robot) => (
                      <motion.th 
                        layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                        key={`header-${robot.id}`} className="p-6 min-w-[280px] w-[280px] align-top relative border-r border-surface-gray last:border-r-0"
                      >
                        <button onClick={() => removeFromCompare(robot.id)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-surface-gray flex items-center justify-center text-surface-muted hover:text-status-danger hover:border-status-danger transition-colors shadow-sm z-10">
                          <X size={16} />
                        </button>
                        <div className="flex flex-col h-full">
                          <img src={robot.image} alt={robot.name} className="h-32 object-contain mix-blend-multiply mb-4" />
                          <p className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">{robot.manufacturer}</p>
                          <h3 className="text-xl font-bold text-navy-deep mb-4 leading-tight">{robot.name}</h3>
                          <div className="mt-auto">
                            <Button fullWidth onClick={() => navigate(`/robot/${robot.id}`)} className="shadow-sm">View Details</Button>
                          </div>
                        </div>
                      </motion.th>
                    ))}
                  </AnimatePresence>
                  {compareList.length < 4 && (
                    <th className="p-6 min-w-[280px] align-middle text-center bg-surface-light/30 border-r border-surface-gray border-dashed last:border-r-0">
                      <button type="button" onClick={() => navigate('/marketplace')} className="border-2 border-dashed border-surface-gray rounded-xl p-8 flex flex-col items-center justify-center h-full w-full text-surface-muted hover:border-brand-400 hover:text-navy-deep transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4"><Search size={20} /></div>
                        <p className="text-sm font-semibold">Add another solution</p>
                        <p className="text-xs mt-1">({4 - compareList.length} slots remaining)</p>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-gray">
                <AnimatePresence>
                  {visibleSpecs.map((spec) => (
                    <motion.tr 
                      layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, display: "none" }}
                      key={spec.key} className="hover:bg-brand-50/20 transition-colors group"
                    >
                      <td className="p-5 font-semibold text-sm text-surface-muted bg-surface-light sticky left-0 z-10 border-r border-surface-gray shadow-[4px_0_15px_-5px_rgba(0,0,0,0.05)]">
                        {spec.label}
                      </td>
                      {compareList.map(robot => (
                        <td key={`${robot.id}-${spec.key}`} className={cn("p-5 text-sm align-middle border-r border-surface-gray last:border-r-0", (spec.key === 'price' && robot.id === bestValueId) || (spec.key === 'deploymentWeeks' && robot.id === fastestId) ? 'bg-brand-50/50' : '')}>
                          {spec.render(robot)}
                        </td>
                      ))}
                      {compareList.length < 4 && <td className="bg-surface-light/30 border-r border-surface-gray border-dashed last:border-r-0" />}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile / Tablet View - Metric-by-metric cards */}
        <div className="lg:hidden space-y-4 pb-8">
          <div className="grid gap-3">
            {compareList.map(robot => (
              <motion.div layout key={`mobile-head-${robot.id}`} className="flex items-center gap-3 rounded-2xl border border-surface-gray bg-white p-3 shadow-sm">
                <img src={robot.image} alt={robot.name} className="h-16 w-16 rounded-xl object-cover grayscale" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600">{robot.manufacturer}</p>
                  <h3 className="truncate font-extrabold text-navy-deep">{robot.name}</h3>
                </div>
                <button onClick={() => removeFromCompare(robot.id)} aria-label={`Remove ${robot.name}`} className="h-9 w-9 rounded-full border border-surface-gray text-surface-muted">
                  <X size={16} className="mx-auto" />
                </button>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {visibleSpecs.map(spec => (
              <motion.section
                layout
                key={`metric-${spec.key}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-2xl border border-surface-gray bg-white p-4 shadow-sm"
              >
                <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-surface-muted">{spec.label}</h3>
                <div className="grid gap-3">
                  {compareList.map(robot => (
                    <div
                      key={`${robot.id}-${spec.key}-mobile`}
                      className={cn(
                        "rounded-xl border border-surface-gray bg-surface-light/50 p-3",
                        (spec.key === 'price' && robot.id === bestValueId) ||
                        (spec.key === 'deploymentWeeks' && robot.id === fastestId) ||
                        (spec.key === 'payloadKg' && robot.id === bestPayloadId) ||
                        (spec.key === 'japanSupport' && robot.id === bestJapanSupportId)
                          ? 'border-cyber-cyan/40 bg-cyber-cyan/10'
                          : ''
                      )}
                    >
                      <p className="mb-2 truncate text-sm font-bold text-navy-deep">{robot.name}</p>
                      <div className="text-sm">{spec.render(robot)}</div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </AnimatePresence>

          {compareList.length < 4 && (
            <Button fullWidth variant="outline" onClick={() => navigate('/marketplace')} className="h-14">
              Add another solution
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
