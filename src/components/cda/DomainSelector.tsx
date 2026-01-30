import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';

const domains = [
  { value: 'cyber', label: 'Cyber Warfare' },
  { value: 'space', label: 'Space Operations' },
  { value: 'maritime', label: 'Maritime Security' },
  { value: 'air', label: 'Air Superiority' },
  { value: 'land', label: 'Land Combat' },
];

interface DomainSelectorProps {
  onDomainSelected: () => void;
}

const DomainSelector: React.FC<DomainSelectorProps> = ({ onDomainSelected }) => {
  const { selectDomain } = useAppContext();

  const handleSelect = (domain: string) => {
    selectDomain(domain);
    onDomainSelected();
  };

  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-cyan-500/30">
      <h2 className="text-lg font-light text-white mb-4">Select Domain</h2>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
          <SelectValue placeholder="Choose a domain..." />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 text-white border-slate-600">
          {domains.map((domain) => (
            <SelectItem key={domain.value} value={domain.value} className="hover:bg-slate-700">
              {domain.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DomainSelector;
