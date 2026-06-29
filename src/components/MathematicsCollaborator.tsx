import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Clipboard, FileDown, FlaskConical, Plus, Save, Sparkles } from 'lucide-react';
import { ConjectureCard } from '@/components/ConjectureCard';
import { DomainSelector } from '@/components/DomainSelector';
import { ResearchLogPanel } from '@/components/ResearchLogPanel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResearchLog } from '@/hooks/useResearchLog';
import {
  createConjecture,
  createResearchEntry,
  evaluateConjecture,
  getDomainProfile,
  getStarterPrompts,
  type Conjecture,
} from '@/lib/mathLabCore.js';

interface CollaboratorLocationState {
  initialQuery?: string;
}

export const MathematicsCollaborator: React.FC = () => {
  const location = useLocation();
  const stateQuery = (location.state as CollaboratorLocationState | null)?.initialQuery ?? '';
  const urlQuery = new URLSearchParams(location.search).get('query') ?? '';
  const initialQuery = stateQuery || urlQuery;
  const [activeDomain, setActiveDomain] = useState('topology');
  const [query, setQuery] = useState(initialQuery);
  const [conjectures, setConjectures] = useState<Conjecture[]>(() => [
    createConjecture({
      domain: 'topology',
      query: 'How do holes persist across noisy point clouds?',
      conceptCount: 4,
    }),
  ]);
  const [selectedConjectureId, setSelectedConjectureId] = useState(conjectures[0]?.id ?? '');
  const [copyState, setCopyState] = useState('Copy markdown');
  const { entries, addEntry, clearEntries } = useResearchLog();

  const profile = useMemo(() => getDomainProfile(activeDomain), [activeDomain]);
  const starterPrompts = useMemo(() => getStarterPrompts(activeDomain), [activeDomain]);
  const domainConjectures = useMemo(
    () => conjectures.filter((conjecture) => conjecture.domain === activeDomain),
    [activeDomain, conjectures]
  );
  const selectedConjecture = useMemo(() => {
    return conjectures.find((conjecture) => conjecture.id === selectedConjectureId) ?? domainConjectures[0] ?? conjectures[0];
  }, [conjectures, domainConjectures, selectedConjectureId]);
  const selectedEvaluation = selectedConjecture ? evaluateConjecture(selectedConjecture) : null;

  const generateConjecture = (prompt = query) => {
    const trimmedPrompt = prompt.trim() || starterPrompts[0];
    const conjecture = createConjecture({
      domain: activeDomain,
      query: trimmedPrompt,
      conceptCount: domainConjectures.length + profile.primitives.length,
    });

    setConjectures((current) => [conjecture, ...current].slice(0, 18));
    setSelectedConjectureId(conjecture.id);
    setQuery(trimmedPrompt);
  };

  const saveRun = () => {
    const entry = createResearchEntry({
      title: `${profile.label} run ${entries.length + 1}`,
      activeDomain,
      query,
      conjectures: domainConjectures,
      concepts: profile.primitives,
    });

    addEntry(entry);
  };

  const copyMarkdown = async () => {
    if (!selectedConjecture || !selectedEvaluation) return;

    const markdown = [
      `# ${selectedConjecture.title}`,
      '',
      `**Domain:** ${profile.label}`,
      `**Status:** ${selectedConjecture.status}`,
      `**Validation:** ${selectedEvaluation.score}/100`,
      '',
      selectedConjecture.statement,
      '',
      '## Assumptions',
      ...selectedConjecture.assumptions.map((item) => `- ${item}`),
      '',
      '## Examples',
      ...selectedConjecture.examples.map((item) => `- ${item}`),
      '',
      '## Counterexample Search',
      ...selectedConjecture.counterexamples.map((item) => `- ${item}`),
      '',
      '## Proof Plan',
      ...selectedConjecture.proofPlan.map((item) => `- ${item}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState('Copied');
    } catch {
      setCopyState('Copy failed');
    }

    window.setTimeout(() => setCopyState('Copy markdown'), 1400);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <Badge className="border border-lime-300/30 bg-lime-300/10 text-lime-100 hover:bg-lime-300/10">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Flagship workspace
            </Badge>
            <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">Conjecture lab for serious math play.</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Ask a mathematical question, generate a conjecture, inspect assumptions, test examples, hunt counterexamples, and save the research trail.
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Current domain</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{profile.label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{profile.focus}</p>
              </div>
            </div>
          </div>

          <DomainSelector activeDomain={activeDomain} onDomainChange={setActiveDomain} />

          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <form
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              onSubmit={(event) => {
                event.preventDefault();
                generateConjecture();
              }}
            >
              <label htmlFor="math-query" className="text-sm font-medium text-slate-200">
                Research question
              </label>
              <Textarea
                id="math-query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Ask about ${profile.label.toLowerCase()}...`}
                className="mt-3 min-h-32 border-white/10 bg-black/20 text-white placeholder:text-slate-500 focus-visible:ring-cyan-300"
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                  <Plus className="h-4 w-4" />
                  Generate conjecture
                </Button>
                <Button type="button" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={saveRun}>
                  <Save className="h-4 w-4" />
                  Save run
                </Button>
                <Button type="button" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={copyMarkdown}>
                  <Clipboard className="h-4 w-4" />
                  {copyState}
                </Button>
              </div>
            </form>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Starter prompts</p>
              <div className="mt-4 space-y-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => generateConjecture(prompt)}
                    className="w-full rounded-md border border-white/10 bg-black/20 p-3 text-left text-sm leading-6 text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {selectedConjecture && selectedEvaluation ? (
                <ConjectureCard
                  conjecture={selectedConjecture}
                  evaluation={selectedEvaluation}
                  selected
                  onSelect={() => setSelectedConjectureId(selectedConjecture.id)}
                />
              ) : (
                <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-slate-400">
                  Generate a conjecture to begin.
                </div>
              )}
            </div>

            <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Validation queue</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Recent conjectures</h2>
              <div className="mt-5 space-y-3">
                {domainConjectures.map((conjecture) => {
                  const evaluation = evaluateConjecture(conjecture);
                  return (
                    <button
                      key={conjecture.id}
                      type="button"
                      onClick={() => setSelectedConjectureId(conjecture.id)}
                      className={`w-full rounded-md border p-3 text-left transition ${
                        selectedConjecture?.id === conjecture.id
                          ? 'border-cyan-300/60 bg-cyan-300/10'
                          : 'border-white/10 bg-black/20 hover:border-white/25'
                      }`}
                    >
                      <p className="line-clamp-2 text-sm leading-6 text-white">{conjecture.statement}</p>
                      <p className="mt-2 text-xs text-slate-500">Validation {evaluation.score}/100</p>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>

        <div className="space-y-6">
          <ResearchLogPanel entries={entries} onClear={clearEntries} />
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Ambient mode</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Send thought streams here</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              THINK is now a companion mode. Send any generated thought into this workspace and turn it into a testable conjecture.
            </p>
            <Button asChild className="mt-5 bg-lime-300 text-slate-950 hover:bg-lime-200">
              <Link to="/infinity">
                Open THINK
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Export path</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Markdown-ready work</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Every selected conjecture copies with assumptions, examples, counterexamples, and proof plan intact.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-cyan-100">
              <FileDown className="h-4 w-4" />
              Clipboard export active
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
