import React from 'react';
import { Clock3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResearchEntry } from '@/lib/mathLabCore.js';

interface ResearchLogPanelProps {
  entries: ResearchEntry[];
  onClear: () => void;
}

export const ResearchLogPanel: React.FC<ResearchLogPanelProps> = ({ entries, onClear }) => {
  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Research log</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Saved sessions</h2>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-white/10 hover:text-white"
          onClick={onClear}
          disabled={entries.length === 0}
          aria-label="Clear research log"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {entries.length === 0 ? (
          <div className="rounded-md border border-dashed border-white/15 p-4 text-sm leading-6 text-slate-400">
            Save a run from the workspace and it will appear here. The log stays in this browser.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-md border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-white">{entry.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-200">{entry.domain}</p>
                </div>
                <Clock3 className="h-4 w-4 text-slate-500" />
              </div>
              {entry.query && <p className="mt-3 text-sm leading-6 text-slate-300">{entry.query}</p>}
              <p className="mt-3 text-xs text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
