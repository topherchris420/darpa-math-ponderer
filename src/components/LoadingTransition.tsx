
import React from 'react';

interface LoadingTransitionProps {
  isTransitioning: boolean;
  currentState: string;
  nextState?: string;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isTransitioning,
  currentState,
  nextState
}) => {
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <div className="text-white text-lg">
          Transitioning: {currentState} → {nextState}
        </div>
      </div>
    </div>
  );
};
