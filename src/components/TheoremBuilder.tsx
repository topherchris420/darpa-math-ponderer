
import React, { useState } from 'react';
import { FileText, Lightbulb, Search } from 'lucide-react';

interface Theorem {
  id: string;
  statement: string;
  domain: string;
  confidence: number;
  proofHints: string[];
  timestamp: Date;
}

interface TheoremBuilderProps {
  theorems: Theorem[];
  onTheoremQuery: (query: string) => void;
  activeDomain: string;
}

export const TheoremBuilder: React.FC<TheoremBuilderProps> = ({
  theorems,
  onTheoremQuery,
  activeDomain
}) => {
  const [query, setQuery] = useState('');
  const [selectedTheorem, setSelectedTheorem] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onTheoremQuery(query.trim());
      setQuery('');
    }
  };

  const domainTheorems = theorems.filter(t => t.domain === activeDomain);

  return (
    <div className="space-y-6">
      {/* Natural Language Query Interface */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-light text-white">Natural Language Theorem Explorer</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ask about ${activeDomain} concepts... e.g., "What can we say about prime gaps?" or "How do manifolds relate to topology?"`}
              className="w-full h-24 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            Explore with AI
          </button>
        </form>
      </div>

      {/* Generated Theorems */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-light text-white">Discovered Theorems</h3>
          <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">
            {domainTheorems.length}
          </span>
        </div>

        {domainTheorems.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No theorems discovered yet</p>
            <p className="text-sm">Activate the AI and explore concepts to generate new theorems</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {domainTheorems.map((theorem) => (
              <div
                key={theorem.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedTheorem === theorem.id
                    ? 'border-purple-400 bg-purple-900/20'
                    : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                }`}
                onClick={() => setSelectedTheorem(
                  selectedTheorem === theorem.id ? null : theorem.id
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-xs text-slate-400">
                      Confidence: {(theorem.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {theorem.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-white text-sm leading-relaxed mb-2">
                  {theorem.statement}
                </p>
                
                {selectedTheorem === theorem.id && theorem.proofHints.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-600">
                    <p className="text-slate-300 text-xs mb-2">Proof Hints:</p>
                    <ul className="space-y-1">
                      {theorem.proofHints.map((hint, index) => (
                        <li key={index} className="text-slate-400 text-xs ml-4">
                          • {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
