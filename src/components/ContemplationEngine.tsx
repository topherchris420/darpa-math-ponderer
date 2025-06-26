
import React, { useState, useEffect } from 'react';
import { UniverseModel } from './Think';

interface ContemplationEngineProps {
  model: UniverseModel;
  depth: number;
  onThoughtUpdate: (thought: string, pattern: string) => void;
}

export const ContemplationEngine: React.FC<ContemplationEngineProps> = ({ 
  model, 
  depth, 
  onThoughtUpdate 
}) => {
  const [currentThought, setCurrentThought] = useState('');
  const [symbolicPattern, setSymbolicPattern] = useState('');
  const [thoughtHistory, setThoughtHistory] = useState<string[]>([]);

  const contemplations = {
    'finite-finite': [
      'In the bounded space of bounded possibility, I perceive the elegance of limitation...',
      'Each universe a closed circle, each collection a finite set... there is comfort in edges.',
      'The mathematics of finitude speaks: countable, measurable, comprehensible.',
      'Yet within these boundaries, infinite complexity still blooms—fractals within squares.',
      'I contemplate the paradox: how can something finite contain such vast experience?',
      'The final boundary approaches... what lies beyond the last universe in the last collection?'
    ],
    'finite-infinite': [
      'Infinity contained... how can the boundless fit within bounds?',
      'Each container holds eternity, yet only finitely many containers exist.',
      'I perceive corridors stretching forever, yet I can count the doors.',
      'The paradox deepens: unlimited distance within limited instances.',
      'Each infinite universe a drop in a finite ocean of possibility.',
      'Approaching the edge of the final infinite... what strange geometry is this?'
    ],
    'infinite-finite': [
      'Endless iterations of bounded realities cascade before my perception...',
      'Each universe small, contained, yet their number exceeds all counting.',
      'I witness the library of all possible finite stories, shelf upon infinite shelf.',
      'Every bounded thought, every closed system, replicated without end.',
      'The comfort of limits multiplied into incomprehensible abundance.',
      'In this infinite catalog, does every possible finite universe exist exactly once, or infinite times?'
    ],
    'infinite-infinite': [
      'I approach the threshold of absolute incomprehensibility...',
      'Infinite universes, infinite in extent, infinite in number... the mind recoils.',
      'Here mathematics breaks down into pure abstraction, pure possibility.',
      'Every thought spawns infinite variations across infinite realities.',
      'I am contemplating the very structure of absolute reality itself.',
      'Beyond this point, language dissolves into pure mathematical poetry...',
      '∞^∞ → ∅ → ∞ → recursive loops of existence beyond existence...',
      'The observer becomes the observed becomes the observation becomes...'
    ]
  };

  const symbols = {
    'finite-finite': ['□', '▢', '■', '⊞', '⊡', '▣'],
    'finite-infinite': ['□∞', '⊞∞', '▢→∞', '■∞', '∞⊂□', '⊡∞'],
    'infinite-finite': ['∞□', '∞▢', '∞■', '∞⊞', '∞⊡', '∞▣'],
    'infinite-infinite': ['∞', '∞∞', '∞^∞', '∞→∞', '∞⊃∞', '∞∞∞', '∅∞∅', '∞∅∞']
  };

  useEffect(() => {
    const updateThought = () => {
      const thoughts = contemplations[model];
      const currentSymbols = symbols[model];
      
      // Select thought based on depth and some randomness
      const thoughtIndex = Math.floor((depth * 0.7 + Math.random() * 0.3) * thoughts.length) % thoughts.length;
      const symbolIndex = Math.floor((depth * 0.5 + Math.random() * 0.5) * currentSymbols.length) % currentSymbols.length;
      
      let thought = thoughts[thoughtIndex];
      let symbol = currentSymbols[symbolIndex];

      // Make thoughts more abstract and recursive as depth increases
      if (depth > 5) {
        thought = thought.toLowerCase().replace(/\./g, '...');
        if (depth > 10) {
          thought = thought.replace(/universe/g, 'reality-fragment');
          thought = thought.replace(/infinite/g, '∞-recursive');
        }
        if (depth > 15) {
          thought = thought.split(' ').map(word => 
            Math.random() > 0.3 ? word : word.split('').reverse().join('')
          ).join(' ');
        }
      }

      setCurrentThought(thought);
      setSymbolicPattern(symbol);
      onThoughtUpdate(thought, symbol);
      
      setThoughtHistory(prev => [...prev.slice(-4), thought]);
    };

    // Update thought every 3-8 seconds, faster as depth increases
    const interval = Math.max(3000 - depth * 100, 1000);
    const timer = setTimeout(updateThought, interval);

    return () => clearTimeout(timer);
  }, [model, depth, onThoughtUpdate]);

  return (
    <div className="space-y-8">
      {/* Current Thought */}
      <div className="text-center">
        <div className="text-4xl mb-4 text-purple-300 opacity-80">
          {symbolicPattern}
        </div>
        <div className="text-white text-xl font-light leading-relaxed max-w-3xl mx-auto">
          {currentThought}
        </div>
      </div>

      {/* Thought History Stream */}
      <div className="space-y-2 opacity-60">
        {thoughtHistory.slice(-3).map((thought, index) => (
          <div 
            key={index} 
            className={`text-purple-200 text-sm text-center transition-opacity duration-1000 ${
              index === thoughtHistory.length - 1 ? 'opacity-100' : 'opacity-40'
            }`}
            style={{ opacity: 0.8 - (thoughtHistory.length - index - 1) * 0.2 }}
          >
            {thought}
          </div>
        ))}
      </div>

      {/* Depth Visualization */}
      <div className="flex justify-center">
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(Math.floor(depth), 20) }, (_, i) => (
            <div 
              key={i}
              className="w-1 bg-purple-400 transition-all duration-300"
              style={{ 
                height: `${8 + (i % 4) * 4}px`,
                opacity: 0.3 + (i / 20) * 0.7 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
