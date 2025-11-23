
import React, { useState, useMemo } from 'react';
import { DEFAULT_CONFIG, NetworkConfig } from './types';
import { calculateStats } from './utils/calculations';
import { ControlPanel } from './components/ControlPanel';
import { StatsDashboard } from './components/StatsDashboard';
import { NetworkVisualizer } from './components/NetworkVisualizer';
import { Network, Globe } from 'lucide-react';
import { Language, TRANSLATIONS } from './utils/translations';

const App: React.FC = () => {
  const [config, setConfig] = useState<NetworkConfig>(DEFAULT_CONFIG);
  const [lang, setLang] = useState<Language>('en');
  
  const t = TRANSLATIONS[lang];

  // Calculate stats whenever config changes
  const stats = useMemo(() => calculateStats(config), [config]);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleExport = () => {
    const data = {
      config,
      stats,
      timestamp: new Date().toISOString()
    };
    const text = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(text)
      .then(() => alert(t.copied))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="z-20 shadow-xl">
        <ControlPanel 
            config={config}
            stats={stats}
            onChange={setConfig} 
            onReset={handleReset}
            onExport={handleExport}
            lang={lang}
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative">
        
        {/* Header / Top Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-950 flex items-center px-8 justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
               <Network className="text-green-500" size={24} />
            </div>
            <div>
               <h1 className="text-xl font-bold text-white tracking-wider">HPC<span className="text-green-500">.NetArchitect</span></h1>
               <p className="text-[10px] text-slate-500 font-mono uppercase">{t.appSubtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors border border-slate-800 rounded px-3 py-1 hover:bg-slate-800"
            >
                <Globe size={14} />
                {lang === 'en' ? 'EN / 中文' : '中文 / EN'}
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>STATUS:</span>
                <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {t.status}
                </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
           {/* Top Stats */}
           <StatsDashboard stats={stats} lang={lang} />

           {/* Visualizer Container */}
           <div className="flex-1 relative rounded-xl border border-slate-800 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent z-10 opacity-50"></div>
              <NetworkVisualizer config={config} stats={stats} lang={lang} />
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
