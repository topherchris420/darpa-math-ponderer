import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Clipboard, FileDown, FlaskConical, Plus, Save, Sparkles, Loader2 } from 'lucide-react';
import { ConjectureCard } from '@/components/ConjectureCard';
import { DomainSelector } from '@/components/DomainSelector';
import { ResearchLogPanel } from '@/components/ResearchLogPanel';
import { ConceptVisualizer } from '@/components/ConceptVisualizer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResearchLog } from '@/hooks/useResearchLog';
import { toast } from 'sonner';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveState, setSaveState] = useState('Save run');
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

  // Construct concept list for ConceptVisualizer based on active domain primitives
  const currentConcepts = useMemo(() => {
    const primitives = profile.primitives || [];
    return primitives.map((prim, index) => {
      const connections: string[] = [];
      if (index > 0) {
        connections.push(`${activeDomain}-concept-${index - 1}`);
      }
      if (index === primitives.length - 1 && primitives.length > 2) {
        connections.push(`${activeDomain}-concept-0`); // Form a ring
      }
      
      const conf = 0.65 + (index * 0.06);
      return {
        id: `${activeDomain}-concept-${index}`,
        domain: activeDomain,
        concept: prim.charAt(0).toUpperCase() + prim.slice(1),
        confidence: Number(conf.toFixed(2)),
        connections,
        proofHints: [],
        visualizable: true
      };
    });
  }, [activeDomain, profile]);

  const generateConjecture = (prompt = query) => {
    setIsGenerating(true);
    const trimmedPrompt = prompt.trim() || starterPrompts[0];

    // Artificial mathematical calculation delay
    setTimeout(() => {
      const conjecture = createConjecture({
        domain: activeDomain,
        query: trimmedPrompt,
        conceptCount: domainConjectures.length + profile.primitives.length,
      });

      setConjectures((current) => [conjecture, ...current].slice(0, 18));
      setSelectedConjectureId(conjecture.id);
      setQuery(trimmedPrompt);
      setIsGenerating(false);
      toast.success("Mathematical conjecture generated successfully!");
    }, 850);
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
    setSaveState('Saved!');
    toast.success("Research trail saved to local log.");
    setTimeout(() => setSaveState('Save run'), 1400);
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
      toast.success("Markdown copied to clipboard.");
    } catch {
      setCopyState('Copy failed');
      toast.error("Failed to copy markdown.");
    }

    window.setTimeout(() => setCopyState('Copy markdown'), 1400);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in-up">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-xl relative overflow-hidden">
            <div className="aurora-bg absolute opacity-10 pointer-events-none" aria-hidden />
            <Badge className="border border-lime-300/30 bg-lime-300/10 text-lime-100 hover:bg-lime-300/10 font-mono tracking-wider">
              <Sparkles className="mr-2 h-3.5 w-3.5 text-lime-300" />
              Discovery Workspace
            </Badge>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <h1 className="text-4xl font-light tracking-wide text-white sm:text-5xl">Conjecture lab for serious math play.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 font-light">
                  Ask a mathematical question, generate a conjecture, inspect assumptions, test examples, hunt counterexamples, and save the research trail.
                </p>
              </div>
              <div className="rounded-md border border-white/5 bg-black/30 p-4 border-l-2 border-l-cyan-300/60">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono">Current domain</p>
                <h2 className="mt-1 text-2xl font-light text-white tracking-wide">{profile.label}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 font-light">{profile.focus}</p>
              </div>
            </div>
          </div>

          <DomainSelector activeDomain={activeDomain} onDomainChange={setActiveDomain} />

          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <form
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-lg"
              onSubmit={(event) => {
                event.preventDefault();
                generateConjecture();
              }}
            >
              <label htmlFor="math-query" className="text-xs uppercase tracking-widest font-mono text-cyan-300">
                Research question
              </label>
              <Textarea
                id="math-query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Ask about ${profile.label.toLowerCase()}...`}
                className="mt-3 min-h-32 border-white/10 bg-black/40 text-white placeholder:text-slate-500 focus-visible:ring-cyan-300 font-mono text-sm leading-relaxed"
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button 
                  type="submit" 
                  className="bg-cyan-300 text-slate-950 hover:bg-cyan-200 font-medium transition duration-300"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Pondering...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Generate conjecture
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white transition duration-300" 
                  onClick={saveRun}
                  disabled={isGenerating || !selectedConjecture}
                >
                  <Save className="mr-2 h-4 w-4 text-lime-300" />
                  {saveState}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white transition duration-300" 
                  onClick={copyMarkdown}
                  disabled={isGenerating || !selectedConjecture}
                >
                  <Clipboard className="mr-2 h-4 w-4 text-cyan-300" />
                  {copyState}
                </Button>
              </div>
            </form>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-lg">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-mono">Starter prompts</p>
              <div className="mt-4 space-y-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => generateConjecture(prompt)}
                    className="w-full rounded-md border border-white/5 bg-black/30 p-3 text-left text-xs leading-relaxed text-slate-350 transition duration-300 hover:border-cyan-300/30 hover:bg-black/50 hover:text-white font-mono"
                    disabled={isGenerating}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {isGenerating ? (
              /* Conjecture Skeleton Loader */
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 space-y-6 animate-shimmer">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
                    <div className="h-6 w-48 bg-slate-800 rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-16 bg-slate-800 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-slate-800/60 rounded animate-pulse w-full border-l-2 border-slate-700/50 pl-3" />
                <div className="rounded border border-cyan-500/10 bg-cyan-950/15 p-4 flex items-center gap-3 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono text-cyan-300">AI collaborating engine: mapping topological features...</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800/20 border border-white/5 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ) : selectedConjecture && selectedEvaluation ? (
              /* Visual Dashboard layout (Card + Manifold network) */
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
                <div className="h-full">
                  <ConjectureCard
                    conjecture={selectedConjecture}
                    evaluation={selectedEvaluation}
                    selected
                    onSelect={() => setSelectedConjectureId(selectedConjecture.id)}
                  />
                </div>
                <div className="h-full">
                  <ConceptVisualizer 
                    concepts={currentConcepts} 
                    activeDomain={activeDomain} 
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-slate-400">
                Generate a conjecture to begin.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <aside className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-mono">Validation queue</p>
            <h2 className="mt-1 text-xl font-light text-white tracking-wide">Recent conjectures</h2>
            <div className="mt-5 space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {domainConjectures.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No conjectures generated in this domain.</p>
              ) : (
                domainConjectures.map((conjecture) => {
                  const evaluation = evaluateConjecture(conjecture);
                  return (
                    <button
                      key={conjecture.id}
                      type="button"
                      onClick={() => setSelectedConjectureId(conjecture.id)}
                      className={`w-full rounded-md border p-3 text-left transition duration-300 ${
                        selectedConjecture?.id === conjecture.id
                          ? 'border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_10px_rgba(34,211,238,0.05)]'
                          : 'border-white/5 bg-black/20 hover:border-white/20'
                      }`}
                    >
                      <p className="line-clamp-2 text-xs leading-relaxed text-white font-mono">{conjecture.statement}</p>
                      <p className="mt-2 text-[10px] font-mono text-cyan-300">Validation score: {evaluation.score}/100</p>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <ResearchLogPanel entries={entries} onClear={clearEntries} />
          
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-mono">Ambient mode</p>
            <h2 className="mt-1 text-xl font-light text-white tracking-wide">Send thought streams here</h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-350 font-light">
              THINK is now a companion mode. Send any generated thought into this workspace and turn it into a testable conjecture.
            </p>
            <Button asChild className="mt-5 w-full bg-lime-300 text-slate-950 hover:bg-lime-200 transition duration-300 font-medium">
              <Link to="/infinity">
                Open THINK
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-mono">Export path</p>
            <h2 className="mt-1 text-xl font-light text-white tracking-wide">Markdown-ready work</h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-350 font-light">
              Every selected conjecture copies with assumptions, examples, counterexamples, and proof plan intact.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-cyan-300 font-mono">
              <FileDown className="h-4 w-4 animate-bounce" />
              Clipboard export active
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
