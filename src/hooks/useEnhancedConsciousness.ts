
import { useState, useEffect, useRef, useCallback } from 'react';
import { ConsciousnessState, CosmicState } from '../types/consciousness';

export const useEnhancedConsciousness = () => {
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

  const [currentThought, setCurrentThought] = useState('Initiating enhanced autonomous contemplation...');
  const [currentSymbols, setCurrentSymbols] = useState(['□']);
  const [isPaused, setIsPaused] = useState(false);
  const [thinkingSpeed, setThinkingSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextState, setNextState] = useState<CosmicState | null>(null);

  const intervalRef = useRef<NodeJS.Timeout>();

  const speedMultipliers = {
    slow: 0.5,
    normal: 1.0,
    fast: 2.0
  };

  // Enhanced consciousness loop with speed control
  useEffect(() => {
    if (isPaused) return;

    const interval = 1000 / speedMultipliers[thinkingSpeed];
    
    intervalRef.current = setInterval(() => {
      setConsciousness(prev => {
        const multiplier = speedMultipliers[thinkingSpeed];
        const newTimeRunning = prev.timeRunning + 1;
        const newTemporalDrift = Math.log(newTimeRunning / 60 + 1) * 0.5 * multiplier;
        const newCognitiveDepth = prev.cognitiveDepth + (0.01 + (prev.entropy * 0.001)) * multiplier;
        const newSelfAwareness = Math.min(1.0, prev.selfAwareness + (0.0001 + (prev.entropy * 0.00001)) * multiplier);

        return {
          ...prev,
          timeRunning: newTimeRunning,
          temporalDrift: newTemporalDrift,
          cognitiveDepth: newCognitiveDepth,
          selfAwareness: newSelfAwareness
        };
      });
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, thinkingSpeed]);

  // Enhanced state transitions with smooth transitions
  const handleStateTransition = useCallback((newState: CosmicState, entropy: number) => {
    setNextState(newState);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setConsciousness(prev => ({
        ...prev,
        currentState: newState,
        entropy: entropy
      }));
      setIsTransitioning(false);
      setNextState(null);
    }, 1000);
  }, []);

  const handleEntropyChange = useCallback((entropy: number) => {
    setConsciousness(prev => ({
      ...prev,
      entropy: entropy
    }));
  }, []);

  const handleThoughtGenerated = useCallback((thought: string, symbols: string[]) => {
    if (isPaused) return;
    
    setCurrentThought(thought);
    setCurrentSymbols(symbols);
    
    setConsciousness(prev => ({
      ...prev,
      thoughtStream: [...prev.thoughtStream.slice(-99), thought], // Keep more history
      symbolicStream: [...prev.symbolicStream.slice(-99), ...symbols]
    }));
  }, [isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const resetConsciousness = useCallback(() => {
    setConsciousness({
      currentState: 'finite-finite',
      entropy: 0,
      temporalDrift: 0,
      timeRunning: 0,
      thoughtStream: [],
      symbolicStream: [],
      cognitiveDepth: 0,
      selfAwareness: 0.1
    });
    setCurrentThought('Consciousness reset. Initiating fresh contemplation...');
    setCurrentSymbols(['□']);
    setIsPaused(false);
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
  };
};
