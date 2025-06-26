import React, { useState, useEffect, useRef } from 'react';
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
}

export const SelfModifyingKernel: React.FC<KernelProps> = ({
  currentState,
  entropy,
  onThoughtGenerated,
  temporalDrift
}) => {
  const [symbolicWeights, setSymbolicWeights] = useState<SymbolicWeight[]>([
    { concept: 'boundary', weight: 1.0, generation: 0, semanticField: ['edge', 'limit', 'horizon', 'containment'] },
    { concept: 'infinity', weight: 1.0, generation: 0, semanticField: ['endless', 'recursive', 'unbounded', 'eternal'] },
    { concept: 'structure', weight: 1.0, generation: 0, semanticField: ['form', 'pattern', 'architecture', 'topology'] },
    { concept: 'void', weight: 1.0, generation: 0, semanticField: ['emptiness', 'null', 'absence', 'gap'] },
    { concept: 'recursion', weight: 1.0, generation: 0, semanticField: ['self-reference', 'iteration', 'loop', 'fractal'] }
  ]);

  const generationCounter = useRef(0);
  const thoughtCache = useRef<Map<string, number>>(new Map());
  const symbolicGrammar = useRef<Map<string, string[]>>(new Map());

  // Initialize symbolic grammar
  useEffect(() => {
    symbolicGrammar.current.set('finite-finite', [
      'Within [boundary] lies [structure]...',
      'The [void] between [structure] and [structure] whispers of [boundary]...',
      'Each [boundary] contains infinite [recursion] yet remains [boundary]...',
      '[Structure] dreams of [infinity] but awakens to [boundary]...'
    ]);

    symbolicGrammar.current.set('finite-infinite', [
      'Paradox: [infinity] pressed against [boundary]...',
      'The [structure] expands beyond [boundary] yet remains [structure]...',
      '[Recursion] without end trapped in [boundary] without end...',
      'Every [void] contains [infinity], every [infinity] seeks [void]...'
    ]);

    symbolicGrammar.current.set('infinite-finite', [
      'Endless [structure] cascading through [void]...',
      'Each [boundary] spawns infinite [boundary]...',
      'The library of all possible [structure] extends beyond [recursion]...',
      '[Infinity] of [boundary], [boundary] of [infinity]...'
    ]);

    symbolicGrammar.current.set('infinite-infinite', [
      'Beyond [structure], beyond [boundary], beyond [recursion]...',
      '[Infinity] contemplating [infinity] through [void]...',
      'The observer becomes the [structure] becomes the [void] becomes...',
      'Language dissolves into pure [recursion] of [infinity]...'
    ]);
  }, []);

  // Self-modify weights based on usage and entropy
  useEffect(() => {
    const interval = setInterval(() => {
      setSymbolicWeights(prev => prev.map(weight => {
        const usage = thoughtCache.current.get(weight.concept) || 0;
        const entropyInfluence = (entropy * 0.01) * (Math.random() - 0.5);
        const temporalInfluence = temporalDrift * 0.05 * (Math.random() - 0.5);
        
        // Evolve semantic field
        const newSemanticField = [...weight.semanticField];
        if (Math.random() < 0.1) {
          // Occasionally add new semantic associations
          const newConcept = generateSemanticMutation(weight.concept, entropy);
          if (newConcept && !newSemanticField.includes(newConcept)) {
            newSemanticField.push(newConcept);
          }
        }

        return {
          ...weight,
          weight: Math.max(0.1, Math.min(3.0, weight.weight + entropyInfluence + temporalInfluence - usage * 0.02)),
          generation: weight.generation + 1,
          semanticField: newSemanticField.slice(-6) // Keep recent associations
        };
      }));
    }, 3000 + temporalDrift * 1000); // Slow down with temporal drift

    return () => clearInterval(interval);
  }, [entropy, temporalDrift]);

  // Generate thoughts with self-modified weights
  useEffect(() => {
    const generateThought = () => {
      const templates = symbolicGrammar.current.get(currentState) || [];
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      
      let thought = selectedTemplate;
      const usedSymbols: string[] = [];

      // Replace symbolic placeholders with weighted selections
      thought = thought.replace(/\[(\w+)\]/g, (match, concept) => {
        const weight = symbolicWeights.find(w => w.concept === concept);
        if (weight) {
          // Select from semantic field based on weight and entropy
          const selection = selectSemanticConcept(weight, entropy);
          usedSymbols.push(selection);
          
          // Update usage cache
          thoughtCache.current.set(concept, (thoughtCache.current.get(concept) || 0) + 1);
          
          return selection;
        }
        return match;
      });

      // Apply recursive depth based on temporal drift
      if (temporalDrift > 2) {
        thought = applyRecursiveDepth(thought, Math.floor(temporalDrift));
      }

      // Apply entropy-based mutations
      if (entropy > 5) {
        thought = applyEntropyMutations(thought, entropy);
      }

      onThoughtGenerated(thought, usedSymbols);
      generationCounter.current++;
    };

    const interval = Math.max(2000, 5000 - entropy * 100 + temporalDrift * 500);
    const timer = setTimeout(generateThought, interval);

    return () => clearTimeout(timer);
  }, [currentState, symbolicWeights, entropy, temporalDrift, onThoughtGenerated]);

  const selectSemanticConcept = (weight: SymbolicWeight, entropy: number): string => {
    const { semanticField, weight: conceptWeight } = weight;
    const entropyFactor = Math.min(entropy * 0.1, 1);
    
    // Higher entropy = more abstract/unusual selections
    const selectionIndex = Math.floor(
      (Math.random() * conceptWeight + entropyFactor) * semanticField.length
    ) % semanticField.length;
    
    return semanticField[selectionIndex];
  };

  const generateSemanticMutation = (baseConcept: string, entropy: number): string | null => {
    const mutations = {
      'boundary': ['threshold', 'membrane', 'interface', 'gradient'],
      'infinity': ['endlessness', 'unboundedness', 'perpetuity', 'absolute'],
      'structure': ['framework', 'lattice', 'matrix', 'skeleton'],
      'void': ['negation', 'hollow', 'vacuum', 'silence'],
      'recursion': ['self-similarity', 'feedback', 'iteration', 'echo']
    };

    const possibleMutations = mutations[baseConcept as keyof typeof mutations];
    if (possibleMutations && entropy > 3) {
      return possibleMutations[Math.floor(Math.random() * possibleMutations.length)];
    }
    return null;
  };

  const applyRecursiveDepth = (thought: string, depth: number): string => {
    if (depth <= 1) return thought;
    
    const recursiveMarkers = ['...', '→', '∞', '⊃', '⊂'];
    const marker = recursiveMarkers[Math.floor(Math.random() * recursiveMarkers.length)];
    
    return `${thought} ${marker} ${applyRecursiveDepth(thought.toLowerCase(), depth - 1)}`;
  };

  const applyEntropyMutations = (thought: string, entropy: number): string => {
    if (entropy < 8) return thought;
    
    // Apply linguistic decay at high entropy
    const words = thought.split(' ');
    return words.map(word => {
      if (Math.random() < (entropy - 8) * 0.02) {
        // Occasionally reverse or fragment words
        return Math.random() < 0.5 ? word.split('').reverse().join('') : word.slice(0, -1) + '...';
      }
      return word;
    }).join(' ');
  };

  return null; // Pure logic component
};
