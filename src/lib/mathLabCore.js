export const DOMAIN_PROFILES = {
  topology: {
    id: 'topology',
    label: 'Topology',
    tagline: 'Shape, continuity, holes, invariants, and deformation.',
    focus: 'How structure survives continuous change.',
    primitives: ['space', 'map', 'cover', 'loop', 'homology class'],
    assumptions: [
      'the space is compact enough to admit a finite cover',
      'the deformation preserves connected components',
      'the observed filtration is stable under small perturbations',
      'the boundary operator is well-defined at each scale',
    ],
    claims: [
      'persistent features identify the same invariant across nearby scales',
      'local continuity constraints determine a global obstruction',
      'the induced map preserves the feature that carries the largest lifetime',
      'holes that survive refinement correspond to measurable structural signal',
    ],
    examples: ['circle with noisy samples', 'torus projected into point-cloud data', 'nested annuli with persistent holes'],
    counterexamples: ['non-Hausdorff quotient', 'sampling below the feature scale', 'disconnected cover with no compatible gluing'],
    proofPlan: ['Define the filtration', 'Track induced maps', 'Bound perturbation error', 'Extract the invariant'],
    starterPrompts: [
      'How do holes persist across noisy point clouds?',
      'When does a local cover imply a global topological obstruction?',
      'Can homology distinguish signal from sampling noise?',
    ],
  },
  'number-theory': {
    id: 'number-theory',
    label: 'Number Theory',
    tagline: 'Integers, primes, modular structure, and arithmetic patterns.',
    focus: 'Where rigid arithmetic rules produce surprising regularity.',
    primitives: ['prime', 'residue class', 'height', 'L-function', 'sieve bound'],
    assumptions: [
      'the sequence is restricted to a fixed residue class',
      'the growth rate is measured on a logarithmic scale',
      'local congruence obstructions have been removed',
      'the density estimate is uniform over the tested interval',
    ],
    claims: [
      'the normalized gaps obey a sharper bound than the unrestricted case',
      'local modular structure predicts the first-order distribution',
      'height constraints expose a finite search region for counterexamples',
      'averaged residue behavior controls the exceptional set',
    ],
    examples: ['primes congruent to 1 mod 4', 'rational points under bounded height', 'short intervals with fixed residue classes'],
    counterexamples: ['small primes below the asymptotic range', 'residue classes with local obstruction', 'sequences with hidden periodicity'],
    proofPlan: ['Remove local obstructions', 'Estimate density', 'Search bounded cases', 'Prove the tail bound'],
    starterPrompts: [
      'What happens to prime gaps under modular constraints?',
      'Can bounded height reveal a finite counterexample search?',
      'Which residue classes behave like the unrestricted integers?',
    ],
  },
  combinatorics: {
    id: 'combinatorics',
    label: 'Combinatorics',
    tagline: 'Counting, extremal structure, graphs, and finite configurations.',
    focus: 'How finite rules create large-scale constraints.',
    primitives: ['graph', 'coloring', 'minor', 'matching', 'generating function'],
    assumptions: [
      'the structure is finite and simple',
      'the forbidden configuration is fixed',
      'the graph family is closed under induced subgraphs',
      'the extremal parameter is monotone under deletion',
    ],
    claims: [
      'a spectral gap forces the extremal configuration to stabilize',
      'the forbidden pattern creates a sharp threshold',
      'a generating function records the obstruction in its dominant term',
      'random construction matches the deterministic upper bound up to constants',
    ],
    examples: ['sparse expander families', 'triangle-free graphs', 'bounded-degree Ramsey instances'],
    counterexamples: ['multigraphs with repeated edges', 'dense graphs outside the stated family', 'non-monotone constraints'],
    proofPlan: ['State the forbidden pattern', 'Build the extremal example', 'Prove the upper bound', 'Compare thresholds'],
    starterPrompts: [
      'What spectral bounds control sparse graph structure?',
      'Where do forbidden subgraphs create sharp thresholds?',
      'Can a generating function reveal the extremal obstruction?',
    ],
  },
  'algebraic-geometry': {
    id: 'algebraic-geometry',
    label: 'Algebraic Geometry',
    tagline: 'Polynomial spaces, moduli, sheaves, and geometric constraints.',
    focus: 'How algebraic equations organize geometric worlds.',
    primitives: ['scheme', 'sheaf', 'moduli point', 'divisor', 'cohomology group'],
    assumptions: [
      'the family is flat over the base',
      'the moduli problem has a stable compactification',
      'the divisor class is effective',
      'local deformation spaces glue compatibly',
    ],
    claims: [
      'the moduli dimension bounds the possible deformation types',
      'sheaf cohomology detects the first global obstruction',
      'intersection data determines the visible component of the solution space',
      'stability conditions eliminate the pathological family members',
    ],
    examples: ['families of elliptic curves', 'linear systems on surfaces', 'stable vector bundles'],
    counterexamples: ['non-flat degeneration', 'singular member outside the stability condition', 'base change failure'],
    proofPlan: ['Set up the family', 'Compute local deformations', 'Check obstruction groups', 'Compare moduli dimensions'],
    starterPrompts: [
      'How does a moduli dimension constrain deformation types?',
      'When does sheaf cohomology expose a global obstruction?',
      'Can stability remove bad degenerations from the search?',
    ],
  },
};

const FALLBACK_DOMAIN = 'topology';

export function getDomainProfile(domain) {
  return DOMAIN_PROFILES[domain] || DOMAIN_PROFILES[FALLBACK_DOMAIN];
}

export function getStarterPrompts(domain) {
  return [...getDomainProfile(domain).starterPrompts];
}

export function createConjecture({ domain, query = '', conceptCount = 0 }) {
  const profile = getDomainProfile(domain);
  const seed = `${profile.id}:${query}:${conceptCount}`;
  const assumption = pick(profile.assumptions, seed, 1);
  const claim = pick(profile.claims, seed, 2);
  const confidence = clamp(0.52 + conceptCount * 0.035 + normalizedHash(seed) * 0.18, 0.48, 0.92);

  return {
    id: `conj-${hashString(seed).toString(16)}`,
    domain: profile.id,
    title: `${profile.label} conjecture`,
    statement: `If ${assumption}, then ${claim}.`,
    query: query.trim() || profile.starterPrompts[0],
    assumptions: rotate(profile.assumptions, seed).slice(0, 3),
    examples: rotate(profile.examples, seed).slice(0, 3),
    counterexamples: rotate(profile.counterexamples, seed).slice(0, 2),
    proofPlan: rotate(profile.proofPlan, seed).slice(0, 4),
    confidence: Number(confidence.toFixed(2)),
    confidenceReason: confidenceReason(confidence, conceptCount),
    status: 'Needs proof',
    createdAt: new Date().toISOString(),
  };
}

export function evaluateConjecture(conjecture) {
  const checks = [
    {
      label: 'Assumptions stated',
      status: conjecture.assumptions?.length >= 3 ? 'pass' : 'warn',
      detail: 'Every claim needs visible conditions before a proof attempt.',
    },
    {
      label: 'Examples available',
      status: conjecture.examples?.length >= 2 ? 'pass' : 'warn',
      detail: 'Examples make the statement inspectable instead of poetic.',
    },
    {
      label: 'Counterexample search',
      status: conjecture.counterexamples?.length >= 2 ? 'pass' : 'warn',
      detail: 'A serious conjecture names where it might break.',
    },
    {
      label: 'Proof plan',
      status: conjecture.proofPlan?.length >= 4 ? 'pass' : 'warn',
      detail: 'The next move should be a concrete proof step.',
    },
  ];
  const passCount = checks.filter((check) => check.status === 'pass').length;
  const confidenceScore = Math.round((conjecture.confidence || 0) * 100);
  const score = Math.round((passCount / checks.length) * 70 + confidenceScore * 0.3);

  return {
    checks,
    score,
    summary: `${passCount}/${checks.length} evidence checks passed. Confidence is ${confidenceScore}%.`,
    nextAction:
      passCount === checks.length
        ? 'Try a bounded counterexample search before promoting this to a proof draft.'
        : 'Strengthen the weak evidence category before trusting the conjecture.',
  };
}

export function createResearchEntry({ title, activeDomain, query = '', conjectures = [], concepts = [] }) {
  const safeTitle = title?.trim() || `${getDomainProfile(activeDomain).label} session`;

  return {
    id: `entry-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title: safeTitle,
    domain: getDomainProfile(activeDomain).id,
    query: query.trim(),
    conjectureIds: conjectures.map((conjecture) => conjecture.id).join(','),
    concepts: [...concepts],
    createdAt: new Date().toISOString(),
  };
}

function confidenceReason(confidence, conceptCount) {
  if (confidence > 0.8) {
    return `Strong because ${conceptCount} related concepts support the same direction, but it still needs proof.`;
  }

  if (confidence > 0.65) {
    return 'Promising, with enough structure to test examples and search for counterexamples.';
  }

  return 'Early-stage. Treat this as a sketch until examples and proof obligations improve.';
}

function pick(values, seed, salt) {
  return values[(hashString(`${seed}:${salt}`) % values.length + values.length) % values.length];
}

function rotate(values, seed) {
  const start = hashString(seed) % values.length;
  return values.map((_, index) => values[(start + index) % values.length]);
}

function normalizedHash(value) {
  return (hashString(value) % 1000) / 1000;
}

function hashString(value) {
  return [...String(value)].reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
