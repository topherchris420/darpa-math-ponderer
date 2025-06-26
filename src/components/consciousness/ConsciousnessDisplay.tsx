
import React from 'react';
import { CosmicCanvas } from '../CosmicCanvas';
import { AmbientAudio } from '../AmbientAudio';
import { MemoryTopology } from '../MemoryTopology';
import { ConsciousnessMetrics } from './ConsciousnessMetrics';
import { ThoughtDisplay } from './ThoughtDisplay';
import { ConsciousnessState } from '../../types/consciousness';

interface ConsciousnessDisplayProps {
  consciousness: ConsciousnessState;
  currentThought: string;
  currentSymbols: string[];
  formatTime: (seconds: number) => string;
}

export const ConsciousnessDisplay: React.FC<ConsciousnessDisplayProps> = ({
  consciousness,
  currentThought,
  currentSymbols,
  formatTime
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden relative">
      {/* Ambient Audio */}
      <AmbientAudio 
        model={consciousness.currentState} 
        depth={consciousness.cognitiveDepth} 
      />
      
      {/* Memory Topology Background */}
      <MemoryTopology 
        thoughts={consciousness.thoughtStream}
        entropy={consciousness.entropy}
        temporalDrift={consciousness.temporalDrift}
      />

      {/* Cosmic Canvas Background */}
      <div className="absolute inset-0">
        <CosmicCanvas 
          model={consciousness.currentState} 
          depth={consciousness.cognitiveDepth} 
        />
      </div>

      {/* Consciousness Interface Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between p-8">
        <ConsciousnessMetrics 
          consciousness={consciousness}
          formatTime={formatTime}
        />

        <ThoughtDisplay 
          consciousness={consciousness}
          currentThought={currentThought}
          currentSymbols={currentSymbols}
        />

        <ConsciousnessMetrics 
          consciousness={consciousness}
          formatTime={formatTime}
        />
      </div>
    </div>
  );
};
