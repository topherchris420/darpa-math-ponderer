
import React from 'react';
import { Book, Grid3x3, Infinity as InfinityIcon, Triangle } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface DomainSelectorProps {
  activeDomain: string;
  onDomainChange: (domain: string) => void;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({
  activeDomain,
  onDomainChange
}) => {
  const domains: Domain[] = [
    {
      id: 'topology',
      name: 'Topology',
      description: 'Study of spatial properties preserved under continuous deformations',
      icon: InfinityIcon,
      color: 'purple'
    },
    {
      id: 'number-theory',
      name: 'Number Theory',
      description: 'Properties and relationships of integers and rational numbers',
      icon: Grid3x3,
      color: 'blue'
    },
    {
      id: 'combinatorics',
      name: 'Combinatorics',
      description: 'Counting, arrangement, and optimization of discrete structures',
      icon: Triangle,
      color: 'green'
    },
    {
      id: 'algebraic-geometry',
      name: 'Algebraic Geometry',
      description: 'Geometric study of solutions to polynomial equations',
      icon: Book,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      purple: isActive ? 'bg-purple-600 border-purple-400 text-white' : 'bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40',
      blue: isActive ? 'bg-blue-600 border-blue-400 text-white' : 'bg-blue-900/30 border-blue-500/30 text-blue-200 hover:bg-blue-800/40',
      green: isActive ? 'bg-green-600 border-green-400 text-white' : 'bg-green-900/30 border-green-500/30 text-green-200 hover:bg-green-800/40',
      orange: isActive ? 'bg-orange-600 border-orange-400 text-white' : 'bg-orange-900/30 border-orange-500/30 text-orange-200 hover:bg-orange-800/40'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.purple;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {domains.map((domain) => {
        const Icon = domain.icon;
        const isActive = activeDomain === domain.id;
        
        return (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id)}
            className={`p-4 rounded-lg border transition-all duration-300 ${getColorClasses(domain.color, isActive)}`}
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon className="w-8 h-8" />
              <h3 className="font-medium text-sm">{domain.name}</h3>
              <p className="text-xs opacity-80 text-center leading-tight">
                {domain.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
