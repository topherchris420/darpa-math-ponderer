
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
  
  // Mobile optimization: Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const devicePixelRatio = window.devicePixelRatio || 1;

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

    // Mobile optimization: Reduce canvas resolution on mobile devices
    const scaleFactor = isMobile ? 0.5 : 1;
    canvas.width = dimensions.width * scaleFactor;
    canvas.height = dimensions.height * scaleFactor;
    
    // Scale back up using CSS
    canvas.style.width = dimensions.width + 'px';
    canvas.style.height = dimensions.height + 'px';
    
    // Scale the drawing context
    ctx.scale(scaleFactor, scaleFactor);

    let time = 0;
    const recursiveDepth = Math.floor(depth);

    // Mobile optimization: Reduce particle count on mobile
    const particleCount = isMobile ? 10 : 20;
    
    // Initialize thinking particles
    thinkingParticles.current = [];
    for (let i = 0; i < particleCount; i++) {
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
      // Mobile optimization: Reduce feedback effects on mobile
      if (feedbackBuffer.current && depth > 2 && !isMobile) {
        ctx.putImageData(feedbackBuffer.current, 0, 0);
        ctx.globalAlpha = 0.92;
        ctx.scale(0.995, 0.995);
        ctx.translate(0.5, 0.5);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      CosmicBackground.createPulsingGradient({ ctx, time, depth, canvas });

      // Reset transformations for main rendering
      ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
      ctx.globalAlpha = 1;

      // Draw thinking particles
      ParticleSystem.drawThinkingParticles({ ctx, time, depth, particles: thinkingParticles });

      // Model-specific visualizations with mobile optimization
      const mobileRecursiveDepth = isMobile ? Math.min(recursiveDepth, 2) : recursiveDepth;
      
      switch (model) {
        case 'finite-finite':
          CosmicStateVisualizers.drawFiniteFinite(ctx, time, depth, mobileRecursiveDepth);
          break;
        case 'finite-infinite':
          CosmicStateVisualizers.drawFiniteInfinite(ctx, time, depth, mobileRecursiveDepth);
          break;
        case 'infinite-finite':
          CosmicStateVisualizers.drawInfiniteFinite(ctx, time, depth, mobileRecursiveDepth);
          break;
        case 'infinite-infinite':
          CosmicStateVisualizers.drawInfiniteInfinite(ctx, time, depth, mobileRecursiveDepth);
          break;
      }

      // Add neural network-like connections
      ParticleSystem.drawThoughtConnections(ctx, time, depth);

      // Store feedback buffer for recursive processing (desktop only)
      if (depth > 2 && !isMobile) {
        feedbackBuffer.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      // Mobile optimization: Slower animation frame rate on mobile
      time += isMobile ? 0.01 : 0.015 / (1 + depth * 0.03);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [model, depth, dimensions, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60 touch-none"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
};
