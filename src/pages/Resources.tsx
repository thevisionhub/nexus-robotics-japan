import React, { useState } from 'react';
import { FileText, Download, Lock, CheckCircle2, FileJson, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const Resources: React.FC = () => {
  type Resource = {
    title: string;
    type: string;
    desc: string;
    premium: boolean;
    pages: number;
    format: string;
    difficulty: string;
    updated: string;
    audience: string;
    sections: string[];
    bullets: string[];
  };

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const resources: Resource[] = [
    {
      title: 'Robotics Procurement Guide 2026',
      type: 'PDF Guide',
      desc: 'A comprehensive checklist for Japanese enterprises evaluating AMR and robotic arm solutions. Includes SLA templates.',
      premium: false,
      pages: 42,
      format: 'PDF (2.4 MB)',
      difficulty: 'Intermediate',
      updated: 'May 2026',
      audience: 'Procurement leads, operations directors, and integration owners',
      sections: ['Business case model', 'Vendor evaluation', 'Japan support checklist', 'Pilot acceptance criteria'],
      bullets: ['How to compare payload, support, and integration tradeoffs', 'What to request before manufacturer introduction', 'Sample acceptance criteria for pilot programs'],
    },
    {
      title: 'Manufacturing Automation Readiness',
      type: 'Whitepaper',
      desc: 'Assess your facility floor space, network, and safety infrastructure before deploying robots.',
      premium: false,
      pages: 18,
      format: 'PDF (1.1 MB)',
      difficulty: 'Foundational',
      updated: 'April 2026',
      audience: 'Factory managers and process engineering teams',
      sections: ['Floor readiness', 'Safety zoning', 'Network requirements', 'Staff onboarding'],
      bullets: ['Facility survey checklist', 'Risk questions for line-side automation', 'Deployment maturity scoring'],
    },
    {
      title: 'Retail Robotics Trend Report',
      type: 'Industry Report',
      desc: 'Analysis of inventory scanning and cleaning robot adoption in Asian retail markets (Q1 2026 data).',
      premium: true,
      pages: 65,
      format: 'Interactive Dashboard',
      difficulty: 'Executive',
      updated: 'May 2026',
      audience: 'Enterprise strategy, retail operations, and transformation teams',
      sections: ['Market sizing', 'Vendor heatmap', 'Adoption velocity', 'Support landscape'],
      bullets: ['Japan and APAC adoption patterns', 'Budget-fit benchmarks', 'Enterprise vendor shortlists'],
    },
    {
      title: 'Safety Certification Overview',
      type: 'Fact Sheet',
      desc: 'Understanding ISO 3691-4, CE, and JIS standards for collaborative and mobile robots.',
      premium: false,
      pages: 6,
      format: 'PDF (0.5 MB)',
      difficulty: 'Foundational',
      updated: 'March 2026',
      audience: 'Safety owners and procurement reviewers',
      sections: ['Certification map', 'Common acronyms', 'Document request checklist'],
      bullets: ['Which certifications map to AMRs and cobots', 'What to verify before pilot approval', 'How to structure document requests'],
    },
  ];

  const handleResourceClick = (res: Resource) => {
    setSelectedResource(res);
    setDownloadSuccess(false);
  };

  const simulateDownload = () => {
    if (!selectedResource || selectedResource.premium) return;
    setIsSimulating(true);
    setTimeout(() => {
      const fileBody = [
        `Nexus Robotics Japan - ${selectedResource.title}`,
        '',
        selectedResource.desc,
        '',
        'Sections included:',
        ...selectedResource.sections.map(section => `- ${section}`),
        '',
        'Sample bullets:',
        ...selectedResource.bullets.map(bullet => `- ${bullet}`),
      ].join('\n');
      const blob = new Blob([fileBody], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedResource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setIsSimulating(false);
      setDownloadSuccess(true);
      toast.success('Simulation: File downloaded successfully');
    }, 2000);
  };

  return (
    <div className="flex-1 bg-surface-light min-h-[calc(100vh-64px)] pb-20">
      <div className="bg-[#0B1120] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/20 rounded-full blur-[100px] pointer-events-none" 
        />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <Badge variant="navy" className="bg-white/10 text-brand-300 border-white/20 mb-6 backdrop-blur-md">Knowledge Base</Badge>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-surface-gray"
          >
            Intelligence & Resources
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-surface-gray text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Expert procurement guides, technical whitepapers, and industry reports to accelerate your automation journey.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        <div className="grid gap-6">
          {resources.map((res, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              onClick={() => handleResourceClick(res)}
            >
              <Card className="hover:border-brand-400 hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)] transition-all duration-300 bg-white group cursor-pointer overflow-hidden relative">
                {res.premium && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-status-warning/20 to-transparent flex items-start justify-end p-2 opacity-50"><Lock size={14} className="text-status-warning" /></div>}
                
                <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <motion.div 
                      whileHover={{ rotate: -5, scale: 1.05 }}
                      className="p-4 bg-surface-light border border-surface-gray text-navy-deep rounded-xl flex-shrink-0 mt-1 group-hover:bg-brand-50 group-hover:border-brand-200 group-hover:text-brand-600 transition-colors shadow-sm"
                    >
                      <FileText size={28} />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-surface-muted uppercase tracking-wider">{res.type}</span>
                        {res.premium && <Badge variant="outline" className="text-[10px] py-0 border-status-warning/30 bg-status-warning/10 text-status-warning font-bold"><Lock size={10} className="mr-1"/> Premium Analysis</Badge>}
                        {!res.premium && <Badge variant="success" className="text-[10px] py-0">Free</Badge>}
                      </div>
                      <h3 className="text-xl font-bold text-navy-deep mb-2 leading-tight group-hover:text-brand-600 transition-colors">{res.title}</h3>
                      <p className="text-sm text-navy-charcoal leading-relaxed">{res.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-surface-muted">
                        <span>{res.pages} pages</span>
                        <span>/</span>
                        <span>{res.difficulty}</span>
                        <span>/</span>
                        <span>Updated {res.updated}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={res.premium ? "outline" : "primary"} 
                    className="flex-shrink-0 w-full sm:w-auto shrink-0 pointer-events-none"
                  >
                    {res.premium ? 'Request Access' : 'Preview'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      <Modal 
        isOpen={!!selectedResource} 
        onClose={() => setSelectedResource(null)}
        title={selectedResource?.premium ? "Premium Access Required" : "Resource Preview"}
        maxWidth="2xl"
      >
        {selectedResource && (
          <AnimatePresence mode="wait">
            {selectedResource.premium ? (
              <motion.div 
                key="premium"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-status-warning/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-status-warning/20">
                  <Lock size={32} className="text-status-warning" />
                </div>
                <h3 className="text-2xl font-bold text-navy-deep mb-4">{selectedResource.title}</h3>
                <p className="text-surface-muted mb-6 max-w-md mx-auto">This industry report contains proprietary market data and requires an active Nexus Enterprise SLA to download.</p>
                <div className="mb-8 rounded-2xl border border-status-warning/20 bg-status-warning/5 p-4 text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-status-warning mb-2">Included sections</p>
                  <ul className="space-y-2 text-sm text-navy-charcoal">
                    {selectedResource.sections.map(section => <li key={section}>- {section}</li>)}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" onClick={() => setSelectedResource(null)}>Cancel</Button>
                  <Button className="bg-navy-deep hover:bg-navy-charcoal text-white" onClick={() => { window.location.href = '/inquiry'; }}>Contact Nexus Team</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="free"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-surface-light border border-surface-gray rounded-xl p-6 flex flex-col justify-between shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-600/5 rounded-bl-full" />
                    <div>
                      <FileJson size={24} className="text-brand-400 mb-4" />
                      <p className="text-xs text-surface-muted font-bold uppercase tracking-wider mb-2">Nexus Japan</p>
                      <h4 className="font-bold text-navy-deep leading-snug">{selectedResource.title}</h4>
                    </div>
                    <div>
                      <div className="w-full h-1 bg-surface-gray/50 rounded-full mb-2"></div>
                      <div className="w-2/3 h-1 bg-surface-gray/50 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-navy-deep mb-2">{selectedResource.title}</h3>
                      <div className="flex gap-4 mb-6">
                        <Badge variant="outline" className="text-surface-muted bg-surface-light border-surface-gray">{selectedResource.pages} Pages</Badge>
                        <Badge variant="outline" className="text-surface-muted bg-surface-light border-surface-gray">{selectedResource.format}</Badge>
                        <Badge variant="outline" className="text-surface-muted bg-surface-light border-surface-gray">{selectedResource.difficulty}</Badge>
                      </div>
                      
                      <p className="text-navy-charcoal mb-6 leading-relaxed">{selectedResource.desc}</p>
                      <p className="text-sm font-semibold text-surface-muted mb-6">Recommended audience: {selectedResource.audience}</p>
                      
                      <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100 mb-8">
                        <h5 className="text-sm font-bold text-brand-800 mb-3 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-brand-500" /> What's inside:
                        </h5>
                        <ul className="space-y-2 text-sm text-brand-700">
                          {selectedResource.bullets.map(bullet => (
                            <li key={bullet} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400" /> {bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-gray">
                      <Button variant="outline" className="flex-1" onClick={() => toast.success('Saved to resource library')}>
                        Save to Library
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => toast('Preview opened in simulated reader')}>
                        Preview Resource
                      </Button>
                      <Button 
                        className="flex-[2] bg-brand-600 hover:bg-brand-500 text-white relative overflow-hidden" 
                        onClick={simulateDownload}
                        disabled={isSimulating || downloadSuccess}
                      >
                        <AnimatePresence mode="wait">
                          {isSimulating ? (
                            <motion.span key="sim" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center">
                              <RefreshCw size={18} className="mr-2 animate-spin" /> Generating PDF...
                            </motion.span>
                          ) : downloadSuccess ? (
                            <motion.span key="suc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center text-white">
                              <CheckCircle2 size={18} className="mr-2" /> Downloaded
                            </motion.span>
                          ) : (
                            <motion.span key="dl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center">
                              <Download size={18} className="mr-2" /> Download Full Guide
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Modal>
    </div>
  );
};
