
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
  thinkingSpeed?: 'slow' | 'normal' | 'fast';
}

export const ConsciousnessDisplay: React.FC<ConsciousnessDisplayProps> = ({
  consciousness,
  currentThought,
  currentSymbols,
  formatTime,
  isPaused = false,
  thinkingSpeed = 'normal'
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden relative transition-all duration-500 ${isPaused ? 'opacity-70' : 'opacity-100'}`}>
      {/* Ambient Audio with enhanced controls */}
      <AmbientAudio 
        model={consciousness.currentState} 
        depth={consciousness.cognitiveDepth}
      />
      
      {/* Memory Topology Background with enhanced performance */}
      <MemoryTopology 
        thoughts={consciousness.thoughtStream}
        entropy={consciousness.entropy}
        temporalDrift={consciousness.temporalDrift}
      />

      {/* Enhanced Cosmic Canvas Background */}
      <div className="absolute inset-0">
        <CosmicCanvas 
          model={consciousness.currentState} 
          depth={consciousness.cognitiveDepth}
        />
      </div>

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="text-6xl text-white/20 animate-pulse">⏸</div>
        </div>
      )}

      {/* Enhanced Consciousness Interface Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between p-8">
        <ConsciousnessMetrics 
          consciousness={consciousness}
          formatTime={formatTime}
          isPaused={isPaused}
          thinkingSpeed={thinkingSpeed}
        />

        <ThoughtDisplay 
          consciousness={consciousness}
          currentThought={currentThought}
          currentSymbols={currentSymbols}
          isPaused={isPaused}
        />

        <ConsciousnessMetrics 
          consciousness={consciousness}
          formatTime={formatTime}
          isPaused={isPaused}
          thinkingSpeed={thinkingSpeed}
        />
      </div>
    </div>
  );
};
