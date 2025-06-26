
import { useEffect } from 'react';

interface KeyboardControlsProps {
  onTogglePause: () => void;
  onReset: () => void;
  onShowHistory: () => void;
  onSpeedChange: (speed: 'slow' | 'normal' | 'fast') => void;
  currentSpeed: 'slow' | 'normal' | 'fast';
}

export const useKeyboardControls = ({
  onTogglePause,
  onReset,
  onShowHistory,
  onSpeedChange,
  currentSpeed
}: KeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent default behavior for our shortcuts
      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          onTogglePause();
          break;
        case 'r':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onReset();
          }
          break;
        case 'h':
          event.preventDefault();
          onShowHistory();
          break;
        case '1':
          event.preventDefault();
          onSpeedChange('slow');
          break;
        case '2':
          event.preventDefault();
          onSpeedChange('normal');
          break;
        case '3':
          event.preventDefault();
          onSpeedChange('fast');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onTogglePause, onReset, onShowHistory, onSpeedChange, currentSpeed]);
};
