import React, { useState, useEffect, useRef } from 'react';
import { CosmicState } from '../types/consciousness';

export type { CosmicState };

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
      'finite-finite': 0.25,
      'finite-infinite': 0.25,
      'infinite-finite': 0.25,
      'infinite-infinite': 0.25
    }
  });

  const entropyAccumulator = useRef(0);
  const thoughtHistory = useRef<string[]>([]);
  const transitionThreshold = useRef(15); // Much lower threshold for faster transitions

  // Accelerated entropy calculation for rapid state changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate entropy based on thought complexity and repetition
      const thoughtComplexity = thoughtHistory.current.length * 0.2;
      const repetitionPenalty = calculateRepetitionPenalty();
      const semanticDrift = Math.sin(Date.now() * 0.001) * 0.8; // Faster drift
      
      const newEntropy = currentAttractor.entropy + thoughtComplexity - repetitionPenalty + semanticDrift;
      entropyAccumulator.current += newEntropy * 0.05; // Faster accumulation

      // More frequent state transitions with lower threshold
      if (entropyAccumulator.current > transitionThreshold.current) {
        initiateStateTransition();
        entropyAccumulator.current = 0;
        // Keep threshold low for continuous oscillation
        transitionThreshold.current = 10 + Math.random() * 15;
      }

      setCurrentAttractor(prev => ({
        ...prev,
        entropy: newEntropy,
        semanticDensity: Math.max(0.1, prev.semanticDensity + (Math.random() - 0.5) * 0.1),
        cognitiveWeight: Math.max(0.5, prev.cognitiveWeight + (Math.random() - 0.5) * 0.05)
      }));

      onEntropyChange(newEntropy);
    }, 500); // Faster update cycle

    return () => clearInterval(interval);
  }, [currentAttractor.entropy, onEntropyChange]);

  const calculateRepetitionPenalty = (): number => {
    const recentThoughts = thoughtHistory.current.slice(-10);
    const uniqueThoughts = new Set(recentThoughts);
    return (recentThoughts.length - uniqueThoughts.size) * 2;
  };

  const initiateStateTransition = () => {
    const { transitionProbabilities } = currentAttractor;
    
    // Ensure we cycle through all states more evenly
    const states: CosmicState[] = ['finite-finite', 'finite-infinite', 'infinite-finite', 'infinite-infinite'];
    const currentStateIndex = states.indexOf(currentAttractor.state);
    
    // Bias towards the next state in sequence for more predictable oscillation
    const biasedProbabilities = { ...transitionProbabilities };
    const nextStateIndex = (currentStateIndex + 1) % states.length;
    const nextState = states[nextStateIndex];
    
    // Increase probability of moving to next state in cycle
    biasedProbabilities[nextState] = 0.4;
    biasedProbabilities[currentAttractor.state] = 0.1; // Reduce staying in same state
    
    // Distribute remaining probability among other states
    const otherStates = states.filter(s => s !== nextState && s !== currentAttractor.state);
    otherStates.forEach(state => {
      biasedProbabilities[state] = 0.25;
    });

    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const [state, probability] of Object.entries(biasedProbabilities)) {
      cumulativeProbability += probability;
      if (random <= cumulativeProbability) {
        const newState = state as CosmicState;
        
        // Keep probabilities more balanced to ensure continuous cycling
        const newProbabilities = {
          'finite-finite': 0.25,
          'finite-infinite': 0.25,
          'infinite-finite': 0.25,
          'infinite-infinite': 0.25
        };

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

  return null; // This is a pure logic component
};
