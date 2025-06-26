
import React from 'react';
import { CosmologyEngine } from './CosmologyEngine';
import { SelfModifyingKernel } from './SelfModifyingKernel';
import { ConsciousnessDisplay } from './consciousness/ConsciousnessDisplay';
import { useConsciousness } from '../hooks/useConsciousness';

export type UniverseModel = 'finite-finite' | 'finite-infinite' | 'infinite-finite' | 'infinite-infinite';

const Think: React.FC = () => {
  const {
    consciousness,
    currentThought,
    currentSymbols,
    handleStateTransition,
    handleEntropyChange,
    handleThoughtGenerated,
    formatTime
  } = useConsciousness();

  return (
    <>
      {/* Cosmology Engine - Pure Logic */}
      <CosmologyEngine 
        onStateTransition={handleStateTransition}
        onEntropyChange={handleEntropyChange}
      />
      
      {/* Self-Modifying Kernel - Pure Logic */}
      <SelfModifyingKernel 
        currentState={consciousness.currentState}
        entropy={consciousness.entropy}
        onThoughtGenerated={handleThoughtGenerated}
        temporalDrift={consciousness.temporalDrift}
      />

      {/* Consciousness Display */}
      <ConsciousnessDisplay 
        consciousness={consciousness}
        currentThought={currentThought}
        currentSymbols={currentSymbols}
        formatTime={formatTime}
      />
    </>
  );
};

export default Think;
