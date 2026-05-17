import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cpu, Globe2, Network, Radar, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BlueprintGridBackground, MotionSection, NetworkNodes, SectionKicker } from '../components/ui/Premium';

const story = [
  {
    title: 'Why Japan needs global robotics access',
    text: 'Labor pressure, aging facilities, and rising fulfillment expectations make automation urgent, but vendor discovery is fragmented across regions, languages, and support models.',
    icon: Globe2,
  },
  {
    title: 'The Nexus role',
    text: 'Nexus standardizes technical data, deployment readiness, support visibility, and manufacturer introductions into one procurement-grade interface.',
    icon: Network,
  },
  {
    title: 'Intelligent matching philosophy',
    text: 'The platform starts with operational constraints, then maps payload, environment, integration, price, and support into an explainable shortlist.',
    icon: Cpu,
  },
  {
    title: 'Trust principles',
    text: 'Every profile should make risk visible: support path, certifications, deployment time, limitations, and integration notes are first-class procurement signals.',
    icon: ShieldCheck,
  },
  {
    title: 'Manufacturer verification',
    text: 'Partner profiles emphasize certifications, global deployments, Japan readiness, and listed robot relationships rather than marketing claims alone.',
    icon: CheckCircle2,
  },
  {
    title: 'Future AI roadmap',
    text: 'Vector search, richer recommendation explanations, deployment simulation, and procurement document generation are designed as frontend-ready roadmap experiences.',
    icon: Sparkles,
  },
];

export const About: React.FC = () => {
  return (
    <div className="flex-1 overflow-x-hidden bg-platinum-100 pb-20">
      <section className="relative overflow-hidden bg-ink-950 px-4 py-28 text-white sm:px-6 lg:px-8">
        <BlueprintGridBackground dense />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionKicker>Trust Story</SectionKicker>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-balance text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              A procurement intelligence layer for Japan's automation future.
            </motion.h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-platinum-300">
              Nexus Robotics Japan connects industrial teams with verified global manufacturers through structured data,
              transparent risk signals, and a matching workflow built around real deployment decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/matching" data-cursor="MATCH">
                <Button size="lg" className="w-full gap-2 sm:w-auto">Start Matching <Radar size={18} /></Button>
              </Link>
              <Link to="/marketplace" data-cursor="VIEW">
                <Button size="lg" variant="outline" className="w-full border-white/14 bg-white/[0.045] text-white hover:bg-white/10 hover:text-white sm:w-auto">
                  Explore Registry
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[380px] sm:h-[520px]">
            <NetworkNodes />
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 text-white shadow-[0_0_80px_rgba(0,229,255,0.25)] backdrop-blur-xl">
              <Network size={48} />
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <SectionKicker className="border-ink-950/10 bg-ink-950/5 text-ink-800">Operating Model</SectionKicker>
            <h2 className="text-balance text-3xl font-black tracking-tight text-ink-950 sm:text-5xl">
              We turn robotics discovery into a decision workflow.
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 hidden w-px bg-platinum-300 md:block" />
            <div className="grid gap-5">
              {story.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="relative grid gap-4 rounded-3xl border border-platinum-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,0.06)] md:grid-cols-[72px_1fr]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-cyber-cyan">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyber-indigo">0{index + 1}</p>
                      <h3 className="mt-1 text-2xl font-black text-ink-950">{item.title}</h3>
                      <p className="mt-3 max-w-4xl text-sm leading-7 text-surface-muted">{item.text}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </MotionSection>

      <section className="relative overflow-hidden bg-ink-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <BlueprintGridBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionKicker>Next Step</SectionKicker>
            <h2 className="text-balance text-3xl font-black tracking-tight sm:text-5xl">
              Bring a real automation challenge into the system.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-platinum-300">
              Explore the registry, run the matching engine, or request an introduction with a specific robot profile attached.
            </p>
          </div>
          <Link to="/inquiry" data-cursor="START">
            <Button size="lg" className="gap-2">Request Access <ArrowRight size={18} /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
