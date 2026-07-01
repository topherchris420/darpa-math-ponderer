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
    <div className="min-h-[calc(100vh-4.25rem)] bg-slate-950 overflow-hidden relative">
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
      <div className="relative z-20 min-h-[calc(100vh-4.25rem)] flex flex-col justify-between p-4 sm:p-6 md:p-8">
        {/* Top Metrics - Hidden on small screens */}
        <div className="hidden md:block">
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
        <div className="block md:hidden">
          <ConsciousnessMetrics 
            consciousness={consciousness}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
};
