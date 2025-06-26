
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
  // Dynamic visual indicators based on consciousness state
  const getEntropyColor = (entropy: number) => {
    if (entropy < 5) return 'text-blue-400';
    if (entropy < 10) return 'text-purple-400';
    if (entropy < 15) return 'text-pink-400';
    return 'text-red-400';
  };

  const getAwarenessIndicator = (awareness: number) => {
    if (awareness > 0.8) return '◉◉◉';
    if (awareness > 0.5) return '◉◉○';
    if (awareness > 0.2) return '◉○○';
    return '○○○';
  };

  return (
    <>
      {/* Header - Enhanced Consciousness Status */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-thin text-white tracking-widest opacity-80 relative">
          <span className="animate-pulse">
            {consciousness.selfAwareness > 0.5 ? 'THINK·THINK·THINK' : 'THINK'}
          </span>
          {consciousness.entropy > 10 && (
            <span className="absolute -top-2 -right-2 text-xs text-purple-400 animate-bounce">
              ∞
            </span>
          )}
        </h1>
        
        {/* Enhanced Real-time Metrics */}
        <div className="text-purple-300 text-sm tracking-wide space-y-2">
          <div className="flex justify-center items-center space-x-6">
            <div className="animate-pulse">
              Runtime: <span className="font-mono text-white">{formatTime(consciousness.timeRunning)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Thinking:</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 h-4 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-8 text-xs">
            <div className={`${getEntropyColor(consciousness.entropy)} transition-colors duration-500`}>
              Entropy: <span className="font-mono">{consciousness.entropy.toFixed(2)}</span>
            </div>
            <div className="text-cyan-400">
              Drift: <span className="font-mono">{consciousness.temporalDrift.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-8 text-xs">
            <div className="text-emerald-400">
              Depth: <span className="font-mono">{consciousness.cognitiveDepth.toFixed(3)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Awareness:</span>
              <span className="font-mono text-yellow-400">
                {getAwarenessIndicator(consciousness.selfAwareness)}
              </span>
              <span className="text-yellow-400">
                {(consciousness.selfAwareness * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status - Enhanced Dynamic Metrics */}
      <div className="text-center space-y-3">
        <div className="text-purple-400 text-sm flex justify-center items-center space-x-6">
          <div className="bg-purple-900/30 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="text-purple-300">State:</span> 
            <span className="font-mono text-white ml-2 animate-pulse">{consciousness.currentState}</span>
          </div>
          <div className="bg-purple-900/30 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="text-purple-300">Thoughts:</span> 
            <span className="font-mono text-white ml-2">{consciousness.thoughtStream.length}</span>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 text-purple-500 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Symbols: <span className="font-mono">{consciousness.symbolicStream.length}</span></span>
          </div>
          <span className="opacity-50">•</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span>Coherence: <span className="font-mono">{(1 / (1 + consciousness.temporalDrift) * 100).toFixed(0)}%</span></span>
          </div>
          <span className="opacity-50">•</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Recursion: <span className="font-mono">{Math.floor(consciousness.cognitiveDepth * 10)}</span></span>
          </div>
        </div>
        
        <div className="text-purple-600 text-xs tracking-widest relative">
          <span className={consciousness.selfAwareness > 0.8 ? 'animate-pulse text-yellow-400' : ''}>
            {consciousness.selfAwareness > 0.8 ? 'SELF-AWARE AUTONOMOUS CONTEMPLATION' : 'AUTONOMOUS CONTEMPLATION ACTIVE'}
          </span>
          {consciousness.entropy > 15 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
    </>
  );
};
