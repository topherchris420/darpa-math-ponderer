
import React, { useEffect, useRef } from 'react';
import { UniverseModel } from './Think';

interface AmbientAudioProps {
  model: UniverseModel;
  depth: number;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ model, depth }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    // Clean up existing oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current = [];
    gainNodesRef.current = [];

    // Create audio based on current model
    switch (model) {
      case 'finite-finite':
        createFiniteFiniteAudio(audioContext);
        break;
      case 'finite-infinite':
        createFiniteInfiniteAudio(audioContext);
        break;
      case 'infinite-finite':
        createInfiniteFiniteAudio(audioContext);
        break;
      case 'infinite-infinite':
        createInfiniteInfiniteAudio(audioContext);
        break;
    }

    return () => {
      // Cleanup on unmount or model change
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
    };
  }, [model]);

  // Update audio parameters based on depth
  useEffect(() => {
    const depthFactor = Math.min(depth / 10, 1);
    gainNodesRef.current.forEach((gainNode, index) => {
      if (gainNode) {
        gainNode.gain.setValueAtTime(
          0.05 + depthFactor * 0.05 * (1 + Math.sin(Date.now() * 0.001 + index) * 0.2), 
          audioContextRef.current!.currentTime
        );
      }
    });
  }, [depth]);

  const createFiniteFiniteAudio = (audioContext: AudioContext) => {
    // Tick/decay sounds - short, percussive tones that fade
    const frequencies = [220, 330, 440];
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      
      // Create tick pattern
      setInterval(() => {
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      }, 2000 + index * 500);
      
      oscillatorsRef.current.push(oscillator);
      gainNodesRef.current.push(gainNode);
    });
  };

  const createFiniteInfiniteAudio = (audioContext: AudioContext) => {
    // Glissandi - sweeping tones
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Create sweeping frequency changes
    let currentTime = audioContext.currentTime;
    setInterval(() => {
      const targetFreq = 200 + Math.sin(Date.now() * 0.0005) * 100;
      oscillator.frequency.setTargetAtTime(targetFreq, currentTime, 2);
      currentTime += 3;
    }, 3000);
    
    oscillatorsRef.current.push(oscillator);
    gainNodesRef.current.push(gainNode);
  };

  const createInfiniteFiniteAudio = (audioContext: AudioContext) => {
    // Harmonic rise with cutoffs
    const fundamentalFreq = 110;
    const harmonics = [1, 2, 3, 4, 5, 6, 7, 8];
    
    harmonics.forEach((harmonic, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(fundamentalFreq * harmonic, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.02 / harmonic, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      
      // Create rising and cutting pattern
      setInterval(() => {
        gainNode.gain.setValueAtTime(0.05 / harmonic, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
      }, 4000 + index * 200);
      
      oscillatorsRef.current.push(oscillator);
      gainNodesRef.current.push(gainNode);
    });
  };

  const createInfiniteInfiniteAudio = (audioContext: AudioContext) => {
    // Infinite drones and Shepard tones
    const baseFrequencies = [55, 110, 220, 440, 880];
    
    baseFrequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      const baseGain = 0.03 / (index + 1);
      gainNode.gain.setValueAtTime(baseGain, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      
      // Create slow, continuous modulation for Shepard tone effect
      setInterval(() => {
        const modulation = Math.sin(Date.now() * 0.0001 * (index + 1)) * 0.5 + 0.5;
        gainNode.gain.setValueAtTime(baseGain * modulation, audioContext.currentTime);
      }, 100);
      
      oscillatorsRef.current.push(oscillator);
      gainNodesRef.current.push(gainNode);
    });
  };

  return null; // This component doesn't render anything visual
};
