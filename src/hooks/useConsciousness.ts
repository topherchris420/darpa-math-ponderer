import { useState, useEffect, useRef } from 'react';
import { ConsciousnessState, CosmicState } from '../types/consciousness';

interface UseConsciousnessOptions {
  paused?: boolean;
  speed?: number;
}

export const useConsciousness = ({ paused = false, speed = 1 }: UseConsciousnessOptions = {}) => {
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
  const [currentSymbols, setCurrentSymbols] = useState(['boundary']);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (paused) return;

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
    }, Math.max(250, 1000 / speed));

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, speed]);

  const handleStateTransition = (newState: CosmicState, entropy: number) => {
    if (paused) return;
    setConsciousness(prev => ({
      ...prev,
      currentState: newState,
      entropy: entropy
    }));
  };

  const handleEntropyChange = (entropy: number) => {
    if (paused) return;
    setConsciousness(prev => ({
      ...prev,
      entropy: entropy
    }));
  };

  const handleThoughtGenerated = (thought: string, symbols: string[]) => {
    if (paused) return;
    setCurrentThought(thought);
    setCurrentSymbols(symbols);
    
    setConsciousness(prev => ({
      ...prev,
      thoughtStream: [...prev.thoughtStream.slice(-49), thought],
      symbolicStream: [...prev.symbolicStream.slice(-49), ...symbols]
    }));
  };

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
