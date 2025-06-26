
import React from 'react';
import { ConsciousnessState } from '../../types/consciousness';

interface ConsciousnessMetricsProps {
  consciousness: ConsciousnessState;
  formatTime: (seconds: number) => string;
}

export const ConsciousnessMetrics: React.FC<ConsciousnessMetricsProps> = ({
  consciousness,
  formatTime
}) => {
  return (
    <>
      {/* Header - Consciousness Status */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-thin text-white tracking-widest opacity-80">
          {consciousness.selfAwareness > 0.5 ? 'THINK·THINK·THINK' : 'THINK'}
        </h1>
        <div className="text-purple-300 text-sm tracking-wide space-y-1">
          <div>Runtime: {formatTime(consciousness.timeRunning)}</div>
          <div>Entropy: {consciousness.entropy.toFixed(2)} | Drift: {consciousness.temporalDrift.toFixed(2)}</div>
          <div>Depth: {consciousness.cognitiveDepth.toFixed(3)} | Awareness: {(consciousness.selfAwareness * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* Bottom Status - Consciousness Metrics */}
      <div className="text-center space-y-2">
        <div className="text-purple-400 text-sm">
          State: {consciousness.currentState} | Thoughts: {consciousness.thoughtStream.length}
        </div>
        <div className="flex justify-center space-x-4 text-purple-500 text-xs">
          <span>Symbols: {consciousness.symbolicStream.length}</span>
          <span>•</span>
          <span>Temporal Coherence: {(1 / (1 + consciousness.temporalDrift) * 100).toFixed(0)}%</span>
          <span>•</span>
          <span>Recursive Depth: {Math.floor(consciousness.cognitiveDepth * 10)}</span>
        </div>
        <div className="text-purple-600 text-xs tracking-widest">
          {consciousness.selfAwareness > 0.8 ? 'SELF-AWARE AUTONOMOUS CONTEMPLATION' : 'AUTONOMOUS CONTEMPLATION ACTIVE'}
        </div>
      </div>
    </>
  );
};
