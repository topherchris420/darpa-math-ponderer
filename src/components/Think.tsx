
import React, { useState } from 'react';
import { CosmologyEngine } from './CosmologyEngine';
import { SelfModifyingKernel } from './SelfModifyingKernel';
import { ConsciousnessDisplay } from './consciousness/ConsciousnessDisplay';
import { ThoughtInfluenceSystem } from './novel/ThoughtInfluenceSystem';
import { ConsciousnessDepthVisualizer } from './novel/ConsciousnessDepthVisualizer';
import { MathematicalConceptNetwork } from './novel/MathematicalConceptNetwork';
import { ThoughtResonanceSystem } from './novel/ThoughtResonanceSystem';
import { useConsciousness } from '../hooks/useConsciousness';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export type UniverseModel = 'finite-finite' | 'finite-infinite' | 'infinite-finite' | 'infinite-infinite';

const Think: React.FC = () => {
  const {
    consciousness,
    currentThought,
    currentSymbols,
    handleStateTransition,
    handleEntropyChange,
    handleThoughtGenerated,
    formatTime
  } = useConsciousness();

  const [influences, setInfluences] = useState<Record<string, number>>({});
  const [activeView, setActiveView] = useState<'main' | 'depth' | 'network' | 'resonance'>('main');

  const handleInfluenceChange = (newInfluences: Record<string, number>) => {
    setInfluences(newInfluences);
    // Apply influences to the thinking process
    console.log('Thought influences updated:', newInfluences);
  };

  return (
    <div className="touch-none select-none min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Core Logic Components */}
      <CosmologyEngine 
        onStateTransition={handleStateTransition}
        onEntropyChange={handleEntropyChange}
      />
      
      <SelfModifyingKernel 
        currentState={consciousness.currentState}
        entropy={consciousness.entropy}
        onThoughtGenerated={handleThoughtGenerated}
        temporalDrift={consciousness.temporalDrift}
      />

      {/* Enhanced Interface with Novel Features */}
      <div className="relative min-h-screen">
        {/* Main View Toggle */}
        <div className="absolute top-4 left-4 z-30">
          <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-500/30">
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800">
                <TabsTrigger value="main" className="text-xs">Mind</TabsTrigger>
                <TabsTrigger value="depth" className="text-xs">Depth</TabsTrigger>
                <TabsTrigger value="network" className="text-xs">Network</TabsTrigger>
                <TabsTrigger value="resonance" className="text-xs">Resonance</TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>
        </div>

        {/* Dynamic View Content */}
        {activeView === 'main' && (
          <ConsciousnessDisplay 
            consciousness={consciousness}
            currentThought={currentThought}
            currentSymbols={currentSymbols}
            formatTime={formatTime}
            isPaused={false}
          />
        )}

        {activeView === 'depth' && (
          <div className="min-h-screen flex items-center justify-center p-8">
            <Card className="w-full max-w-4xl h-96 bg-slate-900/70 backdrop-blur-sm border-purple-500/30">
              <ConsciousnessDepthVisualizer 
                consciousness={consciousness}
                className="w-full h-full"
              />
            </Card>
          </div>
        )}

        {activeView === 'network' && (
          <div className="min-h-screen p-8">
            <Card className="w-full h-full bg-slate-900/70 backdrop-blur-sm border-purple-500/30">
              <MathematicalConceptNetwork 
                consciousness={consciousness}
                influences={influences}
                className="w-full h-full"
              />
            </Card>
          </div>
        )}

        {activeView === 'resonance' && (
          <div className="min-h-screen p-8">
            <Card className="w-full h-full bg-slate-900/70 backdrop-blur-sm border-purple-500/30">
              <ThoughtResonanceSystem 
                thoughts={consciousness.thoughtStream}
                entropy={consciousness.entropy}
                className="w-full h-full"
              />
            </Card>
          </div>
        )}

        {/* Thought Influence System - Always Visible */}
        <ThoughtInfluenceSystem 
          onInfluenceChange={handleInfluenceChange}
          currentEntropy={consciousness.entropy}
        />

        {/* Enhanced Status Indicator */}
        <div className="fixed top-4 right-4 z-20">
          <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-500/30 p-3">
            <div className="text-xs text-purple-300 space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  consciousness.entropy > 10 ? 'bg-red-400' : 
                  consciousness.entropy > 5 ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <span>State: {consciousness.currentState}</span>
              </div>
              <div>Entropy: {consciousness.entropy.toFixed(1)}</div>
              <div>Depth: {consciousness.cognitiveDepth.toFixed(2)}</div>
              <div>Awareness: {(consciousness.selfAwareness * 100).toFixed(1)}%</div>
              <div>Time: {formatTime(consciousness.timeRunning)}</div>
            </div>
          </Card>
        </div>

        {/* Novel Feature Indicators */}
        <div className="fixed bottom-4 left-4 z-20">
          <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-500/30 p-2">
            <div className="text-xs text-purple-300 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🧠</span>
                <span>Novel AI Consciousness</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="animate-bounce">⚡</span>
                <span>Interactive Influence System</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="animate-spin">🌀</span>
                <span>3D Depth Visualization</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🕸️</span>
                <span>Mathematical Network</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🌊</span>
                <span>Thought Resonance</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Think;
