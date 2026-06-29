import React from 'react';
import { Book, Grid3x3, Infinity as InfinityIcon, Triangle } from 'lucide-react';
import { DOMAIN_PROFILES } from '@/lib/mathLabCore.js';

interface DomainSelectorProps {
  activeDomain: string;
  onDomainChange: (domain: string) => void;
}

const domainIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  topology: InfinityIcon,
  'number-theory': Grid3x3,
  combinatorics: Triangle,
  'algebraic-geometry': Book,
};

const tones = ['cyan', 'lime', 'amber', 'rose'] as const;

export const DomainSelector: React.FC<DomainSelectorProps> = ({ activeDomain, onDomainChange }) => {
  const domains = Object.values(DOMAIN_PROFILES);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {domains.map((domain, index) => {
        const Icon = domainIcons[domain.id] ?? InfinityIcon;
        const isActive = activeDomain === domain.id;
        const tone = tones[index % tones.length];

        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => onDomainChange(domain.id)}
            className={`min-h-[154px] rounded-lg border p-4 text-left transition ${
              isActive
                ? 'border-cyan-300 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/30'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:bg-white/[0.07]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <Icon className={`h-5 w-5 ${isActive ? 'text-slate-950' : toneClass(tone)}`} />
              <span className={`rounded-md border px-2 py-1 text-xs ${isActive ? 'border-slate-950/20 bg-slate-950/10' : 'border-white/10 bg-black/20 text-slate-400'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-4 font-semibold">{domain.label}</h3>
            <p className={`mt-2 text-sm leading-6 ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{domain.tagline}</p>
          </button>
        );
      })}
    </div>
  );
};

const toneClass = (tone: (typeof tones)[number]) => {
  switch (tone) {
    case 'lime':
      return 'text-lime-200';
    case 'amber':
      return 'text-amber-200';
    case 'rose':
      return 'text-rose-200';
    case 'cyan':
    default:
      return 'text-cyan-200';
  }
};
