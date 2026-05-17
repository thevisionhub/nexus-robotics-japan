import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Bot, Globe2, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockManufacturers } from '../data/manufacturers';
import { mockRobots } from '../data/robots';
import { AnimatedCounter, BlueprintGridBackground, SectionKicker } from '../components/ui/Premium';

export const Manufacturers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-x-hidden bg-platinum-100 pb-20">
      <section className="relative overflow-hidden bg-ink-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <BlueprintGridBackground dense />
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SectionKicker>Verified Partner Intelligence</SectionKicker>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Global robotics manufacturers, mapped for Japan readiness.
          </motion.h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-platinum-300">
            Each partner profile highlights capabilities, certifications, deployment scale, support path, and listed solutions in the Nexus registry.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ['Verified partners', mockManufacturers.length],
              ['Global deployments', mockManufacturers.reduce((sum, item) => sum + item.globalDeployments, 0)],
              ['Japan support ready', mockManufacturers.filter((item) => item.japanSupportAvailable).length],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <p className="text-4xl font-black"><AnimatedCounter value={value as number} suffix={(label as string).includes('deployments') ? '+' : ''} /></p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-cyan">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto -mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        {mockManufacturers.map((manufacturer, index) => {
          const listedRobots = mockRobots.filter((robot) => robot.manufacturerId === manufacturer.id);
          return (
            <motion.article
              key={manufacturer.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="overflow-hidden rounded-3xl border border-platinum-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,0.08)]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative min-h-[320px] overflow-hidden bg-ink-950 p-6 text-white sm:p-8">
                  <BlueprintGridBackground dense />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-5 flex flex-wrap gap-2">
                        <Badge variant={manufacturer.japanSupportAvailable ? 'success' : 'warning'}>
                          {manufacturer.japanSupportAvailable ? 'Japan Ready' : 'Seeking Partner'}
                        </Badge>
                        <Badge variant="outline" className="border-white/15 bg-white/10 text-white/72">
                          {manufacturer.countryCode}
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{manufacturer.name}</h2>
                      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-platinum-300">
                        <MapPin size={16} className="text-cyber-cyan" /> {manufacturer.country}
                      </p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-cyan">Deployments</p>
                        <p className="mt-2 text-2xl font-black">{manufacturer.globalDeployments}+</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-cyan">Founded</p>
                        <p className="mt-2 text-2xl font-black">{manufacturer.foundedYear}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-7 text-surface-muted">{manufacturer.overview}</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <InfoBlock icon={ShieldCheck} title="Japan Readiness" text={manufacturer.supportDetails} />
                    <InfoBlock icon={Award} title="Certifications" text={manufacturer.certifications.join(', ')} />
                    <InfoBlock icon={Sparkles} title="Listed Robots" text={`${listedRobots.length} registry profiles`} />
                  </div>

                  <div className="mt-7">
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-surface-muted">Listed solutions</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {listedRobots.map((robot) => (
                        <Link
                          key={robot.id}
                          to={`/robot/${robot.id}`}
                          data-cursor="VIEW"
                          className="group flex items-center gap-3 rounded-2xl border border-platinum-200 bg-platinum-50 p-3 transition-colors hover:border-cyber-indigo/40 hover:bg-white"
                        >
                          <img src={robot.image} alt={robot.name} className="h-14 w-14 rounded-xl object-cover grayscale transition group-hover:grayscale-0" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-ink-950">{robot.name}</p>
                            <p className="text-xs font-semibold text-surface-muted">{robot.category} / {robot.payloadKg}kg</p>
                          </div>
                          <ArrowRight size={16} className="text-surface-muted" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button className="gap-2" onClick={() => navigate('/inquiry')} data-cursor="START">
                      Contact Partner <ArrowRight size={18} />
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={() => navigate('/marketplace')} data-cursor="VIEW">
                      View Registry <Bot size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

const InfoBlock: React.FC<{ icon: typeof Globe2; title: string; text: string }> = ({ icon: Icon, title, text }) => (
  <div className="rounded-2xl border border-platinum-200 bg-platinum-50 p-4">
    <Icon size={19} className="mb-3 text-cyber-indigo" />
    <h3 className="font-black text-ink-950">{title}</h3>
    <p className="mt-2 line-clamp-4 text-xs leading-5 text-surface-muted">{text}</p>
  </div>
);
