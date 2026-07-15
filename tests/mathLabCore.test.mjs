import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createConjecture,
  createResearchEntry,
  evaluateConjecture,
  getDomainProfile,
  getStarterPrompts,
} from '../src/lib/mathLabCore.js';

test('creates a conjecture with transparent mathematical evidence', () => {
  const conjecture = createConjecture({
    domain: 'topology',
    query: 'How do holes persist across noisy point clouds?',
    conceptCount: 4,
  });

  assert.equal(conjecture.domain, 'topology');
  assert.match(conjecture.statement, /If .* then .*\./);
  assert.equal(conjecture.assumptions.length, 3);
  assert.equal(conjecture.examples.length, 3);
  assert.equal(conjecture.counterexamples.length, 2);
  assert.equal(conjecture.proofPlan.length, 4);
  assert.ok(conjecture.confidence >= 0.48);
  assert.ok(conjecture.confidence <= 0.92);
  assert.equal(conjecture.status, 'Needs proof');
});

test('evaluates conjectures with a useful validation checklist', () => {
  const conjecture = createConjecture({
    domain: 'number-theory',
    query: 'prime gaps under modular constraints',
    conceptCount: 2,
  });

  const evaluation = evaluateConjecture(conjecture);

  assert.equal(evaluation.checks.length, 4);
  assert.ok(evaluation.summary.includes('evidence checks'));
  assert.ok(evaluation.nextAction.length > 10);
  assert.ok(evaluation.score >= 0);
  assert.ok(evaluation.score <= 100);
});

test('builds durable research log entries from current workspace state', () => {
  const conjecture = createConjecture({
    domain: 'combinatorics',
    query: 'spectral bounds for sparse graphs',
    conceptCount: 7,
  });
  const entry = createResearchEntry({
    title: 'Sparse Graph Session',
    activeDomain: 'combinatorics',
    query: 'spectral bounds for sparse graphs',
    conjectures: [conjecture],
    concepts: ['Ramsey pressure', 'Eigenvalue gaps'],
  });

  assert.equal(entry.title, 'Sparse Graph Session');
  assert.equal(entry.domain, 'combinatorics');
  assert.equal(entry.conjectureIds, [conjecture.id].join(','));
  assert.deepEqual(entry.concepts, ['Ramsey pressure', 'Eigenvalue gaps']);
  assert.ok(Date.parse(entry.createdAt));
});

test('exposes domain profiles and starter prompts for onboarding', () => {
  const profile = getDomainProfile('algebraic-geometry');
  const prompts = getStarterPrompts('algebraic-geometry');

  assert.equal(profile.id, 'algebraic-geometry');
  assert.equal(prompts.length, 3);
  assert.ok(prompts.every((prompt) => prompt.length > 20));
});

test('falls back to topology for unknown domains', () => {
  const profile = getDomainProfile('quantum-gastronomy');
  assert.equal(profile.id, 'topology');

  const conjecture = createConjecture({ domain: 'quantum-gastronomy', query: 'anything' });
  assert.equal(conjecture.domain, 'topology');
});

test('generates the same conjecture content for the same seed inputs', () => {
  const input = { domain: 'topology', query: 'persistent holes', conceptCount: 3 };
  const first = createConjecture(input);
  const second = createConjecture(input);

  assert.equal(first.id, second.id);
  assert.equal(first.statement, second.statement);
  assert.equal(first.confidence, second.confidence);
  assert.deepEqual(first.assumptions, second.assumptions);
});

test('uses the first starter prompt when the query is blank', () => {
  const conjecture = createConjecture({ domain: 'combinatorics', query: '   ' });
  assert.equal(conjecture.query, getDomainProfile('combinatorics').starterPrompts[0]);
});

test('flags weak evidence and demands strengthening before trust', () => {
  const conjecture = createConjecture({ domain: 'topology', query: 'weak evidence case' });
  const weakened = { ...conjecture, assumptions: [], examples: [], counterexamples: [], proofPlan: [] };
  const evaluation = evaluateConjecture(weakened);

  assert.ok(evaluation.checks.every((check) => check.status === 'warn'));
  assert.match(evaluation.nextAction, /Strengthen/);

  const full = evaluateConjecture(conjecture);
  assert.ok(full.score > evaluation.score);
  assert.match(full.nextAction, /counterexample search/);
});

test('defaults research entry titles and generates unique ids', () => {
  const first = createResearchEntry({ activeDomain: 'number-theory' });
  const second = createResearchEntry({ activeDomain: 'number-theory' });

  assert.equal(first.title, 'Number Theory session');
  assert.equal(first.conjectureIds, '');
  assert.notEqual(first.id, second.id);
});
