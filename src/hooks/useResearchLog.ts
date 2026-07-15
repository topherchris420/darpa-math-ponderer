import { useEffect, useMemo, useState } from 'react';
import type { ResearchEntry } from '@/lib/mathLabCore.js';

const STORAGE_KEY = 'darpa-math-ponderer:research-log';

const isResearchEntry = (value: unknown): value is ResearchEntry => {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Partial<ResearchEntry>;
  return typeof entry.id === 'string' && typeof entry.title === 'string' && typeof entry.createdAt === 'string';
};

const readEntries = (): ResearchEntry[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isResearchEntry) : [];
  } catch {
    return [];
  }
};

export const useResearchLog = () => {
  const [entries, setEntries] = useState<ResearchEntry[]>(readEntries);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Storage can be full or blocked (private mode); the in-memory log still works.
    }
  }, [entries]);

  const recentEntries = useMemo(() => {
    return [...entries].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }, [entries]);

  const addEntry = (entry: ResearchEntry) => {
    setEntries((current) => [entry, ...current].slice(0, 24));
  };

  const clearEntries = () => setEntries([]);

  return {
    entries: recentEntries,
    addEntry,
    clearEntries,
  };
};
