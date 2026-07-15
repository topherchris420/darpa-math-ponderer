# DARPA Math Ponderer

A mathematical discovery instrument: a conjecture workspace paired with an ambient
"thinking engine." Ask a research question, generate a conjecture with explicit
assumptions, pressure-test it against examples and counterexamples, and keep the
research trail — or just watch the system contemplate infinity on its own.

## The Two Modes

### 🔬 Conjecture Workspace (`/collaborator`)
The flagship experience — serious math play with honest labels:

- **Four domains**: Topology, Number Theory, Combinatorics, and Algebraic Geometry,
  each with its own primitives, starter prompts, and proof vocabulary
- **Transparent conjectures**: every generated claim ships with visible assumptions,
  examples to test, counterexample searches, and a suggested proof plan
- **Validation scoring**: an evidence checklist plus confidence score make it clear
  what is tested and what is still poetry
- **Research log**: save runs to a local, persistent log (stays in your browser)
- **Markdown export**: copy any conjecture — assumptions, examples, and proof plan
  intact — straight into your notes or paper

### 🌌 THINK — Ambient Mode (`/infinity`)
An autonomous engine that contemplates mathematical infinity in real time:

- **Self-modifying kernel**: symbolic weights and semantic fields evolve with
  entropy and usage; grammar templates adapt to the current cosmic state
- **Four cosmic states**: finite-finite, finite-infinite, infinite-finite, and
  infinite-infinite, with entropy-driven transitions between them
- **Four views**: Mind (thought stream over the cosmic canvas), Depth, Network,
  and Resonance visualizations
- **Playback control**: pause the stream or run it at 0.5×/1×/2×
- **Send to workspace**: promote any generated thought into a testable conjecture
  with one click

## Getting Started

### Prerequisites
- Node.js 18+ (or [Bun](https://bun.sh))
- A modern browser

### Installation
```bash
git clone https://github.com/topherchris420/darpa-math-ponderer.git
cd darpa-math-ponderer

# Install dependencies
bun install   # or: npm install

# Start the development server
bun dev       # or: npm run dev
```

Open `http://localhost:8080` (Vite picks the next free port if 8080 is busy and
prints it in the terminal).

### Scripts
| Command | What it does |
| --- | --- |
| `dev` | Start the Vite dev server |
| `build` | Production build to `dist/` |
| `preview` | Serve the production build locally |
| `test` | Run the unit tests (`node --test`) |
| `lint` | ESLint over the whole repo |
| `typecheck` | TypeScript type-check without emitting |

## Project Structure

```
src/
├── pages/            # Route components: Index (home), Collaborator, Infinity, NotFound
├── components/
│   ├── MathematicsCollaborator.tsx   # The conjecture workspace
│   ├── Think.tsx                     # THINK mode shell (views, playback controls)
│   ├── CosmologyEngine.tsx           # Entropy simulation + cosmic state transitions
│   ├── SelfModifyingKernel.tsx       # Grammar-driven thought generation
│   ├── consciousness/                # Thought display, metrics
│   ├── cosmic/                       # Canvas particle/background systems
│   ├── novel/                        # Depth, network, resonance visualizers
│   └── ui/                           # shadcn/ui primitives
├── hooks/            # useConsciousness, useResearchLog, ...
├── lib/mathLabCore.js # Domain profiles, conjecture generation + evaluation (tested)
└── types/            # Shared TypeScript types
tests/                # node:test unit tests for mathLabCore
```

## Technology Stack

- **React 18** + **TypeScript** with route-level code splitting
- **Vite** for build tooling
- **Tailwind CSS** + **shadcn/ui** components
- **Canvas 2D** for the cosmic visualizations
- **node:test** for dependency-free unit tests

## Design Philosophy

Not a math-themed screensaver. THINK can be ambient and strange, but the flagship
experience is rigorously useful:

- **Truth labels** — generated claims are marked as conjectures until tested
- **Workspace first** — the collaborator is the product; THINK is a companion mode
- **Research memory** — saved sessions persist between visits
- **Exportable output** — markdown export makes the work portable

## Contributing

Contributions that enhance the mathematical depth, visual quality, or rigor of the
instrument are welcome.

## License

MIT License — explore, modify, and build upon it freely.

---

*"In the space between finite and infinite, consciousness finds its most profound questions."*
