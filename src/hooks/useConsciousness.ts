
import { useState, useEffect, useRef } from 'react';
import { ConsciousnessState, CosmicState } from '../types/consciousness';

export const useConsciousness = () => {
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

  // Format time with temporal drift effects
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const drift = consciousness.temporalDrift > 1 ? '~' : '';
    return `${drift}${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    consciousness,
    currentThought,
    currentSymbols,
    handleStateTransition,
    handleEntropyChange,
    handleThoughtGenerated,
    formatTime
  };
};
