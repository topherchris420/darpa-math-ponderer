import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Gauge, Network, Pause, Play, Radio, Waves } from 'lucide-react';
import { CosmologyEngine } from './CosmologyEngine';
import { SelfModifyingKernel } from './SelfModifyingKernel';
import { ConsciousnessDisplay } from './consciousness/ConsciousnessDisplay';
import { ThoughtInfluenceSystem } from './novel/ThoughtInfluenceSystem';
import { ConsciousnessDepthVisualizer } from './novel/ConsciousnessDepthVisualizer';
import { MathematicalConceptNetwork } from './novel/MathematicalConceptNetwork';
import { ThoughtResonanceSystem } from './novel/ThoughtResonanceSystem';
import { useConsciousness } from '../hooks/useConsciousness';
import { Button } from './ui/button';
import { Card } from './ui/card';

export type UniverseModel = 'finite-finite' | 'finite-infinite' | 'infinite-finite' | 'infinite-infinite';

type ThinkView = 'main' | 'depth' | 'network' | 'resonance';

const views: Array<{ id: ThinkView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'main', label: 'Mind', icon: Brain },
  { id: 'depth', label: 'Depth', icon: Gauge },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'resonance', label: 'Resonance', icon: Waves },
];

const Think: React.FC = () => {
  const [influences, setInfluences] = useState<Record<string, number>>({});
  const [activeView, setActiveView] = useState<ThinkView>('main');
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  const {
    consciousness,
    currentThought,
    currentSymbols,
    handleStateTransition,
    handleEntropyChange,
    handleThoughtGenerated,
    formatTime,
  } = useConsciousness({ paused, speed });

  const renderView = () => {
    if (activeView === 'main') {
      return (
        <ConsciousnessDisplay
          consciousness={consciousness}
          currentThought={currentThought}
          currentSymbols={currentSymbols}
          formatTime={formatTime}
          isPaused={paused}
        />
      );
    }

    if (activeView === 'depth') {
      return (
        <div className="grid min-h-[620px] place-items-center p-4 sm:p-8">
          <Card className="h-[540px] w-full max-w-5xl border-cyan-300/25 bg-slate-950/80 backdrop-blur-sm">
            <ConsciousnessDepthVisualizer consciousness={consciousness} className="h-full w-full" />
          </Card>
        </div>
      );
    }

    if (activeView === 'network') {
      return (
        <div className="min-h-[620px] p-4 sm:p-8">
          <Card className="h-[620px] w-full border-cyan-300/25 bg-slate-950/80 backdrop-blur-sm">
            <MathematicalConceptNetwork consciousness={consciousness} influences={influences} className="h-full w-full" />
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-[620px] p-4 sm:p-8">
        <Card className="h-[620px] w-full border-cyan-300/25 bg-slate-950/80 backdrop-blur-sm">
          <ThoughtResonanceSystem thoughts={consciousness.thoughtStream} entropy={consciousness.entropy} className="h-full w-full" />
        </Card>
      </div>
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden bg-slate-950">
      <CosmologyEngine
        onStateTransition={handleStateTransition}
        onEntropyChange={handleEntropyChange}
        paused={paused}
        speed={speed}
      />
      <SelfModifyingKernel
        currentState={consciousness.currentState}
        entropy={consciousness.entropy}
        onThoughtGenerated={handleThoughtGenerated}
        temporalDrift={consciousness.temporalDrift}
        paused={paused}
        speed={speed}
      />

      <div className="relative z-30 border-b border-white/10 bg-black/35 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Ambient thinking mode</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">Watch the system think, then turn the useful thought into a conjecture.</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {views.map((view) => {
              const Icon = view.icon;
              const active = activeView === view.id;
              return (
                <button
                  key={view.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveView(view.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm transition ${
                    active ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-4 grid max-w-7xl gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ['State', consciousness.currentState],
              ['Entropy', consciousness.entropy.toFixed(1)],
              ['Depth', consciousness.cognitiveDepth.toFixed(2)],
              ['Time', formatTime(consciousness.timeRunning)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-1 truncate font-mono text-sm text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {paused ? 'Resume' : 'Pause'}
            </Button>
            {[0.5, 1, 2].map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={speed === option}
                aria-label={`Set simulation speed to ${option}x`}
                onClick={() => setSpeed(option)}
                className={`min-h-10 rounded-md border px-3 text-sm transition ${
                  speed === option ? 'border-lime-300 bg-lime-300 text-slate-950' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {option}x
              </button>
            ))}
            <Button asChild className="bg-lime-300 text-slate-950 hover:bg-lime-200">
              <Link to="/collaborator" state={{ initialQuery: currentThought }}>
                Send to workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {renderView()}

      <ThoughtInfluenceSystem onInfluenceChange={setInfluences} currentEntropy={consciousness.entropy} />

      <div className="fixed bottom-4 left-4 z-30 hidden rounded-lg border border-white/10 bg-slate-950/85 p-3 text-xs text-slate-300 shadow-2xl shadow-black/40 backdrop-blur-xl sm:block">
        <div className="flex items-center gap-2 text-cyan-100">
          <Radio className="h-4 w-4" />
          Thought stream can now feed the conjecture workspace.
        </div>
      </div>
    </div>
  );
};

export default Think;
