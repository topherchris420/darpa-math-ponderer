import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle2, FileText, FlaskConical, Infinity, Network, Search } from 'lucide-react';
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

const Index = () => {
  const [prompt, setPrompt] = useState(examples[0]);
  const labHref = `/collaborator?query=${encodeURIComponent(prompt.trim() || examples[0])}`;

  return (
    <AppShell eyebrow="Mathematical discovery instrument">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl content-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:px-8">
        <div>
          <Badge className="border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/10">
            <Infinity className="mr-2 h-3.5 w-3.5" />
            Autonomous math lab
          </Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Explore conjectures. Test the edges. Keep the trail.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A serious mathematical workspace with an ambient thinking engine. Generate conjectures, inspect assumptions, search for counterexamples, and export the useful parts.
          </p>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <label htmlFor="home-prompt" className="text-sm font-medium text-slate-200">
              Start with a question
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Input
                id="home-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="h-12 border-white/10 bg-black/20 text-white placeholder:text-slate-500 focus-visible:ring-cyan-300"
              />
              <Button asChild className="h-12 bg-cyan-300 px-5 text-slate-950 hover:bg-cyan-200">
                <Link to={labHref} state={{ initialQuery: prompt }}>
                  Open lab
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setPrompt(example)}
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="grid content-center gap-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Live product loop</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Conjecture workspace</h2>
              </div>
              <Badge className="border border-lime-300/30 bg-lime-300/10 text-lime-100">Ready</Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {workflow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="min-h-[150px] rounded-md border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Icon className="h-5 w-5 text-cyan-200" />
                      <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{item.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Claims', 'transparent'],
              ['Evidence', 'attached'],
              ['Sessions', 'saved'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-2 font-mono text-lg text-lime-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Badge variant="outline" className="border-amber-300/30 bg-amber-300/10 text-amber-100">
              Why it is different
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold text-white">Not a math-themed screensaver.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              THINK can still be ambient and strange, but the flagship experience is now useful: every generated idea has assumptions, evidence, and a next proof step.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              ['Workspace first', 'The collaborator is the main product, with THINK as a companion mode.'],
              ['Truth labels', 'Generated claims are marked as conjectures until users test them.'],
              ['Research memory', 'Saved sessions keep the app from resetting to zero every visit.'],
              ['Exportable output', 'Markdown export makes the work portable into notes or papers.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <CheckCircle2 className="h-5 w-5 text-lime-200" />
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Two modes, one trail</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Collaborate when you need rigor. Think when you need motion.</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
            <Link to="/collaborator">Open workspace</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link to="/infinity">
              <Network className="h-4 w-4" />
              Open THINK
            </Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
};

export default Index;
