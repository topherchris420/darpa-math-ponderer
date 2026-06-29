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
