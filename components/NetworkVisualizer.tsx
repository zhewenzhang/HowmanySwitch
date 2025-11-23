
import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionMode,
} from 'reactflow';
import { SpineNode, L1GroupNode } from './CustomNodes';
import { NetworkConfig } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface NetworkVisualizerProps {
  config: NetworkConfig;
  lang: Language;
}

const nodeTypes = {
  spineNode: SpineNode,
  l1Node: L1GroupNode,
};

export const NetworkVisualizer: React.FC<NetworkVisualizerProps> = ({ config, lang }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const t = TRANSLATIONS[lang];

  // Recalculate layout when config changes or language changes
  useEffect(() => {
    // Representative Visualization Strategy
    // Top Row: Spine Group (Representative)
    // Bottom Row: L1 Units (3 representative units)

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    const spineY = 50;
    const l1Y = 300;
    const centerX = 600;
    const spineSpacing = 200;
    const l1Spacing = 320;

    const labels = {
        ftswLayer: t.ftswLayer,
        rtswLayer: t.rtswLayer,
        compute: t.compute,
        gpus: t.gpus,
        spineSwitchSubtitle: t.spineSwitchSubtitle
    };

    // 1. Generate Spine Nodes (Representative set of 3-5)
    const spineCount = 3; 
    for (let i = 0; i < spineCount; i++) {
      const id = `spine-${i}`;
      const xOffset = (i - (spineCount - 1) / 2) * spineSpacing;
      
      newNodes.push({
        id,
        type: 'spineNode',
        position: { x: centerX + xOffset - 75, y: spineY }, // -75 center align (width 150)
        data: { 
            label: `${t.spineLayer} ${i + 1}`,
            labels
        },
      });
    }

    // 2. Generate L1 Unit Nodes (Representative set: Unit 1, Unit 2 ... Unit N)
    const l1Count = 3;
    for (let i = 0; i < l1Count; i++) {
      const isLast = i === l1Count - 1;
      const id = `l1-${i}`;
      const xOffset = (i - (l1Count - 1) / 2) * l1Spacing;
      const label = isLast ? `${t.l1Unit} #${config.l1Units}` : `${t.l1Unit} #${i + 1}`;
      
      newNodes.push({
        id,
        type: 'l1Node',
        position: { x: centerX + xOffset - 140, y: l1Y }, // -140 center align (width 280)
        data: { 
            label, 
            config,
            labels
        },
      });

      // 3. Create Edges
      // Full mesh representation: Connect every spine node to every L1 node
      // Use animated green lines
      for (let j = 0; j < spineCount; j++) {
         newEdges.push({
            id: `e-s${j}-l${i}`,
            source: `spine-${j}`,
            target: id,
            animated: true,
            style: { stroke: '#4ade80', strokeWidth: 1.5, opacity: 0.6 },
            type: 'default',
         });
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [config, lang, setNodes, setEdges]); // Added lang dependency

  return (
    <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-slate-900/80 border border-slate-700 rounded text-xs text-slate-400 backdrop-blur pointer-events-none">
            {t.repView}
        </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls 
            className="bg-slate-800 border border-slate-700 text-slate-200 fill-slate-200" 
        />
      </ReactFlow>
    </div>
  );
};
