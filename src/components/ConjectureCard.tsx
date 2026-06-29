import React from 'react';
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
  return (
    <article
      className={`rounded-lg border bg-white/[0.04] p-5 transition ${
        selected ? 'border-cyan-300/70 shadow-lg shadow-cyan-950/30' : 'border-white/10'
      }`}
    >
      <button type="button" onClick={onSelect} className="block w-full text-left">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{conjecture.domain}</p>
            <h3 className="mt-2 text-xl font-semibold leading-7 text-white">{conjecture.title}</h3>
          </div>
          <Badge className="border border-amber-300/30 bg-amber-300/10 text-amber-100">
            {conjecture.status}
          </Badge>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-200">{conjecture.statement}</p>
      </button>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric label="Confidence" value={`${Math.round(conjecture.confidence * 100)}%`} />
        <Metric label="Validation" value={`${evaluation.score}/100`} />
        <Metric label="Evidence" value={evaluation.summary.split('.')[0]} />
      </div>

      <p className="mt-4 rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">
        {conjecture.confidenceReason}
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <EvidenceList icon={CheckCircle2} title="Assumptions" items={conjecture.assumptions} tone="text-cyan-200" />
        <EvidenceList icon={FlaskConical} title="Examples to test" items={conjecture.examples} tone="text-lime-200" />
        <EvidenceList icon={AlertTriangle} title="Counterexample search" items={conjecture.counterexamples} tone="text-amber-200" />
        <EvidenceList icon={Route} title="Proof plan" items={conjecture.proofPlan} tone="text-rose-200" />
      </div>

      <div className="mt-5 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm text-cyan-100">
        <Lightbulb className="mr-2 inline h-4 w-4" />
        {evaluation.nextAction}
      </div>
    </article>
  );
};

interface MetricProps {
  label: string;
  value: string;
}

const Metric: React.FC<MetricProps> = ({ label, value }) => (
  <div className="rounded-md border border-white/10 bg-black/20 p-3">
    <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-medium text-white">{value}</p>
  </div>
);

interface EvidenceListProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  tone: string;
}

const EvidenceList: React.FC<EvidenceListProps> = ({ icon: Icon, title, items, tone }) => (
  <div className="rounded-md border border-white/10 bg-black/20 p-4">
    <div className="mb-3 flex items-center gap-2">
      <Icon className={`h-4 w-4 ${tone}`} />
      <h4 className="text-sm font-semibold text-white">{title}</h4>
    </div>
    <ul className="space-y-2 text-sm leading-6 text-slate-300">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className={tone}>-</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
