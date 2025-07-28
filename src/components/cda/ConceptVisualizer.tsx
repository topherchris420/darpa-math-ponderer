import React from 'react';

const mockData = {
  nodes: [
    { id: 'root', label: 'Primary Objective', x: 400, y: 50 },
    { id: 'strategy1', label: 'Strategy A', x: 200, y: 200 },
    { id: 'strategy2', label: 'Strategy B', x: 600, y: 200 },
    { id: 'risk1', label: 'Risk X', x: 200, y: 350 },
    { id: 'risk2', label: 'Risk Y', x: 600, y: 350 },
    { id: 'mitigation1', label: 'Mitigation 1', x: 200, y: 500 },
  ],
  edges: [
    { from: 'root', to: 'strategy1' },
    { from: 'root', to: 'strategy2' },
    { from: 'strategy1', to: 'risk1' },
    { from: 'strategy2', to: 'risk2' },
    { from: 'risk1', to: 'mitigation1' },
  ],
};

const ConceptVisualizer = () => {
  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-purple-500/30">
      <h2 className="text-lg font-light text-white mb-4">Concept Visualizer</h2>
      <svg width="100%" height="600" className="bg-slate-800/50 rounded-lg">
        {mockData.edges.map((edge, i) => {
          const fromNode = mockData.nodes.find(node => node.id === edge.from);
          const toNode = mockData.nodes.find(node => node.id === edge.to);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#4A5568"
              strokeWidth="2"
            />
          );
        })}
        {mockData.nodes.map(node => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <circle cx="0" cy="0" r="10" fill="#8B5CF6" />
            <text
              x="15"
              y="5"
              fill="#E2E8F0"
              fontSize="14"
              className="font-light"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ConceptVisualizer;
