import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CheckCircle2,
  Factory,
  Handshake,
  Package,
  ShieldCheck,
  UploadCloud,
  WalletCards,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockRobots } from '../data/robots';
import { BlueprintGridBackground } from '../components/ui/Premium';

export const Inquiry: React.FC = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedRobot = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const robotId = params.get('robotId');
    return mockRobots.find((robot) => robot.id === robotId);
  }, [location.search]);

  const steps = [
    { num: 1, title: 'Company', icon: Building2 },
    { num: 2, title: 'Facility', icon: Factory },
    { num: 3, title: 'Requirement', icon: Package },
    { num: 4, title: 'Constraints', icon: ShieldCheck },
    { num: 5, title: 'Review', icon: WalletCards },
  ];

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    if (step < steps.length) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  if (isSuccess) {
    return (
      <div className="relative flex min-h-[calc(100vh-64px)] flex-1 items-center justify-center overflow-hidden bg-ink-950 p-4 text-white">
        <BlueprintGridBackground />
        <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, delay: 0.15 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-status-success/25 bg-status-success/10 text-status-success"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <h2 className="text-3xl font-black">Inquiry Received</h2>
          <p className="mt-4 leading-7 text-platinum-300">
            Your procurement requirements have been logged. A Nexus integration specialist will prepare the manufacturer introduction path within 24 hours.
          </p>
          <Button fullWidth className="mt-8" onClick={() => { window.location.href = '/'; }}>
            Return to Command Center
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-platinum-100 py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyber-indigo/20 bg-cyber-indigo/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyber-indigo">
            <Handshake size={14} /> B2B Procurement Workflow
          </div>
          <h1 className="text-4xl font-black tracking-tight text-ink-950 sm:text-5xl">Request Manufacturer Introduction</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-surface-muted sm:text-base">
            Share enough operational context for Nexus to route your request to a verified manufacturer or Japan deployment partner.
          </p>
        </div>

        {selectedRobot && (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-platinum-200 bg-white p-4 shadow-sm">
            <img src={selectedRobot.image} alt={selectedRobot.name} className="h-20 w-20 rounded-xl object-cover grayscale" />
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyber-indigo">Selected robot</p>
              <h2 className="truncate text-xl font-black text-ink-950">{selectedRobot.name}</h2>
              <p className="text-sm text-surface-muted">{selectedRobot.manufacturer} / {selectedRobot.category}</p>
            </div>
          </div>
        )}

        <div className="mb-8 rounded-2xl border border-platinum-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <div className="absolute left-6 right-6 top-6 h-1 rounded-full bg-platinum-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyber-indigo to-cyber-cyan"
                animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="relative z-10 flex justify-between">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.num} className="flex flex-col items-center gap-2">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-black transition-colors ${step >= item.num ? 'border-cyber-indigo bg-ink-950 text-white' : 'border-platinum-200 bg-white text-surface-muted'}`}>
                      {step > item.num ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                    </div>
                    <span className={`hidden text-[10px] font-black uppercase tracking-[0.16em] sm:block ${step >= item.num ? 'text-ink-950' : 'text-surface-muted'}`}>{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleNext} className="overflow-hidden rounded-3xl border border-platinum-200 bg-white shadow-[0_24px_80px_rgba(2,6,23,0.10)]">
          <div className="min-h-[390px] p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <Step key="step1" title="Company details">
                  <Field label="Company Name" placeholder="Enter company name" required />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Contact Name" placeholder="Full name" required />
                    <Field label="Corporate Email" type="email" placeholder="name@company.co.jp" required />
                  </div>
                  <Field label="Role / Department" placeholder="Operations, procurement, engineering..." />
                </Step>
              )}

              {step === 2 && (
                <Step key="step2" title="Facility details">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="Industry Sector" options={['Logistics & Warehousing', 'Manufacturing & Assembly', 'Retail Operations', 'Facility Operations']} required />
                    <Field label="Facility Location" placeholder="Tokyo, Osaka, Nagoya..." required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Approx. Facility Size" placeholder="e.g., 50,000 sq ft" />
                    <Field label="Current Systems" placeholder="WMS, ERP, PLC, MES..." />
                  </div>
                </Step>
              )}

              {step === 3 && (
                <Step key="step3" title="Automation requirement">
                  <SelectField label="Primary Task" options={['Material transport', 'Palletizing', 'Inspection', 'Picking / Packaging', 'Cleaning', 'Sorting']} required />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Payload / Throughput Target" placeholder="e.g., 600kg, 30 picks/min" required />
                    <Field label="Operating Hours" placeholder="e.g., 12 hours/day" />
                  </div>
                  <TextArea label="Operational Challenge" placeholder="Describe current workflow, bottleneck, staffing pressure, or safety concern..." required />
                </Step>
              )}

              {step === 4 && (
                <Step key="step4" title="Deployment constraints">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="Environment" options={['Indoor', 'Indoor public', 'Cleanroom', 'Outdoor / mixed']} required />
                    <SelectField label="Japan Support Requirement" options={['Local SLA required', 'Partner support acceptable', 'Remote support acceptable']} required />
                  </div>
                  <TextArea label="Facility Constraints" placeholder="Floor quality, aisle width, safety zoning, network restrictions, or installation windows..." />
                </Step>
              )}

              {step === 5 && (
                <Step key="step5" title="Budget, timeline, and review">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="Projected Timeline" options={['Immediate (1-3 months)', 'Planning (3-6 months)', 'Research (6+ months)']} required />
                    <SelectField label="Budget Range" options={['Under ¥3M', '¥3M - ¥6M', '¥6M - ¥12M', 'Enterprise program']} required />
                  </div>
                  <div className="rounded-2xl border border-cyber-indigo/20 bg-cyber-indigo/5 p-5">
                    <p className="text-sm font-black text-ink-950">Review before submission</p>
                    <p className="mt-2 text-sm leading-7 text-surface-muted">
                      Nexus will use this context to prepare a procurement-ready introduction path. No backend is connected in this demo; submission is simulated.
                    </p>
                  </div>
                </Step>
              )}
            </AnimatePresence>
          </div>

          <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-platinum-200 bg-platinum-50 p-4 sm:px-8">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="rounded-xl px-4 py-3 text-sm font-black text-surface-muted hover:text-ink-950">
                Back
              </button>
            ) : <div />}
            <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
              {isSubmitting ? <UploadCloud className="animate-bounce" size={20} /> : step === steps.length ? 'Submit Inquiry' : 'Continue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Step: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="space-y-5">
    <h2 className="text-2xl font-black text-ink-950">{title}</h2>
    {children}
  </motion.div>
);

const Field: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-ink-950">{label}</span>
    <input className="h-14 w-full rounded-xl border border-platinum-200 bg-platinum-50 px-4 py-3 text-sm font-semibold text-ink-950 outline-none transition focus:border-cyber-indigo focus:bg-white focus:ring-2 focus:ring-cyber-indigo/15" {...props} />
  </label>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-ink-950">{label}</span>
    <textarea className="min-h-32 w-full resize-none rounded-xl border border-platinum-200 bg-platinum-50 px-4 py-3 text-sm font-semibold text-ink-950 outline-none transition focus:border-cyber-indigo focus:bg-white focus:ring-2 focus:ring-cyber-indigo/15" {...props} />
  </label>
);

const SelectField: React.FC<{ label: string; options: string[]; required?: boolean }> = ({ label, options, required }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-ink-950">{label}</span>
    <select required={required} className="h-14 w-full rounded-xl border border-platinum-200 bg-platinum-50 px-4 py-3 text-sm font-semibold text-ink-950 outline-none transition focus:border-cyber-indigo focus:bg-white focus:ring-2 focus:ring-cyber-indigo/15">
      <option value="">Select...</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);
