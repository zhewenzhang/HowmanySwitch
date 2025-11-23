
import React from 'react';
import { NetworkStats } from '../types';
import { Cpu, Zap, Server, Layers, Activity } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface StatsDashboardProps {
  stats: NetworkStats;
  lang: Language;
}

const StatCard: React.FC<{ label: string; value: number; icon: React.ReactNode; colorClass: string }> = ({ 
  label, 
  value, 
  icon,
  colorClass 
}) => (
  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg backdrop-blur-sm flex items-center justify-between group hover:border-slate-600 transition-all">
    <div>
      <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-mono-display ${colorClass} drop-shadow-[0_0_5px_rgba(74,222,128,0.2)]`}>
        {value.toLocaleString()}
      </div>
    </div>
    <div className={`p-2 rounded-full bg-slate-800/50 ${colorClass} opacity-80 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, lang }) => {
  const t = TRANSLATIONS[lang];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <StatCard 
        label={t.totalGpus} 
        value={stats.totalGpus} 
        icon={<Zap size={20} />} 
        colorClass="text-green-400" 
      />
      <StatCard 
        label={t.totalRtsw} 
        value={stats.totalRtswChips} 
        icon={<Cpu size={20} />} 
        colorClass="text-cyan-400" 
      />
      <StatCard 
        label={t.totalFtsw} 
        value={stats.totalFtswChips} 
        icon={<Layers size={20} />} 
        colorClass="text-blue-400" 
      />
      <StatCard 
        label={t.totalStsw} 
        value={stats.totalStswChips} 
        icon={<Server size={20} />} 
        colorClass="text-purple-400" 
      />
      <StatCard 
        label={t.totalChips} 
        value={stats.grandTotalChips} 
        icon={<Activity size={20} />} 
        colorClass="text-orange-400" 
      />
    </div>
  );
};
