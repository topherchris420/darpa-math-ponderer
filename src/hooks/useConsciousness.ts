import { useState, useEffect, useCallback } from 'react';
import { ConsciousnessState, CosmicState } from '../types/consciousness';

interface UseConsciousnessOptions {
  paused?: boolean;
  speed?: number;
}

const THOUGHT_STREAM_LIMIT = 50;

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

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
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

    return () => clearInterval(interval);
  }, [paused, speed]);

  const handleStateTransition = useCallback((newState: CosmicState, entropy: number) => {
    setConsciousness(prev => ({
      ...prev,
      currentState: newState,
      entropy: entropy
    }));
  }, []);

  const handleEntropyChange = useCallback((entropy: number) => {
    setConsciousness(prev => ({
      ...prev,
      entropy: entropy
    }));
  }, []);

  const handleThoughtGenerated = useCallback((thought: string, symbols: string[]) => {
    setCurrentThought(thought);
    setCurrentSymbols(symbols);

    setConsciousness(prev => ({
      ...prev,
      thoughtStream: [...prev.thoughtStream.slice(-(THOUGHT_STREAM_LIMIT - 1)), thought],
      symbolicStream: [...prev.symbolicStream.slice(-(THOUGHT_STREAM_LIMIT - 1)), ...symbols]
    }));
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const drift = consciousness.temporalDrift > 1 ? '~' : '';
    return `${drift}${minutes}:${secs.toString().padStart(2, '0')}`;
  }, [consciousness.temporalDrift]);

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
