
import React from 'react';
import { ConsciousnessState, CosmicState } from '../../types/consciousness';

interface ThoughtDisplayProps {
  consciousness: ConsciousnessState;
  currentThought: string;
  currentSymbols: string[];
}

export const ThoughtDisplay: React.FC<ThoughtDisplayProps> = ({
  consciousness,
  currentThought,
  currentSymbols
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

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-white tracking-wide">
          {getStateTitle(consciousness.currentState)}
        </h2>
        <p className="text-purple-200 text-lg font-light max-w-2xl mx-auto">
          {getStateDescription(consciousness.currentState)}
        </p>
      </div>

      {/* Current Thought Display */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Symbolic Pattern */}
        <div className="text-center">
          <div className="text-4xl mb-4 text-purple-300 opacity-80 font-mono">
            {currentSymbols.join(' · ')}
          </div>
        </div>

        {/* Current Thought */}
        <div className="text-white text-xl font-light leading-relaxed max-w-3xl mx-auto min-h-[4rem] flex items-center justify-center">
          <div className={`transition-opacity duration-1000 ${consciousness.entropy > 15 ? 'opacity-70' : 'opacity-100'}`}>
            {currentThought}
          </div>
        </div>

        {/* Thought Stream History */}
        <div className="space-y-2 opacity-60 max-h-40 overflow-hidden">
          {consciousness.thoughtStream.slice(-3).map((thought, index) => (
            <div 
              key={index} 
              className="text-purple-200 text-sm text-center transition-opacity duration-1000"
              style={{ 
                opacity: 0.8 - (consciousness.thoughtStream.length - index - 1) * 0.2,
                fontSize: `${14 - (consciousness.thoughtStream.length - index - 1) * 2}px`
              }}
            >
              {thought}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
