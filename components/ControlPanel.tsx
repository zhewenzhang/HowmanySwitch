
import React from 'react';
import { NetworkConfig } from '../types';
import { Settings, RotateCcw, Download } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface ControlPanelProps {
  config: NetworkConfig;
  onChange: (newConfig: NetworkConfig) => void;
  onReset: () => void;
  onExport: () => void;
  lang: Language;
}

const InputGroup: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  description?: string;
}> = ({ label, value, min, max, step = 1, onChange, description }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input 
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) onChange(val);
        }}
        className="w-24 bg-slate-800 border border-slate-600 text-green-400 font-mono text-sm rounded px-3 py-1 text-right focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all hover:border-green-500/50 placeholder-slate-600 shadow-inner"
      />
    </div>
    <div className="relative w-full h-4 flex items-center">
        <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
        />
    </div>
    {description && <p className="text-xs text-slate-500 mt-1 leading-tight">{description}</p>}
  </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, onChange, onReset, onExport, lang }) => {
  const t = TRANSLATIONS[lang];
  
  const updateConfig = (key: keyof NetworkConfig, value: number) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border-r border-slate-800 h-full p-6 overflow-y-auto w-80 flex flex-col shadow-[5px_0_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-800">
        <Settings className="text-green-500 animate-spin-slow" size={24} />
        <h2 className="text-xl font-bold text-white tracking-tight">{t.configPanel}</h2>
      </div>

      <div className="flex-grow space-y-2">
        <InputGroup
          label={t.l1Units}
          value={config.l1Units}
          min={1}
          max={256}
          onChange={(v) => updateConfig('l1Units', v)}
          description={t.l1UnitsDesc}
        />

        <InputGroup
          label={t.gpusPerL1}
          value={config.gpusPerL1}
          min={8}
          max={512}
          step={8}
          onChange={(v) => updateConfig('gpusPerL1', v)}
          description={t.gpusPerL1Desc}
        />

        <InputGroup
          label={t.rtswPerL1}
          value={config.rtswPerL1}
          min={1}
          max={32}
          onChange={(v) => updateConfig('rtswPerL1', v)}
          description={t.rtswPerL1Desc}
        />

        <InputGroup
          label={t.ftswPerL1}
          value={config.ftswPerL1}
          min={1}
          max={32}
          onChange={(v) => updateConfig('ftswPerL1', v)}
          description={t.ftswPerL1Desc}
        />

        <InputGroup
          label={t.stswRatio}
          value={config.stswRatio}
          min={0.5}
          max={16}
          step={0.5}
          onChange={(v) => updateConfig('stswRatio', v)}
          description={t.stswRatioDesc}
        />
      </div>

      <div className="pt-6 border-t border-slate-800 flex gap-3">
        <button 
          onClick={onExport}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2.5 px-4 rounded-md transition-all shadow-lg shadow-green-900/20 hover:shadow-green-500/30 font-medium active:scale-95"
        >
          <Download size={16} />
          {t.export}
        </button>
        <button 
          onClick={onReset}
          className="flex-none p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors border border-slate-700 hover:border-slate-600 active:scale-95"
          title={t.reset}
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};
