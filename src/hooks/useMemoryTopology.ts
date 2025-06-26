
import { useState, useEffect } from 'react';
import { MemoryNode } from '../types/memoryTopology';
import { updateMemoryNodes } from '../utils/memoryUtils';

export const useMemoryTopology = (
  thoughts: string[],
  dimensions: { width: number; height: number }
) => {
  const [memoryNodes, setMemoryNodes] = useState<MemoryNode[]>([]);

  // Update memory topology based on new thoughts
  useEffect(() => {
    if (thoughts.length === 0) return;

    const latestThought = thoughts[thoughts.length - 1];
    setMemoryNodes(prev => updateMemoryNodes(prev, latestThought, dimensions));
  }, [thoughts, dimensions]);

  return { memoryNodes };
};
