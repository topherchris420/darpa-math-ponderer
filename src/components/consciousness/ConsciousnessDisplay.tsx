
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
  isPaused?: boolean;
}

export const ConsciousnessDisplay: React.FC<ConsciousnessDisplayProps> = ({
  consciousness,
  currentThought,
  currentSymbols,
  formatTime,
  isPaused = false
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

      {/* Mobile-Optimized Consciousness Interface Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8">
        {/* Top Metrics - Hidden on small screens */}
        <div className="hidden sm:block">
          <ConsciousnessMetrics 
            consciousness={consciousness}
            formatTime={formatTime}
          />
        </div>

        {/* Main Thought Display */}
        <ThoughtDisplay 
          consciousness={consciousness}
          currentThought={currentThought}
          currentSymbols={currentSymbols}
          isPaused={isPaused}
        />

        {/* Bottom Metrics - Simplified on mobile */}
        <ConsciousnessMetrics 
          consciousness={consciousness}
          formatTime={formatTime}
        />
      </div>
    </div>
  );
};
