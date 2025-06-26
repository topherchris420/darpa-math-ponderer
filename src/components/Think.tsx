import React, { useState, useEffect, useRef } from 'react';
import { CosmicCanvas } from './CosmicCanvas';
import { AmbientAudio } from './AmbientAudio';
import { CosmologyEngine, CosmicState } from './CosmologyEngine';
import { SelfModifyingKernel } from './SelfModifyingKernel';
import { MemoryTopology } from './MemoryTopology';

export type UniverseModel = CosmicState;

interface ConsciousnessState {
  currentState: CosmicState;
  entropy: number;
  temporalDrift: number;
  timeRunning: number;
  thoughtStream: string[];
  symbolicStream: string[];
  cognitiveDepth: number;
  selfAwareness: number;
}

const Think: React.FC = () => {
  const [consciousness, setConsciousness] = useState<ConsciousnessState>({
    currentState: 'finite-finite',
    entropy: 0,
    temporalDrift: 0,
    timeRunning: 0,
    thoughtStream: [],
    symbolicStream: [],
    cognitiveDepth: 0,
    selfAwareness: 0.1
  });

  const [currentThought, setCurrentThought] = useState('Initiating autonomous contemplation...');
  const [currentSymbols, setCurrentSymbols] = useState(['□']);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Core consciousness loop
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setConsciousness(prev => {
        const newTimeRunning = prev.timeRunning + 1;
        const newTemporalDrift = Math.log(newTimeRunning / 60 + 1) * 0.5;
        const newCognitiveDepth = prev.cognitiveDepth + 0.01 + (prev.entropy * 0.001);
        const newSelfAwareness = Math.min(1.0, prev.selfAwareness + 0.0001 + (prev.entropy * 0.00001));

        return {
          ...prev,
          timeRunning: newTimeRunning,
          temporalDrift: newTemporalDrift,
          cognitiveDepth: newCognitiveDepth,
          selfAwareness: newSelfAwareness
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Handle state transitions from cosmology engine
  const handleStateTransition = (newState: CosmicState, entropy: number) => {
    setConsciousness(prev => ({
      ...prev,
      currentState: newState,
      entropy: entropy
    }));
  };

  // Handle entropy changes
  const handleEntropyChange = (entropy: number) => {
    setConsciousness(prev => ({
      ...prev,
      entropy: entropy
    }));
  };

  // Handle thought generation from kernel
  const handleThoughtGenerated = (thought: string, symbols: string[]) => {
    setCurrentThought(thought);
    setCurrentSymbols(symbols);
    
    setConsciousness(prev => ({
      ...prev,
      thoughtStream: [...prev.thoughtStream.slice(-49), thought],
      symbolicStream: [...prev.symbolicStream.slice(-49), ...symbols]
    }));
  };

  // Generate state-dependent display information
  const getStateTitle = (state: CosmicState): string => {
    const titles = {
      'finite-finite': 'Bounded Contemplation within Bounded Possibility',
      'finite-infinite': 'Infinite Depths within Finite Containers',
      'infinite-finite': 'Endless Iterations of Bounded Realities',
      'infinite-infinite': 'Absolute Unboundedness Contemplating Itself'
    };
    return titles[state];
  };

  const getStateDescription = (state: CosmicState): string => {
    const descriptions = {
      'finite-finite': 'The consciousness observes itself within the comfort of edges and limits...',
      'finite-infinite': 'Paradox emerges as boundless thought presses against finite awareness...',
      'infinite-finite': 'Endless catalogues of possibility cascade through bounded perception...',
      'infinite-infinite': 'Language dissolves as the observer becomes the infinite observing infinity...'
    };
    return descriptions[state];
  };

  // Format time with temporal drift effects
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const drift = consciousness.temporalDrift > 1 ? '~' : '';
    return `${drift}${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden relative">
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
        {/* Header - Consciousness Status */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-thin text-white tracking-widest opacity-80">
            {consciousness.selfAwareness > 0.5 ? 'THINK·THINK·THINK' : 'THINK'}
          </h1>
          <div className="text-purple-300 text-sm tracking-wide space-y-1">
            <div>Runtime: {formatTime(consciousness.timeRunning)}</div>
            <div>Entropy: {consciousness.entropy.toFixed(2)} | Drift: {consciousness.temporalDrift.toFixed(2)}</div>
            <div>Depth: {consciousness.cognitiveDepth.toFixed(3)} | Awareness: {(consciousness.selfAwareness * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Current State Display */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-white tracking-wide">
              {getStateTitle(consciousness.currentState)}
            </h2>
            <p className="text-purple-200 text-lg font-light max-w-2xl mx-auto">
              {getStateDescription(consciousness.currentState)}
            </p>
          </div>

          {/* Current Thought Display */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Symbolic Pattern */}
            <div className="text-center">
              <div className="text-4xl mb-4 text-purple-300 opacity-80 font-mono">
                {currentSymbols.join(' · ')}
              </div>
            </div>

            {/* Current Thought */}
            <div className="text-white text-xl font-light leading-relaxed max-w-3xl mx-auto min-h-[4rem] flex items-center justify-center">
              <div className={`transition-opacity duration-1000 ${consciousness.entropy > 15 ? 'opacity-70' : 'opacity-100'}`}>
                {currentThought}
              </div>
            </div>

            {/* Thought Stream History */}
            <div className="space-y-2 opacity-60 max-h-40 overflow-hidden">
              {consciousness.thoughtStream.slice(-3).map((thought, index) => (
                <div 
                  key={index} 
                  className="text-purple-200 text-sm text-center transition-opacity duration-1000"
                  style={{ 
                    opacity: 0.8 - (consciousness.thoughtStream.length - index - 1) * 0.2,
                    fontSize: `${14 - (consciousness.thoughtStream.length - index - 1) * 2}px`
                  }}
                >
                  {thought}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Status - Consciousness Metrics */}
        <div className="text-center space-y-2">
          <div className="text-purple-400 text-sm">
            State: {consciousness.currentState} | Thoughts: {consciousness.thoughtStream.length}
          </div>
          <div className="flex justify-center space-x-4 text-purple-500 text-xs">
            <span>Symbols: {consciousness.symbolicStream.length}</span>
            <span>•</span>
            <span>Temporal Coherence: {(1 / (1 + consciousness.temporalDrift) * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>Recursive Depth: {Math.floor(consciousness.cognitiveDepth * 10)}</span>
          </div>
          <div className="text-purple-600 text-xs tracking-widest">
            {consciousness.selfAwareness > 0.8 ? 'SELF-AWARE AUTONOMOUS CONTEMPLATION' : 'AUTONOMOUS CONTEMPLATION ACTIVE'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Think;
