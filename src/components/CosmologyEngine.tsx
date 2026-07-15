import React, { useEffect, useRef } from 'react';
import { CosmicState } from '../types/consciousness';

export type { CosmicState };

interface CosmologicalAttractor {
  state: CosmicState;
  entropy: number;
  semanticDensity: number;
  cognitiveWeight: number;
}

interface CosmologyEngineProps {
  onStateTransition: (newState: CosmicState, entropy: number) => void;
  onEntropyChange: (entropy: number) => void;
  paused?: boolean;
  speed?: number;
}

const COSMIC_STATES: CosmicState[] = ['finite-finite', 'finite-infinite', 'infinite-finite', 'infinite-infinite'];

const ENTROPY_MIN = 0;
const ENTROPY_MAX = 12;

export const CosmologyEngine: React.FC<CosmologyEngineProps> = ({
  onStateTransition,
  onEntropyChange,
  paused = false,
  speed = 1,
}) => {
  // The attractor never drives rendering (this component returns null), so it
  // lives in a ref and the simulation interval survives entropy churn intact.
  const attractor = useRef<CosmologicalAttractor>({
    state: 'finite-finite',
    entropy: 0,
    semanticDensity: 1.0,
    cognitiveWeight: 1.0,
  });

  const entropyAccumulator = useRef(0);
  const transitionThreshold = useRef(15);

  const callbacks = useRef({ onStateTransition, onEntropyChange });
  useEffect(() => {
    callbacks.current = { onStateTransition, onEntropyChange };
  }, [onStateTransition, onEntropyChange]);

  useEffect(() => {
    if (paused) return;

    const pickNextState = (current: CosmicState): CosmicState => {
      const favored = COSMIC_STATES[(COSMIC_STATES.indexOf(current) + 1) % COSMIC_STATES.length];
      const probabilities = COSMIC_STATES.map((state) => {
        if (state === favored) return 0.4;
        if (state === current) return 0.1;
        return 0.25;
      });

      let random = Math.random();
      for (let index = 0; index < COSMIC_STATES.length; index++) {
        random -= probabilities[index];
        if (random <= 0) return COSMIC_STATES[index];
      }
      return favored;
    };

    const interval = setInterval(() => {
      const current = attractor.current;
      const semanticDrift = Math.sin(Date.now() * 0.001) * 0.8;
      const newEntropy = Math.max(ENTROPY_MIN, Math.min(ENTROPY_MAX, current.entropy + semanticDrift + 0.05));

      entropyAccumulator.current += newEntropy * 0.05;

      if (entropyAccumulator.current > transitionThreshold.current) {
        const nextState = pickNextState(current.state);
        entropyAccumulator.current = 0;
        transitionThreshold.current = 10 + Math.random() * 15;

        attractor.current = {
          ...current,
          state: nextState,
          entropy: 0,
        };

        callbacks.current.onStateTransition(nextState, newEntropy);
      } else {
        attractor.current = {
          ...current,
          entropy: newEntropy,
          semanticDensity: Math.max(0.1, current.semanticDensity + (Math.random() - 0.5) * 0.1),
          cognitiveWeight: Math.max(0.5, current.cognitiveWeight + (Math.random() - 0.5) * 0.05),
        };
      }

      callbacks.current.onEntropyChange(attractor.current.entropy);
    }, Math.max(150, 500 / speed));

    return () => clearInterval(interval);
  }, [paused, speed]);

  return null;
};
