
import React, { useEffect, useRef, useState } from 'react';
import { CosmicState } from '../types/consciousness';
import { ParticleSystem } from './cosmic/ParticleSystem';
import { CosmicStateVisualizers } from './cosmic/CosmicStateVisualizers';
import { CosmicBackground } from './cosmic/CosmicBackground';

interface CosmicCanvasProps {
  model: CosmicState;
  depth: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({ model, depth }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const feedbackBuffer = useRef<ImageData | null>(null);
  const thinkingParticles = useRef<Array<{x: number, y: number, vx: number, vy: number, life: number, concept: string}>>([]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;
    const recursiveDepth = Math.floor(depth);

    // Initialize thinking particles
    for (let i = 0; i < 20; i++) {
      thinkingParticles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1.0,
        concept: ['∞', '□', '○', '△', '◇'][Math.floor(Math.random() * 5)]
      });
    }

    const animate = () => {
      // Enhanced visual feedback with thinking indicators
      if (feedbackBuffer.current && depth > 2) {
        ctx.putImageData(feedbackBuffer.current, 0, 0);
        ctx.globalAlpha = 0.92; // More persistent trails
        ctx.scale(0.995, 0.995);
        ctx.translate(0.5, 0.5);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      CosmicBackground.createPulsingGradient({ ctx, time, depth, canvas });

      // Reset transformations for main rendering
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;

      // Draw thinking particles that represent active contemplation
      ParticleSystem.drawThinkingParticles({ ctx, time, depth, particles: thinkingParticles });

      // Model-specific visualizations with enhanced dynamics
      switch (model) {
        case 'finite-finite':
          CosmicStateVisualizers.drawFiniteFinite(ctx, time, depth, recursiveDepth);
          break;
        case 'finite-infinite':
          CosmicStateVisualizers.drawFiniteInfinite(ctx, time, depth, recursiveDepth);
          break;
        case 'infinite-finite':
          CosmicStateVisualizers.drawInfiniteFinite(ctx, time, depth, recursiveDepth);
          break;
        case 'infinite-infinite':
          CosmicStateVisualizers.drawInfiniteInfinite(ctx, time, depth, recursiveDepth);
          break;
      }

      // Add neural network-like connections showing thinking process
      ParticleSystem.drawThoughtConnections(ctx, time, depth);

      // Store feedback buffer for recursive processing
      if (depth > 2) {
        feedbackBuffer.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      time += 0.015 / (1 + depth * 0.03); // Dynamic thinking speed
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [model, depth, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
};
