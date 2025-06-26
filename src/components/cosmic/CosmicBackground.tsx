
import React from 'react';

interface CosmicBackgroundProps {
  ctx: CanvasRenderingContext2D;
  time: number;
  depth: number;
  canvas: HTMLCanvasElement;
}

export const CosmicBackground = {
  createPulsingGradient: ({ ctx, time, depth, canvas }: CosmicBackgroundProps) => {
    // Create pulsing gradient background that responds to thinking
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    
    const thinkingIntensity = Math.sin(time * 2) * 0.1 + 0.1;
    const entropyColor = Math.min(depth * 15, 255);
    gradient.addColorStop(0, `rgba(139, 92, 246, ${0.15 + depth * 0.03 + thinkingIntensity})`);
    gradient.addColorStop(0.3, `rgba(${entropyColor}, 70, 180, ${0.1 + depth * 0.02})`);
    gradient.addColorStop(0.7, `rgba(75, 0, 130, ${0.08 + thinkingIntensity})`);
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};
