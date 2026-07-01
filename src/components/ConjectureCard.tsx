import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, FlaskConical, Lightbulb, Route } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Conjecture, ConjectureEvaluation } from '@/lib/mathLabCore.js';

interface ConjectureCardProps {
  conjecture: Conjecture;
  evaluation: ConjectureEvaluation;
  selected?: boolean;
  onSelect?: () => void;
}

export const ConjectureCard: React.FC<ConjectureCardProps> = ({
  conjecture,
  evaluation,
  selected = false,
  onSelect,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Count up animation for validation score on mount/update
  useEffect(() => {
    let start = 0;
    const end = evaluation.score;
    if (start === end) {
      setAnimatedScore(end);
      return;
    }
    
    const duration = 800; // ms
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 8));

    return () => clearInterval(timer);
  }, [evaluation.score]);

  // Circumference for r=36 is 2 * PI * 36 = 226.19
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <article
      className={`rounded-lg border bg-white/[0.03] p-6 transition-all duration-300 ${
        selected 
          ? 'border-cyan-300/60 shadow-[0_0_20px_rgba(34,211,238,0.08)] bg-white/[0.05]' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      <button type="button" onClick={onSelect} className="block w-full text-left focus:outline-none">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded">
              {conjecture.domain}
            </span>
            <h3 className="mt-3 text-2xl font-light leading-7 text-white tracking-wide">{conjecture.title}</h3>
          </div>
          <Badge className="border border-amber-300/30 bg-amber-300/10 text-amber-100 font-mono tracking-wider animate-pulse">
            {conjecture.status}
          </Badge>
        </div>
        <p className="mt-4 text-base leading-relaxed text-slate-200 font-light italic border-l-2 border-cyan-500/30 pl-3">
          "{conjecture.statement}"
        </p>
      </button>

      {/* Modern Metric Dashboard layout */}
      <div className="mt-6 grid gap-4 md:grid-cols-[140px_1fr] items-center rounded-lg border border-white/5 bg-black/20 p-5">
        {/* Animated Circle Gauge for Validation */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle track */}
              <circle
                cx="48"
                cy="48"
                r="36"
                className="stroke-white/[0.04]"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Animated foreground score circle */}
              <circle
                cx="48"
                cy="48"
                r="36"
                className="stroke-cyan-300 transition-all duration-300 ease-out"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(103, 232, 249, 0.4))'
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-mono font-semibold text-white">{animatedScore}</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Valid</span>
            </div>
          </div>
        </div>

        {/* Dynamic description & confidence parameters */}
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-3">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-mono">Confidence Level</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-lg font-mono text-white font-medium">
                  {Math.round(conjecture.confidence * 100)}%
                </span>
                {/* Horizontal slider visualization */}
                <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-lime-300 rounded-full" 
                    style={{ width: `${conjecture.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md border border-white/5 bg-white/[0.02] p-3">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-mono">Evidence Check</p>
              <p className="mt-1 text-sm font-light text-slate-200 truncate">
                {evaluation.summary.split('.')[0]}.
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400 font-light">
            <span className="font-mono text-cyan-300 mr-1.5">Reasoning:</span>
            {conjecture.confidenceReason}
          </p>
        </div>
      </div>

      {/* Staggered lists */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <EvidenceList icon={CheckCircle2} title="Assumptions Stated" items={conjecture.assumptions} tone="text-cyan-300" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <EvidenceList icon={FlaskConical} title="Examples to Test" items={conjecture.examples} tone="text-lime-300" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <EvidenceList icon={AlertTriangle} title="Counterexample Search" items={conjecture.counterexamples} tone="text-amber-300" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <EvidenceList icon={Route} title="Suggested Proof Plan" items={conjecture.proofPlan} tone="text-rose-300" />
        </div>
      </div>

      {/* Dynamic Action Callout */}
      <div className="mt-5 rounded-md border border-cyan-400/20 bg-cyan-950/20 p-3.5 text-sm text-cyan-200 flex items-start gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] animate-pulse-glow">
        <Lightbulb className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed font-light">
          <span className="font-mono font-medium tracking-wide uppercase text-xs mr-2 text-cyan-300 bg-cyan-900/40 px-1.5 py-0.5 rounded border border-cyan-800/40">Next Step</span>
          {evaluation.nextAction}
        </p>
      </div>
    </article>
  );
};

interface EvidenceListProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  tone: string;
}

const EvidenceList: React.FC<EvidenceListProps> = ({ icon: Icon, title, items, tone }) => (
  <div className="rounded-md border border-white/5 bg-black/10 p-4 h-full hover:bg-black/20 transition-colors">
    <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
      <Icon className={`h-4 w-4 ${tone}`} />
      <h4 className="text-xs uppercase tracking-widest font-mono text-white">{title}</h4>
    </div>
    <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2 items-start">
          <span className={`${tone} select-none`}>↳</span>
          <span className="font-light text-xs">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
