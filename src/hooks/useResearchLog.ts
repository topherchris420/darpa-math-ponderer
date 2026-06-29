import { useEffect, useMemo, useState } from 'react';
import type { ResearchEntry } from '@/lib/mathLabCore.js';

const STORAGE_KEY = 'darpa-math-ponderer:research-log';

const readEntries = (): ResearchEntry[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useResearchLog = () => {
  const [entries, setEntries] = useState<ResearchEntry[]>(readEntries);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
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
