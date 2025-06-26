import React, { useEffect, useRef } from 'react';
import { UniverseModel } from '../types/consciousness';

interface AmbientAudioProps {
  model: UniverseModel;
  depth: number;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ model, depth }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const updateAudio = () => {
      // Adjust audio parameters based on the model and depth
      let src = '';
      let volume = 0.1 + depth * 0.02;
      let playbackRate = 0.8 + depth * 0.01;

      switch (model) {
        case 'finite-finite':
          src = '/audio/finite-finite.mp3';
          volume = 0.2 + depth * 0.03;
          playbackRate = 0.7 + depth * 0.02;
          break;
        case 'finite-infinite':
          src = '/audio/finite-infinite.mp3';
          volume = 0.3 + depth * 0.04;
          playbackRate = 0.8 + depth * 0.03;
          break;
        case 'infinite-finite':
          src = '/audio/infinite-finite.mp3';
          volume = 0.4 + depth * 0.05;
          playbackRate = 0.9 + depth * 0.04;
          break;
        case 'infinite-infinite':
          src = '/audio/infinite-infinite.mp3';
          volume = 0.5 + depth * 0.06;
          playbackRate = 1.0 + depth * 0.05;
          break;
      }

      audioElement.src = src;
      audioElement.volume = Math.min(1.0, volume);
      audioElement.playbackRate = playbackRate;
      audioElement.loop = true;

      audioElement.play().catch(error => {
        console.error("Playback failed:", error);
      });
    };

    updateAudio();

    return () => {
      audioElement.pause();
    };
  }, [model, depth]);

  return (
    <audio ref={audioRef} preload="auto" />
  );
};
