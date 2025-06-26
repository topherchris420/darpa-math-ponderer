
import React, { useState, useCallback } from 'react';
import { MathematicalAI } from './MathematicalAI';
import { DomainSelector } from './DomainSelector';
import { ConceptVisualizer } from './ConceptVisualizer';
import { TheoremBuilder } from './TheoremBuilder';

interface MathematicalConcept {
  id: string;
  domain: string;
  concept: string;
  confidence: number;
  connections: string[];
  proofHints: string[];
  visualizable: boolean;
}

interface Theorem {
  id: string;
  statement: string;
  domain: string;
  confidence: number;
  proofHints: string[];
  timestamp: Date;
}

export const MathematicsCollaborator: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState('topology');
  const [discoveredConcepts, setDiscoveredConcepts] = useState<MathematicalConcept[]>([]);
  const [generatedTheorems, setGeneratedTheorems] = useState<Theorem[]>([]);
  const [userQuery, setUserQuery] = useState<string>();

  const handleConceptDiscovered = useCallback((concept: MathematicalConcept) => {
    setDiscoveredConcepts(prev => [...prev, concept]);
  }, []);

  const handleTheoremGenerated = useCallback((statement: string, domain: string) => {
    const theorem: Theorem = {
      id: `theorem-${Date.now()}`,
      statement,
      domain,
      confidence: 0.6 + Math.random() * 0.3,
      proofHints: ['Apply standard techniques', 'Consider edge cases', 'Use induction if applicable'],
      timestamp: new Date()
    };
    setGeneratedTheorems(prev => [...prev, theorem]);
  }, []);

  const handleTheoremQuery = useCallback((query: string) => {
    setUserQuery(query);
    // Clear the query after a short delay to trigger new AI reasoning
    setTimeout(() => setUserQuery(undefined), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-thin text-white tracking-widest">
            MATHEMATICS COLLABORATOR
          </h1>
          <p className="text-xl text-purple-200 font-light max-w-3xl mx-auto">
            AI-powered mathematical discovery through human-machine collaboration. 
            Explore novel structures, theorems, and conjectures across domains.
          </p>
        </div>

        {/* Domain Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-white text-center">Mathematical Domains</h2>
          <DomainSelector 
            activeDomain={activeDomain} 
            onDomainChange={setActiveDomain} 
          />
        </div>

        {/* Main Collaboration Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: AI Engine and Theorem Builder */}
          <div className="space-y-6">
            <MathematicalAI
              onConceptDiscovered={handleConceptDiscovered}
              onTheoremGenerated={handleTheoremGenerated}
              userQuery={userQuery}
              activeDomain={activeDomain}
            />
            
            <TheoremBuilder
              theorems={generatedTheorems}
              onTheoremQuery={handleTheoremQuery}
              activeDomain={activeDomain}
            />
          </div>

          {/* Right Column: Visualization */}
          <div>
            <ConceptVisualizer
              concepts={discoveredConcepts}
              activeDomain={activeDomain}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
          <div className="flex justify-center space-x-8 text-sm text-slate-300">
            <span>Domain: <span className="text-purple-300">{activeDomain}</span></span>
            <span>•</span>
            <span>Concepts: <span className="text-blue-300">{discoveredConcepts.filter(c => c.domain === activeDomain).length}</span></span>
            <span>•</span>
            <span>Theorems: <span className="text-green-300">{generatedTheorems.filter(t => t.domain === activeDomain).length}</span></span>
            <span>•</span>
            <span className="text-purple-400">expMath Vision: Human-AI Mathematical Collaboration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
