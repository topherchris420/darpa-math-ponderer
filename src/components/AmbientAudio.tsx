import React, { useEffect, useRef } from 'react';
import { UniverseModel } from '../types/consciousness';

interface AmbientAudioProps {
  model: UniverseModel;
  depth: number;
}

const audioAvailability = new Map<string, Promise<boolean>>();

const hasAudioAsset = (src: string) => {
  if (!audioAvailability.has(src)) {
    audioAvailability.set(
      src,
      fetch(src, { method: 'HEAD' })
        .then((response) => response.ok)
        .catch(() => false)
    );
  }

  return audioAvailability.get(src)!;
};

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ model, depth }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    let cancelled = false;

    const updateAudio = async () => {
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

      const assetExists = await hasAudioAsset(src);
      if (cancelled || !assetExists) return;

      audioElement.src = src;
      audioElement.volume = Math.min(1.0, volume);
      audioElement.playbackRate = playbackRate;
      audioElement.loop = true;

      await audioElement.play().catch(() => undefined);
    };

    updateAudio();

    return () => {
      cancelled = true;
      audioElement.pause();
    };
  }, [model, depth]);

  return <audio ref={audioRef} preload="auto" />;
};
