
import React from 'react';
import { Play, Pause, RotateCcw, History, Settings } from 'lucide-react';

interface ThinkingControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onReset: () => void;
  onShowHistory: () => void;
  thinkingSpeed: 'slow' | 'normal' | 'fast';
  onSpeedChange: (speed: 'slow' | 'normal' | 'fast') => void;
}

export const ThinkingControls: React.FC<ThinkingControlsProps> = ({
  isPaused,
  onTogglePause,
  onReset,
  onShowHistory,
  thinkingSpeed,
  onSpeedChange
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm border border-purple-500/20 rounded-full px-4 py-3">
        <button
          onClick={onTogglePause}
          className="p-2 text-purple-400 hover:text-white transition-colors rounded-full hover:bg-purple-500/20"
          title={isPaused ? 'Resume thinking' : 'Pause thinking'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        
        <button
          onClick={onReset}
          className="p-2 text-purple-400 hover:text-white transition-colors rounded-full hover:bg-purple-500/20"
          title="Reset consciousness"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={onShowHistory}
          className="p-2 text-purple-400 hover:text-white transition-colors rounded-full hover:bg-purple-500/20"
          title="View thought history"
        >
          <History className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-1 px-2">
          <Settings className="w-4 h-4 text-purple-400" />
          <select
            value={thinkingSpeed}
            onChange={(e) => onSpeedChange(e.target.value as 'slow' | 'normal' | 'fast')}
            className="bg-transparent text-purple-400 text-sm border-none outline-none cursor-pointer"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
};
