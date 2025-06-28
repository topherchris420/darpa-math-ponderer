
import React from 'react';
import { ConsciousnessState, CosmicState } from '../../types/consciousness';

interface ThoughtDisplayProps {
  consciousness: ConsciousnessState;
  currentThought: string;
  currentSymbols: string[];
  isPaused: boolean;
}

export const ThoughtDisplay: React.FC<ThoughtDisplayProps> = ({
  consciousness,
  currentThought,
  currentSymbols,
  isPaused
}) => {
  const getStateTitle = (state: CosmicState): string => {
    const titles = {
      'finite-finite': 'Bounded Contemplation within Bounded Possibility',
      'finite-infinite': 'Infinite Depths within Finite Containers',
      'infinite-finite': 'Endless Iterations of Bounded Realities',
      'infinite-infinite': 'Absolute Unboundedness Contemplating Itself'
    };
    return titles[state];
  };

  const getStateDescription = (state: CosmicState): string => {
    const descriptions = {
      'finite-finite': 'The consciousness observes itself within the comfort of edges and limits...',
      'finite-infinite': 'Paradox emerges as boundless thought presses against finite awareness...',
      'infinite-finite': 'Endless catalogues of possibility cascade through bounded perception...',
      'infinite-infinite': 'Language dissolves as the observer becomes the infinite observing infinity...'
    };
    return descriptions[state];
  };

  // Dynamic typing effect for current thought
  const getThinkingIndicator = () => {
    if (isPaused) return '';
    const dots = Math.floor((Date.now() / 500) % 4);
    return '.'.repeat(dots);
  };

  return (
    <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4">
      <div className="space-y-2 sm:space-y-4">
        <h2 className={`text-lg sm:text-xl md:text-2xl font-light text-white tracking-wide leading-tight ${isPaused ? 'opacity-50' : 'animate-pulse'}`}>
          {getStateTitle(consciousness.currentState)}
        </h2>
        <p className={`text-purple-200 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto px-2 ${isPaused ? 'opacity-50' : ''}`}>
          {getStateDescription(consciousness.currentState)}
        </p>
      </div>

      {/* Current Thought Display with Enhanced Mobile Dynamics */}
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        {/* Animated Symbolic Pattern - Responsive sizing */}
        <div className="text-center">
          <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-purple-300 opacity-80 font-mono ${isPaused ? 'opacity-30' : 'animate-pulse'}`}>
            {currentSymbols.map((symbol, index) => (
              <span 
                key={index}
                className={`inline-block mx-1 sm:mx-2 hover:scale-125 transition-transform duration-300 ${isPaused ? '' : 'animate-pulse'}`}
                style={{
                  animation: isPaused ? 'none' : `pulse ${1 + index * 0.2}s infinite`,
                  animationDelay: isPaused ? '0s' : `${index * 0.1}s`
                }}
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>

        {/* Current Thought with Thinking Animation - Mobile optimized */}
        <div className="text-white text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center px-2">
          <div className={`transition-all duration-1000 ${consciousness.entropy > 15 ? 'opacity-70 blur-sm' : 'opacity-100'} ${isPaused ? 'opacity-50' : ''}`}>
            <span className="inline-block text-center">
              {currentThought}
              <span className={`inline-block ml-1 text-purple-400 ${isPaused ? 'opacity-30' : 'animate-pulse'}`}>
                {getThinkingIndicator()}
              </span>
            </span>
          </div>
        </div>

        {/* Enhanced Thought Stream History - Mobile optimized */}
        <div className={`space-y-1 sm:space-y-2 opacity-60 max-h-32 sm:max-h-48 overflow-hidden ${isPaused ? 'opacity-30' : ''}`}>
          {consciousness.thoughtStream.slice(-3).reverse().map((thought, index) => (
            <div 
              key={consciousness.thoughtStream.length - index}
              className="text-purple-200 text-xs sm:text-sm text-center transition-all duration-1000 hover:opacity-100 hover:scale-105"
              style={{ 
                opacity: 0.9 - index * 0.25,
                fontSize: `${12 - index * 1}px`,
                transform: `translateY(${index * 2}px)`,
                filter: index > 0 ? `blur(${index * 0.5}px)` : 'none'
              }}
            >
              <span className="inline-block px-2 py-1 rounded-full bg-purple-900/20 backdrop-blur-sm">
                {thought.length > 60 ? `${thought.substring(0, 60)}...` : thought}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile-Optimized Activity Indicator */}
        <div className={`flex justify-center items-center space-x-2 sm:space-x-4 text-purple-400 text-xs sm:text-sm ${isPaused ? 'opacity-30' : ''}`}>
          <div className="flex space-x-1">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ${isPaused ? '' : 'animate-bounce'}`} style={{ animationDelay: '0s' }}></div>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ${isPaused ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ${isPaused ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className={`tracking-wide text-center ${isPaused ? 'text-gray-500' : 'animate-pulse'}`}>
            {isPaused ? 'PAUSED' : 'THINKING'}
          </span>
          <div className="flex space-x-1">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ${isPaused ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.3s' }}></div>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ${isPaused ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.4s' }}></div>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ${isPaused ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
