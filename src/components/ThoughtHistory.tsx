
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';

interface ThoughtHistoryProps {
  thoughts: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const ThoughtHistory: React.FC<ThoughtHistoryProps> = ({
  thoughts,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const exportThoughts = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const content = thoughts.map((thought, i) => `${i + 1}. ${thought}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thoughts-${timestamp}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900/90 backdrop-blur-sm border border-purple-500/20 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
          <h2 className="text-xl text-white">Thought History ({thoughts.length} thoughts)</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={exportThoughts}
              className="p-2 text-purple-400 hover:text-white transition-colors"
              title="Export thoughts"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-purple-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {thoughts.map((thought, index) => (
            <div key={index} className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/10">
              <div className="text-xs text-purple-400 mb-2">Thought #{index + 1}</div>
              <div className="text-white">{thought}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
