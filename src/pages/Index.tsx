import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle2, FileText, FlaskConical, Infinity, Network, Search, Terminal } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const examples = [
  'How do holes persist across noisy point clouds?',
  'What spectral bounds control sparse graph structure?',
  'When does sheaf cohomology expose a global obstruction?',
];

const workflow = [
  { label: 'Ask', body: 'Start with a mathematical question, not a menu of widgets.', icon: Search },
  { label: 'Conjecture', body: 'Generate a claim with assumptions and confidence reason.', icon: Brain },
  { label: 'Pressure test', body: 'Inspect examples, counterexamples, and proof obligations.', icon: FlaskConical },
  { label: 'Save', body: 'Keep the research trail and export it as markdown.', icon: FileText },
];

const mockThoughts = [
  'Exploring persistent H1 homology across nearby point-cloud filtrations...',
  'Analyzing prime gaps modular structure on residue classes congruent to 1 mod 4...',
  'Checking moduli dimension bounds on flat algebraic geometry schemes...',
  'Searching for dense subgraph counterexamples in extremal Ramsey configurations...',
  'Tracing sheaf cohomology global obstruction classes on elliptic moduli curves...',
  'Synthesizing homology loop invariants under continuous deformation maps...',
];

const Index = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(examples[0]);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const activeThought = mockThoughts[thoughtIndex];

  // Cycle thoughts for the live contemplation stream ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % mockThoughts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const effectivePrompt = prompt.trim() || examples[0];
  const labHref = `/collaborator?query=${encodeURIComponent(effectivePrompt)}`;

  const openLab = () => {
    navigate(labHref, { state: { initialQuery: effectivePrompt } });
  };

  return (
    <AppShell eyebrow="Mathematical discovery instrument">
      {/* Hero Section */}
      <section className="relative overflow-hidden mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl content-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:px-8">
        {/* Dynamic backgrounds inside hero section */}
        <div className="aurora-bg absolute opacity-20 pointer-events-none" aria-hidden />
        <div className="grid-overlay absolute pointer-events-none" aria-hidden />

        <div className="relative z-10 flex flex-col justify-center animate-fade-in-up">
          <Badge className="w-fit border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/10 font-mono tracking-wider">
            <Infinity className="mr-2 h-3.5 w-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
            Autonomous math lab active
          </Badge>
          
          <h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Explore conjectures.<br />
            Test the edges.<br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-lime-300 bg-clip-text text-transparent font-medium">Keep the trail.</span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 font-light">
            A serious mathematical workspace equipped with an ambient thinking engine. Generate conjectures, inspect assumptions, search for counterexamples, and export clean research logs.
          </p>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm shadow-xl">
            <label htmlFor="home-prompt" className="text-xs uppercase tracking-widest font-mono text-cyan-300">
              Start with a research direction
            </label>
            <form
              className="mt-3 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                openLab();
              }}
            >
              <Input
                id="home-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="h-12 border-white/10 bg-black/40 text-white placeholder:text-slate-500 focus-visible:ring-cyan-300 font-mono text-sm"
              />
              <Button
                type="submit"
                className="h-12 bg-cyan-300 px-6 text-slate-950 hover:bg-cyan-200 font-medium transition duration-300 flex-shrink-0"
              >
                Open lab
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setPrompt(example)}
                className="rounded-md border border-white/5 bg-white/[0.02] px-3.5 py-2 text-left text-xs font-mono text-slate-400 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.05] hover:text-white"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 grid content-center gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-mono">Instrument Loop</p>
                <h2 className="mt-1 text-2xl font-light text-white tracking-wide">Conjecture Workspace</h2>
              </div>
              <Badge className="border border-lime-300/30 bg-lime-300/10 text-lime-100 font-mono tracking-widest uppercase text-[10px]">
                Ready
              </Badge>
            </div>
            
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {workflow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="min-h-[140px] rounded-md border border-white/5 bg-black/30 p-4 hover:border-white/15 transition-all duration-300 group">
                    <div className="flex items-center justify-between gap-3">
                      <Icon className="h-5 w-5 text-cyan-300 group-hover:scale-110 transition duration-300" />
                      <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-white tracking-wide">{item.label}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400 font-light">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Thought Preview Ticker */}
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-950/10 p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-3.5 right-4 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-300" />
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-400 font-mono">Live Contemplation Stream</p>
            </div>
            <div className="mt-3 min-h-[3rem] flex items-center border-l-2 border-cyan-500/30 pl-4 bg-black/40 rounded py-2.5 px-3">
              <p key={activeThought} className="text-xs font-mono text-slate-300 leading-relaxed animate-fade-in-up">
                {activeThought}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative border-y border-white/10 bg-black/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3 items-center">
          <div className="lg:col-span-1">
            <Badge variant="outline" className="border-amber-300/30 bg-amber-300/10 text-amber-100 font-mono">
              Workspace Paradigm
            </Badge>
            <h2 className="mt-4 text-3xl font-light text-white tracking-wide leading-snug">Not a math-themed screensaver.</h2>
            <p className="mt-4 leading-relaxed text-slate-300 font-light text-sm">
              THINK can still be ambient and strange, but the flagship experience is rigorously useful: every generated idea has explicit assumptions, examples, and active proof plans.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              ['Workspace First', 'The collaborator is the main product, with THINK as a companion mode.'],
              ['Truth Labels', 'Generated claims are marked as conjectures until users test them.'],
              ['Research Memory', 'Saved sessions keep the app from resetting to zero every visit.'],
              ['Exportable Output', 'Markdown export makes the work portable into notes or papers.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition duration-300">
                <CheckCircle2 className="h-5 w-5 text-lime-300" />
                <h3 className="mt-3 text-base font-semibold text-white tracking-wide">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Trait CTA */}
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-mono">Two modes, one trail</p>
          <h2 className="mt-2 text-3xl font-light text-white tracking-wide">Collaborate when you need rigor. Think when you need motion.</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row flex-shrink-0">
          <Button asChild className="h-11 bg-cyan-300 text-slate-950 hover:bg-cyan-200 font-medium transition duration-300">
            <Link to="/collaborator">Open workspace</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white transition duration-300">
            <Link to="/infinity" className="flex items-center gap-2">
              <Network className="h-4 w-4 text-cyan-300" />
              Open THINK
            </Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
};

export default Index;
