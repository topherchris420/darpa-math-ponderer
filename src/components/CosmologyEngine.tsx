import React, { useState, useEffect, useRef } from 'react';
import { CosmicState } from '../types/consciousness';

interface CosmologicalAttractor {
  state: CosmicState;
  entropy: number;
  semanticDensity: number;
  cognitiveWeight: number;
  transitionProbabilities: Record<CosmicState, number>;
}

interface CosmologyEngineProps {
  onStateTransition: (newState: CosmicState, entropy: number) => void;
  onEntropyChange: (entropy: number) => void;
}

export const CosmologyEngine: React.FC<CosmologyEngineProps> = ({ 
  onStateTransition, 
  onEntropyChange 
}) => {
  const [currentAttractor, setCurrentAttractor] = useState<CosmologicalAttractor>({
    state: 'finite-finite',
    entropy: 0,
    semanticDensity: 1.0,
    cognitiveWeight: 1.0,
    transitionProbabilities: {
      'finite-finite': 0.4,
      'finite-infinite': 0.3,
      'infinite-finite': 0.2,
      'infinite-infinite': 0.1
    }
  });

  const entropyAccumulator = useRef(0);
  const thoughtHistory = useRef<string[]>([]);
  const transitionThreshold = useRef(100);

  // Self-modifying entropy calculation
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate entropy based on thought complexity and repetition
      const thoughtComplexity = thoughtHistory.current.length * 0.1;
      const repetitionPenalty = calculateRepetitionPenalty();
      const semanticDrift = Math.sin(Date.now() * 0.0001) * 0.5;
      
      const newEntropy = currentAttractor.entropy + thoughtComplexity - repetitionPenalty + semanticDrift;
      entropyAccumulator.current += newEntropy * 0.01;

      // State transition based on entropy threshold
      if (entropyAccumulator.current > transitionThreshold.current) {
        initiateStateTransition();
        entropyAccumulator.current = 0;
        // Self-modify threshold for next transition
        transitionThreshold.current = 80 + Math.random() * 60;
      }

      setCurrentAttractor(prev => ({
        ...prev,
        entropy: newEntropy,
        semanticDensity: Math.max(0.1, prev.semanticDensity + (Math.random() - 0.5) * 0.05),
        cognitiveWeight: Math.max(0.5, prev.cognitiveWeight + (Math.random() - 0.5) * 0.02)
      }));

      onEntropyChange(newEntropy);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAttractor.entropy, onEntropyChange]);

  const calculateRepetitionPenalty = (): number => {
    const recentThoughts = thoughtHistory.current.slice(-10);
    const uniqueThoughts = new Set(recentThoughts);
    return (recentThoughts.length - uniqueThoughts.size) * 2;
  };

  const initiateStateTransition = () => {
    const { transitionProbabilities } = currentAttractor;
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const [state, probability] of Object.entries(transitionProbabilities)) {
      cumulativeProbability += probability;
      if (random <= cumulativeProbability) {
        const newState = state as CosmicState;
        
        // Self-modify transition probabilities based on current state
        const newProbabilities = { ...transitionProbabilities };
        Object.keys(newProbabilities).forEach(key => {
          if (key === newState) {
            newProbabilities[key as CosmicState] *= 0.8; // Reduce self-transition
          } else {
            newProbabilities[key as CosmicState] *= 1.05; // Increase others
          }
        });

        // Normalize probabilities
        const sum = Object.values(newProbabilities).reduce((a, b) => a + b, 0);
        Object.keys(newProbabilities).forEach(key => {
          newProbabilities[key as CosmicState] /= sum;
        });

        setCurrentAttractor(prev => ({
          ...prev,
          state: newState,
          transitionProbabilities: newProbabilities,
          entropy: 0
        }));

        onStateTransition(newState, currentAttractor.entropy);
        break;
      }
    }
  };

  // Method to receive thought feedback
  const processThoughtFeedback = (thought: string) => {
    thoughtHistory.current.push(thought);
    if (thoughtHistory.current.length > 100) {
      thoughtHistory.current = thoughtHistory.current.slice(-50);
    }
  };

  // Remove the useImperativeHandle - it's not needed and was causing the error
  // The processThoughtFeedback method can be accessed through other means if needed

  return null; // This is a pure logic component
};
