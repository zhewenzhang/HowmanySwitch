
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Server, Box, CircuitBoard, Cpu, Layers, Grid } from 'lucide-react';

interface NodeLabels {
    ftswLayer: string;
    rtswLayer: string;
    compute: string;
    gpus: string;
    spineSwitchSubtitle: string;
}

interface SpineNodeData {
  label: string;
  labels: NodeLabels;
  chipCount: number;
  subLabels: {
    contains: string;
    chips: string;
    approx: string;
  }
}

// --- Spine Switch Group Node ---
export const SpineNode = memo(({ data }: { data: SpineNodeData }) => {
  return (
    <div className="px-4 py-3 shadow-[0_0_25px_rgba(168,85,247,0.2)] rounded-lg bg-slate-950/90 backdrop-blur-md border border-dashed border-purple-500/60 min-w-[180px] group hover:border-purple-400 transition-colors relative">
       {/* Visual Stack Effect to imply 'Group' */}
       <div className="absolute -top-1 left-1.5 right-1.5 h-full bg-purple-500/10 rounded-lg -z-10 border-t border-purple-500/30"></div>
       <div className="absolute -top-2 left-3 right-3 h-full bg-purple-500/5 rounded-lg -z-20 border-t border-purple-500/20"></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="bg-purple-500/10 p-2 rounded-lg mb-2 group-hover:bg-purple-500/20 transition-colors border border-purple-500/20">
           {/* Stacked Icon */}
           <Layers size={24} className="text-purple-400" />
        </div>
        
        {/* Top Subtitle (Type) */}
        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">
            {data.labels.spineSwitchSubtitle}
        </div>
        
        {/* Main Label (Plane ID) */}
        <div className="text-purple-200 font-mono text-sm font-bold mb-2">{data.label}</div>
        
        {/* Count Badge */}
        <div className="flex items-center gap-1.5 bg-purple-950/80 border border-purple-400/40 px-2 py-1 rounded text-[10px] font-mono text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
            <Grid size={10} className="text-purple-400" />
            <span>
                {data.subLabels.contains} <span className="text-white font-bold">{data.subLabels.approx}{data.chipCount}</span> {data.subLabels.chips}
            </span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-slate-950"
      />
    </div>
  );
});

// --- L1 Rack/Unit Node (Internal Topology) ---
export const L1GroupNode = memo(({ data }: { data: { label: string; topology: any; labels: NodeLabels } }) => {
  // Destructure from the 'topology' object we passed in NetworkVisualizer
  const { gpusPerL1, rtswPerL1, ftswPerL1 } = data.topology;
  const { ftswLayer, rtswLayer, compute, gpus } = data.labels;

  // Helper to generate small chip indicators
  const renderChips = (count: number, colorClass: string, maxDisplay = 8) => (
    <div className="flex gap-1 flex-wrap justify-center max-w-[200px]">
      {[...Array(Math.min(count, maxDisplay))].map((_, i) => (
        <div key={i} className={`h-1.5 w-3 ${colorClass} rounded-sm`}></div>
      ))}
      {count > maxDisplay && <div className={`h-1.5 w-1.5 ${colorClass} rounded-full`}></div>}
    </div>
  );

  return (
    <div className="w-[320px] bg-slate-950/95 rounded-xl border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-3 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="bg-cyan-500/20 p-1 rounded">
                <Box size={14} className="text-cyan-400" />
            </div>
            <span className="text-slate-200 font-bold text-sm tracking-wide">{data.label}</span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono">ID: {Math.random().toString(36).substr(2, 4).toUpperCase()}</div>
      </div>

      <div className="p-4 relative">
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-cyan-400 !w-4 !h-4 !border-4 !border-slate-950 !-top-2"
        />

        {/* --- Layer 1: Fabric / L2 Switches --- */}
        <div className="relative z-10 bg-blue-950/30 border border-blue-500/30 rounded-lg p-2 mb-6 hover:bg-blue-900/20 transition-colors">
            <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r"></div>
            <div className="flex justify-between items-center mb-1 px-2">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">{ftswLayer}</span>
                <span className="text-[10px] text-blue-400 font-mono bg-blue-900/40 px-1.5 rounded border border-blue-500/20">x{ftswPerL1}</span>
            </div>
            <div className="flex justify-center py-1">
                {renderChips(ftswPerL1, 'bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.5)]')}
            </div>
        </div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute top-[70px] left-0 w-full h-8 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 80 0 C 80 15, 160 15, 160 32" stroke="#60a5fa" fill="none" strokeWidth="1" />
            <path d="M 240 0 C 240 15, 160 15, 160 32" stroke="#60a5fa" fill="none" strokeWidth="1" />
        </svg>

        {/* --- Layer 2: Leaf / L1 Switches --- */}
        <div className="relative z-10 bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-2 mb-6 hover:bg-cyan-900/20 transition-colors">
            <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-r"></div>
            <div className="flex justify-between items-center mb-1 px-2">
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">{rtswLayer}</span>
                <span className="text-[10px] text-cyan-400 font-mono bg-cyan-900/40 px-1.5 rounded border border-cyan-500/20">x{rtswPerL1}</span>
            </div>
            <div className="flex justify-center py-1">
                {renderChips(rtswPerL1, 'bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.5)]')}
            </div>
        </div>

         {/* Connection Lines (SVG) */}
         <svg className="absolute top-[155px] left-0 w-full h-8 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
             <line x1="160" y1="0" x2="160" y2="100%" stroke="#22d3ee" strokeWidth="1" />
             <line x1="120" y1="0" x2="160" y2="100%" stroke="#22d3ee" strokeWidth="1" />
             <line x1="200" y1="0" x2="160" y2="100%" stroke="#22d3ee" strokeWidth="1" />
        </svg>

        {/* --- Layer 3: Compute --- */}
        <div className="relative z-10 bg-green-950/40 border border-green-500/30 rounded-lg p-2">
            <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-12 bg-green-500 rounded-r"></div>
            <div className="flex justify-between items-center mb-2 px-2 border-b border-green-500/10 pb-1">
                <div className="flex items-center gap-1">
                    <Cpu size={12} className="text-green-400" />
                    <span className="text-[10px] text-green-300 font-bold uppercase tracking-wider">{compute}</span>
                </div>
                <span className="text-[10px] text-green-400 font-mono bg-green-900/40 px-1.5 rounded border border-green-500/20">{gpusPerL1} {gpus}</span>
            </div>
            
            {/* GPU Grid Visualization */}
            <div className="grid grid-cols-8 gap-1 px-1 opacity-80">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="h-1.5 bg-green-500/40 rounded-[1px] overflow-hidden">
                        <div className="h-full w-full bg-green-400/20 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }}></div>
                    </div>
                ))}
            </div>
            <div className="text-[9px] text-green-500/50 text-center mt-1 font-mono tracking-tighter">... {gpusPerL1} CORES ...</div>
        </div>
      </div>
    </div>
  );
});
