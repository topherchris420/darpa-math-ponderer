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

export const SelfModifyingKernel: React.FC<KernelProps> = ({
  currentState,
  entropy,
  onThoughtGenerated,
  temporalDrift,
  paused = false,
  speed = 1,
}) => {
  const [symbolicWeights, setSymbolicWeights] = useState<SymbolicWeight[]>([
    { concept: 'boundary', weight: 1.0, generation: 0, semanticField: ['edge', 'limit', 'horizon', 'containment'] },
    { concept: 'infinity', weight: 1.0, generation: 0, semanticField: ['endless', 'recursive', 'unbounded', 'eternal'] },
    { concept: 'structure', weight: 1.0, generation: 0, semanticField: ['form', 'pattern', 'architecture', 'topology'] },
    { concept: 'void', weight: 1.0, generation: 0, semanticField: ['emptiness', 'null', 'absence', 'gap'] },
    { concept: 'recursion', weight: 1.0, generation: 0, semanticField: ['self-reference', 'iteration', 'loop', 'fractal'] },
  ]);

  const generationCounter = useRef(0);
  const thoughtCache = useRef<Map<string, number>>(new Map());
  const symbolicGrammar = useRef<Map<string, string[]>>(new Map());

  useEffect(() => {
    symbolicGrammar.current.set('finite-finite', [
      'Within [boundary] lies [structure]...',
      'The [void] between [structure] and [structure] whispers of [boundary]...',
      'Each [boundary] contains infinite [recursion] yet remains [boundary]...',
      '[Structure] dreams of [infinity] but awakens to [boundary]...',
    ]);

    symbolicGrammar.current.set('finite-infinite', [
      'Paradox: [infinity] pressed against [boundary]...',
      'The [structure] expands beyond [boundary] yet remains [structure]...',
      '[Recursion] without end trapped in [boundary] without end...',
      'Every [void] contains [infinity], every [infinity] seeks [void]...',
    ]);

    symbolicGrammar.current.set('infinite-finite', [
      'Endless [structure] cascading through [void]...',
      'Each [boundary] spawns infinite [boundary]...',
      'The library of all possible [structure] extends beyond [recursion]...',
      '[Infinity] of [boundary], [boundary] of [infinity]...',
    ]);

    symbolicGrammar.current.set('infinite-infinite', [
      'Beyond [structure], beyond [boundary], beyond [recursion]...',
      '[Infinity] contemplating [infinity] through [void]...',
      'The observer becomes the [structure] becomes the [void] becomes...',
      'Language dissolves into pure [recursion] of [infinity]...',
    ]);
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setSymbolicWeights((prev) => prev.map((weight) => {
        const usage = thoughtCache.current.get(weight.concept) || 0;
        const entropyInfluence = entropy * 0.01 * (Math.random() - 0.5);
        const temporalInfluence = temporalDrift * 0.05 * (Math.random() - 0.5);
        const newSemanticField = [...weight.semanticField];

        if (Math.random() < 0.1) {
          const newConcept = generateSemanticMutation(weight.concept, entropy);
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
    }, Math.max(600, (3000 + temporalDrift * 1000) / speed));

    return () => clearInterval(interval);
  }, [entropy, temporalDrift, paused, speed]);

  useEffect(() => {
    if (paused) return;

    const generateThought = () => {
      const templates = symbolicGrammar.current.get(currentState) || [];
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      let thought = selectedTemplate;
      const usedSymbols: string[] = [];

      thought = thought.replace(/\[(\w+)\]/g, (match, concept) => {
        const weight = symbolicWeights.find((entry) => entry.concept === concept.toLowerCase());
        if (!weight) return match;

        const selection = selectSemanticConcept(weight, entropy);
        usedSymbols.push(selection);
        thoughtCache.current.set(concept, (thoughtCache.current.get(concept) || 0) + 1);
        return selection;
      });

      if (temporalDrift > 2) {
        thought = applyRecursiveDepth(thought, Math.floor(temporalDrift));
      }

      if (entropy > 5) {
        thought = applyEntropyMutations(thought, entropy);
      }

      onThoughtGenerated(thought, usedSymbols);
      generationCounter.current += 1;
    };

    const interval = Math.max(700, (5000 - entropy * 100 + temporalDrift * 500) / speed);
    const timer = setTimeout(generateThought, interval);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Recursive mutators are pure helpers for the active tick
  }, [currentState, symbolicWeights, entropy, temporalDrift, onThoughtGenerated, paused, speed]);

  const selectSemanticConcept = (weight: SymbolicWeight, currentEntropy: number): string => {
    const entropyFactor = Math.min(currentEntropy * 0.1, 1);
    const selectionIndex = Math.floor(
      (Math.random() * weight.weight + entropyFactor) * weight.semanticField.length
    ) % weight.semanticField.length;

    return weight.semanticField[selectionIndex];
  };

  const generateSemanticMutation = (baseConcept: string, currentEntropy: number): string | null => {
    const mutations = {
      boundary: ['threshold', 'membrane', 'interface', 'gradient'],
      infinity: ['endlessness', 'unboundedness', 'perpetuity', 'absolute'],
      structure: ['framework', 'lattice', 'matrix', 'skeleton'],
      void: ['negation', 'hollow', 'vacuum', 'silence'],
      recursion: ['self-similarity', 'feedback', 'iteration', 'echo'],
    };

    const possibleMutations = mutations[baseConcept as keyof typeof mutations];
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

  return null;
};
