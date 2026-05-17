import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ShieldCheck, Cpu, GitBranch, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-titanium-900 pt-20 pb-10 border-t border-white/10 relative overflow-hidden mt-auto">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 outline-none" data-cursor="HOME">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-indigo text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Bot size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                NEXUS
              </span>
            </Link>
            <p className="text-sm text-surface-muted leading-relaxed mb-8 max-w-sm">
              The premium intelligence layer for Japanese enterprise robotics procurement. 
              Translating operational constraints into verified hardware deployments.
            </p>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-cyber-cyan shadow-sm">
                <ShieldCheck size={18} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-cyber-cyan shadow-sm">
                <Cpu size={18} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-cyber-cyan shadow-sm">
                <GitBranch size={18} />
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-cyber-indigo pl-3">Intelligence</h3>
              <ul className="space-y-4">
                <li><Link to="/marketplace" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors flex items-center group">Registry <ArrowUpRight size={12} className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-cyber-cyan" /></Link></li>
                <li><Link to="/matching" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors flex items-center group">Vector Search <ArrowUpRight size={12} className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-cyber-cyan" /></Link></li>
                <li><Link to="/dashboard" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors flex items-center group">Market Data <ArrowUpRight size={12} className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-cyber-cyan" /></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-cyber-indigo pl-3">Sectors</h3>
              <ul className="space-y-4">
                <li><Link to="/marketplace?industry=Logistics" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Logistics</Link></li>
                <li><Link to="/marketplace?industry=Manufacturing" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Manufacturing</Link></li>
                <li><Link to="/marketplace?industry=Retail" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Retail</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-cyber-indigo pl-3">Network</h3>
              <ul className="space-y-4">
                <li><Link to="/manufacturers" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Verified Partners</Link></li>
                <li><Link to="/compare" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Compare Tool</Link></li>
                <li><Link to="/resources" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-cyber-indigo pl-3">System</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">About Protocol</Link></li>
                <li><Link to="/inquiry" className="text-xs font-semibold text-surface-gray hover:text-white transition-colors">Request Access</Link></li>
                <li><span className="text-xs font-semibold text-surface-gray/50 cursor-not-allowed">Privacy Schema</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold tracking-widest uppercase text-surface-muted">
            &copy; {new Date().getFullYear()} NEXUS PROTOCOL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
            </span>
            <span className="text-[10px] font-bold text-white tracking-wider uppercase">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
