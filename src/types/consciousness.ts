
export interface ConsciousnessState {
  currentState: CosmicState;
  entropy: number;
  temporalDrift: number;
  timeRunning: number;
  thoughtStream: string[];
  symbolicStream: string[];
  cognitiveDepth: number;
  selfAwareness: number;
}

export type CosmicState = 'finite-finite' | 'finite-infinite' | 'infinite-finite' | 'infinite-infinite';

export type UniverseModel = CosmicState;
