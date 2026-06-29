export interface DomainProfile {
  id: string;
  label: string;
  tagline: string;
  focus: string;
  primitives: string[];
  assumptions: string[];
  claims: string[];
  examples: string[];
  counterexamples: string[];
  proofPlan: string[];
  starterPrompts: string[];
}

export interface Conjecture {
  id: string;
  domain: string;
  title: string;
  statement: string;
  query: string;
  assumptions: string[];
  examples: string[];
  counterexamples: string[];
  proofPlan: string[];
  confidence: number;
  confidenceReason: string;
  status: string;
  createdAt: string;
}

export interface ValidationCheck {
  label: string;
  status: 'pass' | 'warn';
  detail: string;
}

export interface ConjectureEvaluation {
  checks: ValidationCheck[];
  score: number;
  summary: string;
  nextAction: string;
}

export interface ResearchEntry {
  id: string;
  title: string;
  domain: string;
  query: string;
  conjectureIds: string;
  concepts: string[];
  createdAt: string;
}

export const DOMAIN_PROFILES: Record<string, DomainProfile>;

export function getDomainProfile(domain: string): DomainProfile;

export function getStarterPrompts(domain: string): string[];

export function createConjecture(input: {
  domain: string;
  query?: string;
  conceptCount?: number;
}): Conjecture;

export function evaluateConjecture(conjecture: Conjecture): ConjectureEvaluation;

export function createResearchEntry(input: {
  title?: string;
  activeDomain: string;
  query?: string;
  conjectures?: Conjecture[];
  concepts?: string[];
}): ResearchEntry;
