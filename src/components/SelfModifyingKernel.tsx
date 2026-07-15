import React, { useEffect, useRef, useState } from 'react';
import { CosmicState } from '../types/consciousness';

interface SymbolicWeight {
  concept: string;
  weight: number;
  generation: number;
  semanticField: string[];
}

interface KernelProps {
  currentState: CosmicState;
  entropy: number;
  onThoughtGenerated: (thought: string, symbols: string[]) => void;
  temporalDrift: number;
  paused?: boolean;
  speed?: number;
}

const SYMBOLIC_GRAMMAR: Record<CosmicState, string[]> = {
  'finite-finite': [
    'Within [boundary] lies [structure]...',
    'The [void] between [structure] and [structure] whispers of [boundary]...',
    'Each [boundary] contains infinite [recursion] yet remains [boundary]...',
    '[Structure] dreams of [infinity] but awakens to [boundary]...',
  ],
  'finite-infinite': [
    'Paradox: [infinity] pressed against [boundary]...',
    'The [structure] expands beyond [boundary] yet remains [structure]...',
    '[Recursion] without end trapped in [boundary] without end...',
    'Every [void] contains [infinity], every [infinity] seeks [void]...',
  ],
  'infinite-finite': [
    'Endless [structure] cascading through [void]...',
    'Each [boundary] spawns infinite [boundary]...',
    'The library of all possible [structure] extends beyond [recursion]...',
    '[Infinity] of [boundary], [boundary] of [infinity]...',
  ],
  'infinite-infinite': [
    'Beyond [structure], beyond [boundary], beyond [recursion]...',
    '[Infinity] contemplating [infinity] through [void]...',
    'The observer becomes the [structure] becomes the [void] becomes...',
    'Language dissolves into pure [recursion] of [infinity]...',
  ],
};

const SEMANTIC_MUTATIONS: Record<string, string[]> = {
  boundary: ['threshold', 'membrane', 'interface', 'gradient'],
  infinity: ['endlessness', 'unboundedness', 'perpetuity', 'absolute'],
  structure: ['framework', 'lattice', 'matrix', 'skeleton'],
  void: ['negation', 'hollow', 'vacuum', 'silence'],
  recursion: ['self-similarity', 'feedback', 'iteration', 'echo'],
};

const INITIAL_WEIGHTS: SymbolicWeight[] = [
  { concept: 'boundary', weight: 1.0, generation: 0, semanticField: ['edge', 'limit', 'horizon', 'containment'] },
  { concept: 'infinity', weight: 1.0, generation: 0, semanticField: ['endless', 'recursive', 'unbounded', 'eternal'] },
  { concept: 'structure', weight: 1.0, generation: 0, semanticField: ['form', 'pattern', 'architecture', 'topology'] },
  { concept: 'void', weight: 1.0, generation: 0, semanticField: ['emptiness', 'null', 'absence', 'gap'] },
  { concept: 'recursion', weight: 1.0, generation: 0, semanticField: ['self-reference', 'iteration', 'loop', 'fractal'] },
];

const selectSemanticConcept = (weight: SymbolicWeight, currentEntropy: number): string => {
  const entropyFactor = Math.min(currentEntropy * 0.1, 1);
  const selectionIndex = Math.floor(
    (Math.random() * weight.weight + entropyFactor) * weight.semanticField.length
  ) % weight.semanticField.length;

  return weight.semanticField[selectionIndex];
};

const generateSemanticMutation = (baseConcept: string, currentEntropy: number): string | null => {
  const possibleMutations = SEMANTIC_MUTATIONS[baseConcept];
  if (possibleMutations && currentEntropy > 3) {
    return possibleMutations[Math.floor(Math.random() * possibleMutations.length)];
  }
  return null;
};

const applyRecursiveDepth = (thought: string, depth: number): string => {
  if (depth <= 1) return thought;

  const recursiveMarkers = ['...', '->', 'inf', 'contains', 'subset'];
  const marker = recursiveMarkers[Math.floor(Math.random() * recursiveMarkers.length)];

  return `${thought} ${marker} ${applyRecursiveDepth(thought.toLowerCase(), depth - 1)}`;
};

const applyEntropyMutations = (thought: string, currentEntropy: number): string => {
  if (currentEntropy < 8) return thought;

  return thought
    .split(' ')
    .map((word) => {
      if (Math.random() < (currentEntropy - 8) * 0.02) {
        return Math.random() < 0.5 ? word.split('').reverse().join('') : `${word.slice(0, -1)}...`;
      }
      return word;
    })
    .join(' ');
};

export const SelfModifyingKernel: React.FC<KernelProps> = ({
  currentState,
  entropy,
  onThoughtGenerated,
  temporalDrift,
  paused = false,
  speed = 1,
}) => {
  const [symbolicWeights, setSymbolicWeights] = useState<SymbolicWeight[]>(INITIAL_WEIGHTS);

  const generationCounter = useRef(0);
  const thoughtCache = useRef<Map<string, number>>(new Map());

  // The cosmology engine updates entropy faster than any timer here fires, so
  // timers read the latest values from refs instead of restarting on each change.
  const liveState = useRef({ currentState, entropy, temporalDrift, symbolicWeights, onThoughtGenerated });
  useEffect(() => {
    liveState.current = { currentState, entropy, temporalDrift, symbolicWeights, onThoughtGenerated };
  }, [currentState, entropy, temporalDrift, symbolicWeights, onThoughtGenerated]);

  // Evolve symbolic weights on a stable cadence.
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const { entropy: currentEntropy, temporalDrift: drift } = liveState.current;

      setSymbolicWeights((prev) => prev.map((weight) => {
        const usage = thoughtCache.current.get(weight.concept) || 0;
        const entropyInfluence = currentEntropy * 0.01 * (Math.random() - 0.5);
        const temporalInfluence = drift * 0.05 * (Math.random() - 0.5);
        const newSemanticField = [...weight.semanticField];

        if (Math.random() < 0.1) {
          const newConcept = generateSemanticMutation(weight.concept, currentEntropy);
          if (newConcept && !newSemanticField.includes(newConcept)) {
            newSemanticField.push(newConcept);
          }
        }

        return {
          ...weight,
          weight: Math.max(0.1, Math.min(3.0, weight.weight + entropyInfluence + temporalInfluence - usage * 0.02)),
          generation: weight.generation + 1,
          semanticField: newSemanticField.slice(-6),
        };
      }));
    }, Math.max(600, 3000 / speed));

    return () => clearInterval(interval);
  }, [paused, speed]);

  // Generate thoughts on a self-rescheduling timer so the pace can respond to
  // entropy and drift without the timer being torn down before it fires.
  useEffect(() => {
    if (paused) return;

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const scheduleNext = (delay: number) => {
      timer = setTimeout(() => {
        if (cancelled) return;
        generateThought();
        scheduleNext(nextInterval());
      }, delay);
    };

    const nextInterval = () => {
      const { entropy: currentEntropy, temporalDrift: drift } = liveState.current;
      return Math.max(700, Math.min(9000, (5000 - currentEntropy * 100 + drift * 500) / speed));
    };

    const generateThought = () => {
      const { currentState: state, entropy: currentEntropy, temporalDrift: drift, symbolicWeights: weights, onThoughtGenerated: emit } = liveState.current;
      const templates = SYMBOLIC_GRAMMAR[state] || [];
      if (templates.length === 0) return;

      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      const usedSymbols: string[] = [];

      let thought = selectedTemplate.replace(/\[(\w+)\]/g, (match, concept) => {
        const weight = weights.find((entry) => entry.concept === concept.toLowerCase());
        if (!weight) return match;

        const selection = selectSemanticConcept(weight, currentEntropy);
        usedSymbols.push(selection);
        thoughtCache.current.set(concept, (thoughtCache.current.get(concept) || 0) + 1);
        return selection;
      });

      if (drift > 2) {
        thought = applyRecursiveDepth(thought, Math.min(4, Math.floor(drift)));
      }

      if (currentEntropy > 5) {
        thought = applyEntropyMutations(thought, currentEntropy);
      }

      emit(thought, usedSymbols);
      generationCounter.current += 1;
    };

    scheduleNext(1200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [paused, speed]);

  return null;
};
