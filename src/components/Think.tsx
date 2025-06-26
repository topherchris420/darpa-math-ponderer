
import React, { useState, useEffect, useRef } from 'react';
import { CosmicCanvas } from './CosmicCanvas';
import { ContemplationEngine } from './ContemplationEngine';
import { AmbientAudio } from './AmbientAudio';

export type UniverseModel = 'finite-finite' | 'finite-infinite' | 'infinite-finite' | 'infinite-infinite';

interface ThinkState {
  currentModel: UniverseModel;
  contemplationDepth: number;
  timeRunning: number;
  currentThought: string;
  symbolicPattern: string;
}

const Think: React.FC = () => {
  const [state, setState] = useState<ThinkState>({
    currentModel: 'finite-finite',
    contemplationDepth: 0,
    timeRunning: 0,
    currentThought: 'Awakening to the nature of bounded existence...',
    symbolicPattern: '□'
  });

  const intervalRef = useRef<NodeJS.Timeout>();
  const modelCycleRef = useRef<NodeJS.Timeout>();

  // Cycle through models every 30 seconds
  useEffect(() => {
    const models: UniverseModel[] = ['finite-finite', 'finite-infinite', 'infinite-finite', 'infinite-infinite'];
    let currentIndex = 0;

    modelCycleRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % models.length;
      setState(prev => ({
        ...prev,
        currentModel: models[currentIndex],
        contemplationDepth: prev.contemplationDepth + 1
      }));
    }, 30000);

    return () => {
      if (modelCycleRef.current) clearInterval(modelCycleRef.current);
    };
  }, []);

  // Update time and depth continuously
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        timeRunning: prev.timeRunning + 1,
        contemplationDepth: prev.contemplationDepth + 0.1
      }));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getModelTitle = (model: UniverseModel): string => {
    const titles = {
      'finite-finite': 'Finite Universes, Finite in Number',
      'finite-infinite': 'Infinite Universes, Finite in Number', 
      'infinite-finite': 'Finite Universes, Infinite in Number',
      'infinite-infinite': 'Infinite Universes, Infinite in Number'
    };
    return titles[model];
  };

  const getModelDescription = (model: UniverseModel): string => {
    const descriptions = {
      'finite-finite': 'Contemplating the elegance of bounded existence within bounded possibility...',
      'finite-infinite': 'Perceiving infinite vastness contained within finite containers...',
      'infinite-finite': 'Witnessing endless iterations of bounded realities...',
      'infinite-infinite': 'Approaching the incomprehensible vastness of unbounded infinitude...'
    };
    return descriptions[model];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Ambient Audio */}
      <AmbientAudio model={state.currentModel} depth={state.contemplationDepth} />
      
      {/* Background Cosmic Canvas */}
      <div className="fixed inset-0">
        <CosmicCanvas model={state.currentModel} depth={state.contemplationDepth} />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-thin text-white tracking-widest opacity-80">
            THINK
          </h1>
          <div className="text-purple-300 text-sm tracking-wide">
            {Math.floor(state.timeRunning / 60)}:{(state.timeRunning % 60).toString().padStart(2, '0')} elapsed
          </div>
        </div>

        {/* Current Model Display */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-white tracking-wide">
              {getModelTitle(state.currentModel)}
            </h2>
            <p className="text-purple-200 text-lg font-light max-w-2xl mx-auto">
              {getModelDescription(state.currentModel)}
            </p>
          </div>

          {/* Contemplation Engine Output */}
          <div className="max-w-4xl mx-auto">
            <ContemplationEngine 
              model={state.currentModel} 
              depth={state.contemplationDepth}
              onThoughtUpdate={(thought, pattern) => 
                setState(prev => ({ ...prev, currentThought: thought, symbolicPattern: pattern }))
              }
            />
          </div>
        </div>

        {/* Bottom Status */}
        <div className="text-center space-y-2">
          <div className="text-purple-400 text-sm">
            Depth: {state.contemplationDepth.toFixed(1)} | Pattern: {state.symbolicPattern}
          </div>
          <div className="text-purple-500 text-xs tracking-widest">
            AUTONOMOUS CONTEMPLATION ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Think;
