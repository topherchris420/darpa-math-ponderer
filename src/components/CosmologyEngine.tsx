import React, { useEffect, useRef, useState } from 'react';
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
  paused?: boolean;
  speed?: number;
}

export const CosmologyEngine: React.FC<CosmologyEngineProps> = ({
  onStateTransition,
  onEntropyChange,
  paused = false,
  speed = 1,
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
      'infinite-infinite': 0.25,
    },
  });

  const entropyAccumulator = useRef(0);
  const thoughtHistory = useRef<string[]>([]);
  const transitionThreshold = useRef(15);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const thoughtComplexity = thoughtHistory.current.length * 0.2;
      const repetitionPenalty = calculateRepetitionPenalty();
      const semanticDrift = Math.sin(Date.now() * 0.001) * 0.8;
      const newEntropy = currentAttractor.entropy + thoughtComplexity - repetitionPenalty + semanticDrift;

      entropyAccumulator.current += newEntropy * 0.05;

      if (entropyAccumulator.current > transitionThreshold.current) {
        initiateStateTransition();
        entropyAccumulator.current = 0;
        transitionThreshold.current = 10 + Math.random() * 15;
      }

      setCurrentAttractor((prev) => ({
        ...prev,
        entropy: newEntropy,
        semanticDensity: Math.max(0.1, prev.semanticDensity + (Math.random() - 0.5) * 0.1),
        cognitiveWeight: Math.max(0.5, prev.cognitiveWeight + (Math.random() - 0.5) * 0.05),
      }));

      onEntropyChange(newEntropy);
    }, Math.max(150, 500 / speed));

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Cosmology interval owns attractor transition cadence
  }, [currentAttractor.entropy, onEntropyChange, paused, speed]);

  const calculateRepetitionPenalty = (): number => {
    const recentThoughts = thoughtHistory.current.slice(-10);
    const uniqueThoughts = new Set(recentThoughts);
    return (recentThoughts.length - uniqueThoughts.size) * 2;
  };

  const initiateStateTransition = () => {
    const states: CosmicState[] = ['finite-finite', 'finite-infinite', 'infinite-finite', 'infinite-infinite'];
    const currentStateIndex = states.indexOf(currentAttractor.state);
    const nextStateIndex = (currentStateIndex + 1) % states.length;
    const nextState = states[nextStateIndex];
    const biasedProbabilities = { ...currentAttractor.transitionProbabilities };

    biasedProbabilities[nextState] = 0.4;
    biasedProbabilities[currentAttractor.state] = 0.1;
    states
      .filter((state) => state !== nextState && state !== currentAttractor.state)
      .forEach((state) => {
        biasedProbabilities[state] = 0.25;
      });

    const random = Math.random();
    let cumulativeProbability = 0;

    for (const [state, probability] of Object.entries(biasedProbabilities)) {
      cumulativeProbability += probability;
      if (random <= cumulativeProbability) {
        const newState = state as CosmicState;
        const newProbabilities = {
          'finite-finite': 0.25,
          'finite-infinite': 0.25,
          'infinite-finite': 0.25,
          'infinite-infinite': 0.25,
        };

        setCurrentAttractor((prev) => ({
          ...prev,
          state: newState,
          transitionProbabilities: newProbabilities,
          entropy: 0,
        }));

        onStateTransition(newState, currentAttractor.entropy);
        break;
      }
    }
  };

  return null;
};
