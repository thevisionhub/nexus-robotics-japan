import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, RefreshCw, Activity, Cpu, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockRobots } from '../data/robots';
import { RobotCard } from '../components/robot/RobotCard';
import { cn } from '../utils/cn';

export const Matching: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [matchedRobots, setMatchedRobots] = useState<typeof mockRobots>([]);
  const [loadingText, setLoadingText] = useState("Initializing vector search...");
  const [progress, setProgress] = useState(0);
  
  const [prompt, setPrompt] = useState('');
  const [selections, setSelections] = useState({
    industry: '',
    task: '',
    payload: '',
    environment: ''
  });

  // Mobile console toggle
  const [showConsole, setShowConsole] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedReason, setExpandedReason] = useState<string | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const calculateFitScore = (robot: typeof mockRobots[number]) => {
    let score = 52;
    const promptText = prompt.toLowerCase();

    if (selections.industry && robot.industries.includes(selections.industry)) score += 16;
    if (selections.task && (robot.tasks.includes(selections.task) || robot.capabilities.some(cap => cap.toLowerCase().includes(selections.task.toLowerCase())))) score += 16;

    const payloadTarget = selections.payload === 'Under 50kg' ? 50 :
      selections.payload === '50kg - 200kg' ? 200 :
      selections.payload === '200kg - 500kg' ? 500 :
      selections.payload === 'Over 500kg' ? 501 : 0;

    if (payloadTarget) {
      if (selections.payload === 'Over 500kg') score += robot.payloadKg >= 500 ? 15 : -8;
      else score += robot.payloadKg <= payloadTarget && robot.payloadKg >= payloadTarget * 0.18 ? 15 : -5;
    }

    if (selections.environment && robot.operatingEnvironment.toLowerCase().includes(selections.environment.toLowerCase().split(' ')[0])) score += 8;
    if (robot.japanSupport) score += 8;
    if (robot.integrationTypes.some(type => ['API', 'WMS', 'PLC', 'MES'].includes(type))) score += 5;
    if (promptText.includes('warehouse') && robot.industries.includes('Warehousing')) score += 6;
    if (promptText.includes('inspection') && robot.category === 'Inspection') score += 6;
    if (promptText.includes('pallet') && (robot.category === 'AMR' || robot.category === 'Palletizing')) score += 6;

    return Math.max(64, Math.min(99, score));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setStep(5);
    setProgress(0);
    
    // Simulate complex AI processing steps with progress
    const steps = [
      { t: "Parsing operational challenge...", p: 15, d: 700 },
      { t: "Mapping robot categories...", p: 38, d: 1400 },
      { t: "Checking Japan support...", p: 62, d: 2100 },
      { t: "Ranking procurement fit...", p: 84, d: 2900 },
      { t: "Generating recommendations...", p: 100, d: 3700 }
    ];

    steps.forEach((s) => {
      setTimeout(() => {
        setLoadingText(s.t);
        setProgress(s.p);
      }, s.d);
    });
    
    setTimeout(() => {
      const sorted = mockRobots
        .map(robot => ({ ...robot, matchScore: calculateFitScore(robot) }))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      setMatchedRobots(sorted.slice(0, 3));
      setIsGenerating(false);
      setExpandedReason(sorted[0]?.id || null);
    }, 4100);
  };

  const setSelection = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#0B1120] text-white overflow-hidden relative pt-24 lg:pt-20">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-light/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Mobile progress indicator */}
      <div className="lg:hidden h-1.5 w-full bg-white/10 relative z-20">
        <motion.div 
          className="h-full bg-brand-500"
          initial={{ width: "20%" }}
          animate={{ width: `${(step / (isGenerating ? 5 : 4)) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex min-w-0 flex-col lg:flex-row w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Left Side: Interactive Diagnostic Flow */}
        <div className="flex-1 min-w-0 w-full max-w-[100vw] p-4 sm:p-8 lg:max-w-none lg:p-12 xl:p-16 flex flex-col lg:border-r lg:border-white/10 overflow-y-auto">
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <Badge variant="outline" className="text-brand-400 border-brand-400/30 bg-brand-400/10 backdrop-blur-md mb-4 sm:mb-6">
                <Zap size={14} className="mr-1.5" /> <span className="hidden sm:inline">AI Diagnostic Engine</span><span className="sm:hidden">AI Engine</span>
              </Badge>
              <button 
                className="hidden sm:flex lg:hidden shrink-0 text-xs items-center gap-1 bg-white/10 px-2 py-1 rounded text-surface-gray hover:text-white"
                onClick={() => setShowConsole(!showConsole)}
              >
                <Activity size={12}/> Console
              </button>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-surface-gray">
              Define Your Parameters
            </h1>
            <p className="text-surface-gray text-sm sm:text-lg max-w-[21.5rem] sm:max-w-xl break-words">
              <span className="hidden sm:inline">Our vector-search engine translates operational constraints into a highly precise robotics shortlist.</span>
              <span className="sm:hidden">Translate a facility challenge into a precise robotics shortlist.</span>
            </p>
            <button
              className="mt-4 inline-flex w-max items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-surface-gray sm:hidden"
              onClick={() => setShowConsole(!showConsole)}
            >
              <Activity size={12} /> Console
            </button>
          </div>

          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-full flex flex-col pb-safe max-w-[21.5rem] sm:max-w-none">
                  <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-600 text-xs sm:text-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]">1</span> 
                    Describe the operational challenge
                  </h2>
                  <div className="relative flex-1 min-h-[150px] mb-6">
                    <textarea 
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                      placeholder="E.g., We need to move 300kg pallets across a busy 50,000 sq ft warehouse with limited staff. Needs to run 12 hours a day."
                      className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-base sm:text-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none backdrop-blur-sm text-white placeholder:text-surface-gray/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Reduce warehouse labor", "Automate visual inspection", "Heavy pallet transport"].map(chip => (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={chip} onClick={() => setPrompt(chip)}
                        className="bg-white/5 border border-white/10 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/10 hover:border-brand-500/50 transition-colors text-surface-gray hover:text-white"
                      >
                        {chip}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-end pt-4 sm:pt-6 border-t border-white/10">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-navy-deep hover:bg-brand-50 h-12 sm:h-14 font-bold" onClick={handleNext} disabled={!prompt.trim()}>
                      Process Parameters <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-full flex flex-col pb-safe max-w-[21.5rem] sm:max-w-none">
                  <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-white flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-600 text-xs sm:text-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]">2</span> 
                    Categorize the environment
                  </h2>
                  
                  <div className="space-y-6 sm:space-y-8 flex-1">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-brand-300 uppercase tracking-wider mb-3 sm:mb-4">Industry Sector</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {['Logistics', 'Manufacturing', 'Retail', 'Warehousing'].map(i => (
                          <motion.button 
                            whileHover={{ scale: selections.industry === i ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={i} onClick={() => setSelection('industry', i)}
                            className={cn(
                              "p-3 sm:p-4 rounded-xl border text-left font-semibold transition-all duration-300 text-xs sm:text-sm",
                              selections.industry === i 
                                ? "bg-brand-600/20 border-brand-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                                : "bg-white/5 border-white/10 text-surface-gray hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {i}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm font-bold text-brand-300 uppercase tracking-wider mb-3 sm:mb-4">Primary Application</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {['Material transport', 'Palletizing', 'Inspection', 'Cleaning'].map(t => (
                          <motion.button 
                            whileHover={{ scale: selections.task === t ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={t} onClick={() => setSelection('task', t)}
                            className={cn(
                              "p-3 sm:p-4 rounded-xl border text-left font-semibold transition-all duration-300 text-xs sm:text-sm",
                              selections.task === t 
                                ? "bg-brand-600/20 border-brand-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                                : "bg-white/5 border-white/10 text-surface-gray hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {t}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3 sm:justify-between pt-4 sm:pt-6 border-t border-white/10">
                    <Button variant="outline" className="flex-1 sm:flex-none h-12 border-white/20 text-white hover:bg-white/10" onClick={handlePrev}>Back</Button>
                    <Button size="lg" className="flex-[2] sm:flex-none h-12 bg-white text-navy-deep hover:bg-brand-50 font-bold" onClick={handleNext} disabled={!selections.industry || !selections.task}>
                      Next Specs <ArrowRight size={18} className="ml-2 hidden sm:block" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-full flex flex-col pb-safe max-w-[21.5rem] sm:max-w-none">
                  <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-white flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-600 text-xs sm:text-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]">3</span> 
                    Technical Constraints
                  </h2>
                  
                  <div className="space-y-6 sm:space-y-8 flex-1">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-brand-300 uppercase tracking-wider mb-3 sm:mb-4">Payload Capacity</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {['Under 50kg', '50kg - 200kg', '200kg - 500kg', 'Over 500kg'].map(p => (
                          <motion.button 
                            whileHover={{ scale: selections.payload === p ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={p} onClick={() => setSelection('payload', p)}
                            className={cn(
                              "p-3 sm:p-4 rounded-xl border text-left font-semibold transition-all duration-300 text-xs sm:text-sm",
                              selections.payload === p 
                                ? "bg-brand-600/20 border-brand-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                                : "bg-white/5 border-white/10 text-surface-gray hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {p}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-brand-300 uppercase tracking-wider mb-3 sm:mb-4">Operating Environment</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {['Indoor', 'Indoor Public', 'Cleanroom', 'Outdoor/Mixed'].map(e => (
                          <motion.button 
                            whileHover={{ scale: selections.environment === e ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={e} onClick={() => setSelection('environment', e)}
                            className={cn(
                              "p-3 sm:p-4 rounded-xl border text-left font-semibold transition-all duration-300 text-xs sm:text-sm",
                              selections.environment === e 
                                ? "bg-brand-600/20 border-brand-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                                : "bg-white/5 border-white/10 text-surface-gray hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {e}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3 sm:justify-between pt-4 sm:pt-6 border-t border-white/10">
                    <Button variant="outline" className="flex-1 sm:flex-none h-12 border-white/20 text-white hover:bg-white/10" onClick={handlePrev}>Back</Button>
                    <Button size="lg" className="flex-[2] sm:flex-none h-12 bg-brand-600 text-white hover:bg-brand-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]" onClick={handleGenerate} disabled={!selections.payload || !selections.environment}>
                      Run Analysis <Activity size={18} className="ml-2 hidden sm:block" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                  {isGenerating ? (
                    <div className="w-full max-w-md mx-auto flex flex-col items-center">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-8">
                        <ScanLine size={48} className="text-brand-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 sm:w-[64px] sm:h-[64px]" />
                        <motion.div 
                          className="absolute inset-0 border-4 border-t-brand-400 border-r-brand-500 border-b-transparent border-l-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="absolute inset-2 border-4 border-b-accent-light border-l-brand-300 border-t-transparent border-r-transparent rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">Analyzing Marketplace</h3>
                      <p className="text-brand-300 font-mono text-xs sm:text-sm h-6">{loadingText}</p>
                      
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 sm:mt-8 overflow-hidden relative">
                        <motion.div 
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-brand-600 to-accent-light"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-surface-gray font-mono text-xs mt-2">{progress}%</p>
                    </div>
                  ) : (
                    <div className="w-full text-left h-full flex flex-col pb-safe">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                            <CheckCircle2 className="text-status-success w-6 h-6 sm:w-8 sm:h-8" /> Analysis Complete
                          </h2>
                          <p className="text-surface-gray text-xs sm:text-sm">Found {matchedRobots.length} highly compatible solutions for your parameters.</p>
                        </div>
                        <Button variant="outline" onClick={() => { setStep(1); setPrompt(''); setSelections({industry:'', task:'', payload:'', environment:''}); }} className="border-white/20 text-white hover:bg-white/10 hidden sm:flex">
                          <RefreshCw size={16} className="mr-2" /> New Analysis
                        </Button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto pb-4 pr-1 sm:pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          {matchedRobots.map((robot, index) => (
                            <motion.div 
                              key={robot.id} 
                              initial={{ opacity: 0, y: 30, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                              className="relative h-full flex flex-col"
                            >
                              {index === 0 && (
                                <div className="absolute -top-3 left-4 z-20 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-1 border border-brand-400/50">
                                  <Zap size={12} /> Top Recommendation
                                </div>
                              )}
                              <RobotCard robot={robot} view="grid" />
                              
                              <motion.button
                                type="button"
                                onClick={() => setExpandedReason(expandedReason === robot.id ? null : robot.id)}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ delay: (index * 0.2) + 0.3 }}
                                className="bg-navy-slate/80 backdrop-blur-md mt-2 p-3 sm:p-4 rounded-xl border border-white/10 text-sm relative z-10 -translate-y-2 sm:-translate-y-4 mx-2 shadow-lg text-left"
                              >
                                <p className="font-semibold text-brand-300 flex items-center gap-1.5 mb-1.5 sm:mb-2 text-[10px] sm:text-xs uppercase tracking-wider border-b border-white/10 pb-1.5 sm:pb-2">
                                  <Cpu size={14} /> Why this matches
                                </p>
                                {expandedReason === robot.id ? (
                                  <p className="text-surface-gray text-[10px] sm:text-xs leading-relaxed">
                                    Optimal match for <strong className="text-white">{selections.payload}</strong> payload in <strong className="text-white">{selections.environment}</strong> conditions. High deployment readiness for the <strong className="text-white">{selections.industry}</strong> sector with {robot.japanSupport ? 'visible Japan support' : 'support validation recommended'}.
                                  </p>
                                ) : (
                                  <p className="text-surface-gray text-[10px] sm:text-xs leading-relaxed">Tap to expand procurement reasoning.</p>
                                )}
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="sm:hidden mt-4 pt-4 border-t border-white/10 shrink-0">
                        <Button variant="outline" fullWidth onClick={() => { setStep(1); setPrompt(''); }} className="border-white/20 text-white h-12">
                          <RefreshCw size={16} className="mr-2" /> New Analysis
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Live Intelligence Panel (Collapsible on mobile) */}
        <AnimatePresence>
          {(showConsole || isDesktop) && step !== 5 && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute lg:relative top-0 right-0 bottom-0 z-50 w-[85vw] sm:w-[400px] xl:w-[450px] bg-navy-slate/95 lg:bg-navy-slate/50 backdrop-blur-xl p-6 lg:p-10 flex flex-col border-l border-white/10 lg:border-t-0 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] lg:shadow-none"
            >
              <div className="lg:hidden flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} /> Console
                </h3>
                <button onClick={() => setShowConsole(false)} className="p-2 text-surface-gray hover:text-white bg-white/5 rounded-full">
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="sticky top-12 space-y-4 font-mono text-xs sm:text-sm flex-1 overflow-y-auto hide-scrollbar">
                <h3 className="hidden lg:flex text-xs font-bold text-surface-muted uppercase tracking-wider mb-6 items-center gap-2">
                  <Activity size={16} /> Live Parsing Status
                </h3>
                
                <motion.div layout className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-lg backdrop-blur-sm">
                  <span className="text-surface-gray block mb-1 text-[10px] sm:text-xs uppercase tracking-wider font-sans">Unstructured Input:</span>
                  <span className={cn("transition-colors leading-relaxed", prompt ? "text-brand-300" : "text-surface-gray/30")}>
                    {prompt ? `"${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"` : "Awaiting input..."}
                  </span>
                </motion.div>
                
                <motion.div layout className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-lg backdrop-blur-sm">
                  <span className="text-surface-gray block mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-wider font-sans">Vector Parameters:</span>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    {[
                      { label: "Industry", val: selections.industry },
                      { label: "Task", val: selections.task },
                      { label: "Payload", val: selections.payload },
                      { label: "Environment", val: selections.environment }
                    ].map(param => (
                      <div key={param.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-surface-gray/70">{param.label}:</span>
                        <AnimatePresence mode="popLayout">
                          <motion.span 
                            key={param.val || 'null'}
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className={cn("font-semibold text-right max-w-[60%] truncate", param.val ? "text-white bg-brand-600/20 px-2 py-0.5 rounded" : "text-surface-gray/30")}
                          >
                            {param.val || "null"}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div layout className="bg-brand-900/20 border border-brand-500/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm mt-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-2 h-2 sm:w-3 sm:h-3">
                      <div className="absolute inset-0 bg-brand-400 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-2 h-2 sm:w-3 sm:h-3 bg-brand-500 rounded-full"></div>
                    </div>
                    <span className="text-brand-300 font-semibold text-[10px] sm:text-xs uppercase tracking-wider font-sans">Engine Status</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={step}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                      className="text-surface-gray text-[10px] sm:text-xs mt-2 font-sans leading-relaxed"
                    >
                      {step === 1 && "Awaiting natural language input to begin semantic parsing."}
                      {step === 2 && "Parsing industry constraints. Ready to filter dataset."}
                      {step === 3 && "Calculating payload and environmental vector distances."}
                      {step === 4 && "Parameters locked. Ready to execute matching algorithm."}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Backdrop for mobile drawer */}
        <AnimatePresence>
          {showConsole && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowConsole(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
