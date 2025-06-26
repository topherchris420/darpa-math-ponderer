
import React, { useState } from 'react';
import { CosmologyEngine } from './CosmologyEngine';
import { SelfModifyingKernel } from './SelfModifyingKernel';
import { ConsciousnessDisplay } from './consciousness/ConsciousnessDisplay';
import { ThinkingControls } from './ThinkingControls';
import { ThoughtHistory } from './ThoughtHistory';
import { LoadingTransition } from './LoadingTransition';
import { ErrorBoundary } from './ErrorBoundary';
import { useEnhancedConsciousness } from '../hooks/useEnhancedConsciousness';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

export type UniverseModel = 'finite-finite' | 'finite-infinite' | 'infinite-finite' | 'infinite-infinite';

const Think: React.FC = () => {
  const {
    consciousness,
    currentThought,
    currentSymbols,
    isPaused,
    thinkingSpeed,
    isTransitioning,
    nextState,
    handleStateTransition,
    handleEntropyChange,
    handleThoughtGenerated,
    togglePause,
    resetConsciousness,
    setThinkingSpeed,
    formatTime
  } = useEnhancedConsciousness();

  const [showHistory, setShowHistory] = useState(false);

  // Keyboard controls
  useKeyboardControls({
    onTogglePause: togglePause,
    onReset: resetConsciousness,
    onShowHistory: () => setShowHistory(true),
    onSpeedChange: setThinkingSpeed,
    currentSpeed: thinkingSpeed
  });

  return (
    <ErrorBoundary>
      {/* Cosmology Engine - Enhanced with pause support */}
      <CosmologyEngine 
        onStateTransition={handleStateTransition}
        onEntropyChange={handleEntropyChange}
      />
      
      {/* Self-Modifying Kernel - Enhanced with pause support */}
      <SelfModifyingKernel 
        currentState={consciousness.currentState}
        entropy={consciousness.entropy}
        onThoughtGenerated={handleThoughtGenerated}
        temporalDrift={consciousness.temporalDrift}
      />

      {/* Loading Transition */}
      <LoadingTransition 
        isTransitioning={isTransitioning}
        currentState={consciousness.currentState}
        nextState={nextState || undefined}
      />

      {/* Consciousness Display */}
      <ConsciousnessDisplay 
        consciousness={consciousness}
        currentThought={currentThought}
        currentSymbols={currentSymbols}
        formatTime={formatTime}
        isPaused={isPaused}
        thinkingSpeed={thinkingSpeed}
      />

      {/* Enhanced Controls */}
      <ThinkingControls
        isPaused={isPaused}
        onTogglePause={togglePause}
        onReset={resetConsciousness}
        onShowHistory={() => setShowHistory(true)}
        thinkingSpeed={thinkingSpeed}
        onSpeedChange={setThinkingSpeed}
      />

      {/* Thought History Browser */}
      <ThoughtHistory
        thoughts={consciousness.thoughtStream}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />

      {/* Keyboard shortcuts help */}
      <div className="fixed bottom-4 right-4 text-xs text-purple-500 opacity-50 space-y-1">
        <div>Space: Pause/Resume</div>
        <div>H: History</div>
        <div>1/2/3: Speed</div>
        <div>Ctrl+R: Reset</div>
      </div>
    </ErrorBoundary>
  );
};

export default Think;
