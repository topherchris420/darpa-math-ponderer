
export interface MemoryNode {
  id: string;
  concept: string;
  x: number;
  y: number;
  z: number;
  weight: number;
  connections: string[];
  age: number;
  semanticDensity: number;
}

export interface TopologyProps {
  thoughts: string[];
  entropy: number;
  temporalDrift: number;
}
