
import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Infinity, Square, Circle, Triangle } from 'lucide-react';

interface InfluenceNode {
  id: string;
  concept: string;
  influence: number;
  position: { x: number; y: number };
  connections: string[];
  resonance: number;
}

interface ThoughtInfluenceSystemProps {
  onInfluenceChange: (influences: Record<string, number>) => void;
  currentEntropy: number;
}

export const ThoughtInfluenceSystem: React.FC<ThoughtInfluenceSystemProps> = ({
  onInfluenceChange,
  currentEntropy
}) => {
  const [influences, setInfluences] = useState<Record<string, number>>({
    boundary: 0,
    infinity: 0,
    structure: 0,
    void: 0,
    recursion: 0,
    paradox: 0
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [resonanceField, setResonanceField] = useState<InfluenceNode[]>([]);

  useEffect(() => {
    // Initialize resonance field
    const nodes: InfluenceNode[] = [
      { id: 'boundary', concept: 'Boundary', influence: 0, position: { x: 50, y: 20 }, connections: ['structure', 'void'], resonance: 0 },
      { id: 'infinity', concept: 'Infinity', influence: 0, position: { x: 80, y: 40 }, connections: ['recursion', 'paradox'], resonance: 0 },
      { id: 'structure', concept: 'Structure', influence: 0, position: { x: 20, y: 60 }, connections: ['boundary', 'recursion'], resonance: 0 },
      { id: 'void', concept: 'Void', influence: 0, position: { x: 70, y: 80 }, connections: ['boundary', 'paradox'], resonance: 0 },
      { id: 'recursion', concept: 'Recursion', influence: 0, position: { x: 40, y: 70 }, connections: ['infinity', 'structure'], resonance: 0 },
      { id: 'paradox', concept: 'Paradox', influence: 0, position: { x: 90, y: 25 }, connections: ['infinity', 'void'], resonance: 0 }
    ];
    setResonanceField(nodes);
  }, []);

  const handleInfluenceChange = (concept: string, value: number) => {
    const newInfluences = { ...influences, [concept]: value };
    setInfluences(newInfluences);
    onInfluenceChange(newInfluences);

    // Update resonance field
    setResonanceField(prev => prev.map(node => {
      if (node.id === concept) {
        return { ...node, influence: value, resonance: value * 0.8 };
      }
      // Propagate influence to connected nodes
      if (node.connections.includes(concept)) {
        const propagatedResonance = Math.min(node.resonance + value * 0.3, 1);
        return { ...node, resonance: propagatedResonance };
      }
      return { ...node, resonance: node.resonance * 0.95 }; // Decay
    }));
  };

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'boundary': return Square;
      case 'infinity': return Infinity;
      case 'structure': return Triangle;
      case 'void': return Circle;
      case 'recursion': return Sparkles;
      case 'paradox': return Brain;
      default: return Circle;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className={`bg-slate-900/90 backdrop-blur-sm rounded-lg border border-purple-500/30 transition-all duration-500 ${
        isExpanded ? 'w-80 h-96' : 'w-12 h-12'
      }`}>
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-2 right-2 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors"
        >
          <Brain size={16} className="text-white" />
        </button>

        {isExpanded && (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-purple-200 text-sm font-medium mb-3 text-center">
              Thought Influence Field
            </h3>

            {/* Resonance Field Visualization */}
            <div className="relative flex-1 mb-4 bg-slate-800/50 rounded border border-purple-500/20">
              {resonanceField.map(node => {
                const Icon = getConceptIcon(node.id);
                return (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                      left: `${node.position.x}%`,
                      top: `${node.position.y}%`,
                      opacity: 0.6 + node.resonance * 0.4,
                      transform: `translate(-50%, -50%) scale(${0.8 + node.resonance * 0.4})`
                    }}
                  >
                    <div className="relative">
                      <Icon 
                        size={16} 
                        className="text-purple-400"
                        style={{ filter: `hue-rotate(${node.resonance * 180}deg)` }}
                      />
                      {/* Resonance Ring */}
                      <div 
                        className="absolute inset-0 border border-purple-400 rounded-full animate-pulse"
                        style={{ 
                          transform: `scale(${1 + node.resonance * 2})`,
                          opacity: node.resonance * 0.5
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {resonanceField.flatMap(node => 
                  node.connections.map(connectionId => {
                    const connectedNode = resonanceField.find(n => n.id === connectionId);
                    if (!connectedNode) return null;
                    
                    const strength = (node.resonance + connectedNode.resonance) / 2;
                    return (
                      <line
                        key={`${node.id}-${connectionId}`}
                        x1={`${node.position.x}%`}
                        y1={`${node.position.y}%`}
                        x2={`${connectedNode.position.x}%`}
                        y2={`${connectedNode.position.y}%`}
                        stroke="rgba(168, 85, 247, 0.3)"
                        strokeWidth={1 + strength * 2}
                        opacity={0.2 + strength * 0.6}
                        className="transition-all duration-300"
                      />
                    );
                  }).filter(Boolean)
                )}
              </svg>
            </div>

            {/* Influence Controls */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(influences).map(([concept, value]) => {
                const Icon = getConceptIcon(concept);
                return (
                  <div key={concept} className="flex items-center space-x-2">
                    <Icon size={12} className="text-purple-400 flex-shrink-0" />
                    <span className="text-xs text-purple-200 capitalize flex-shrink-0 w-16">
                      {concept}
                    </span>
                    <input
                      type="range"
                      min={-1}
                      max={1}
                      step={0.1}
                      value={value}
                      onChange={(e) => handleInfluenceChange(concept, parseFloat(e.target.value))}
                      className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/50"
                    />
                    <span className="text-xs text-purple-300 w-8 text-right">
                      {value.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Entropy Indicator */}
            <div className="mt-2 text-xs text-purple-300 text-center">
              Entropy: {currentEntropy.toFixed(1)} 
              <span className={`ml-2 ${currentEntropy > 10 ? 'text-red-400' : currentEntropy > 5 ? 'text-yellow-400' : 'text-green-400'}`}>
                {currentEntropy > 10 ? '⚡ Chaotic' : currentEntropy > 5 ? '🌊 Active' : '🧘 Stable'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
