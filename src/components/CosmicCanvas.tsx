import React, { useEffect, useRef, useState } from 'react';
import { CosmicState } from './CosmologyEngine';

interface CosmicCanvasProps {
  model: CosmicState;
  depth: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({ model, depth }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const feedbackBuffer = useRef<ImageData | null>(null);

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

    const animate = () => {
      // Implement recursive visual feedback
      if (feedbackBuffer.current && depth > 2) {
        ctx.putImageData(feedbackBuffer.current, 0, 0);
        ctx.globalAlpha = 0.95;
        ctx.scale(0.99, 0.99);
        ctx.translate(1, 1);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Create base gradient with entropy influence
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      
      const entropyColor = Math.min(depth * 10, 255);
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.1 + depth * 0.02})`);
      gradient.addColorStop(0.5, `rgba(${entropyColor}, 50, 150, ${0.05 + depth * 0.01})`);
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset transformations for main rendering
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;

      // Model-specific visualizations with recursive enhancement
      switch (model) {
        case 'finite-finite':
          drawFiniteFinite(ctx, time, depth, recursiveDepth);
          break;
        case 'finite-infinite':
          drawFiniteInfinite(ctx, time, depth, recursiveDepth);
          break;
        case 'infinite-finite':
          drawInfiniteFinite(ctx, time, depth, recursiveDepth);
          break;
        case 'infinite-infinite':
          drawInfiniteInfinite(ctx, time, depth, recursiveDepth);
          break;
      }

      // Store feedback buffer for recursive processing
      if (depth > 2) {
        feedbackBuffer.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      time += 0.01 / (1 + depth * 0.05); // Slow down with depth
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [model, depth, dimensions]);

  const drawFiniteFinite = (ctx: CanvasRenderingContext2D, time: number, depth: number, recursiveDepth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const gridSize = Math.max(20, 40 - depth);
    const cols = Math.floor(ctx.canvas.width / gridSize);
    const rows = Math.floor(ctx.canvas.height / gridSize);

    ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 + Math.sin(time) * 0.1 + depth * 0.02})`;
    ctx.lineWidth = 1 + depth * 0.1;

    // Recursive collapsing grid with self-reference
    for (let level = 0; level <= Math.min(recursiveDepth, 5); level++) {
      const scale = Math.pow(0.8, level);
      const offset = level * 10;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize * scale + offset;
          const y = j * gridSize * scale + offset;
          const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const collapse = Math.sin(time * 2 + distanceFromCenter * 0.01 + level) * (depth * 0.1);
          
          const size = gridSize * scale * (1 - collapse * 0.1);
          
          ctx.globalAlpha = 0.8 / (level + 1);
          ctx.strokeRect(x - size/2, y - size/2, size, size);
        }
      }
    }
    ctx.globalAlpha = 1;
  };

  const drawFiniteInfinite = (ctx: CanvasRenderingContext2D, time: number, depth: number, recursiveDepth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const numRings = 8 + Math.floor(depth);

    ctx.strokeStyle = `rgba(99, 102, 241, ${0.4 + Math.sin(time) * 0.2})`;
    ctx.lineWidth = 2;

    // Recursive expanding bounded loops
    for (let level = 0; level <= Math.min(recursiveDepth, 3); level++) {
      const levelOffset = level * 20;
      
      for (let i = 0; i < numRings; i++) {
        const radius = 50 + i * 40 + Math.sin(time + i + level) * 20 + levelOffset;
        const expansion = Math.sin(time * 0.5 + i * 0.5 + level) * (depth * 0.05);
        
        ctx.globalAlpha = 0.6 / (level + 1);
        ctx.beginPath();
        ctx.arc(centerX + levelOffset, centerY + levelOffset, radius * (1 + expansion), 0, Math.PI * 2);
        ctx.stroke();
        
        // Add paradox markers at high depth
        if (depth > 5 && level === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
          ctx.font = `${12 + depth}px monospace`;
          ctx.fillText('∞', centerX + Math.cos(i) * radius, centerY + Math.sin(i) * radius);
        }
      }
    }
    ctx.globalAlpha = 1;
  };

  const drawInfiniteFinite = (ctx: CanvasRenderingContext2D, time: number, depth: number, recursiveDepth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 + Math.sin(time) * 0.1})`;
    ctx.lineWidth = 1;

    // Recursive fractal trees with increasing complexity
    const drawBranch = (x: number, y: number, angle: number, length: number, generation: number, level: number) => {
      if (generation > 6 + level || length < 2) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      ctx.globalAlpha = 0.7 / (level + 1);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      const newLength = length * (0.7 + Math.sin(time + generation + level) * 0.1);
      const angleOffset = 0.5 + Math.sin(time * 0.5 + level) * 0.3;

      drawBranch(endX, endY, angle - angleOffset, newLength, generation + 1, level);
      drawBranch(endX, endY, angle + angleOffset, newLength, generation + 1, level);
    };

    // Multiple recursive levels
    for (let level = 0; level <= Math.min(recursiveDepth, 3); level++) {
      const offset = level * 30;
      drawBranch(centerX + offset, centerY + 100 + offset, -Math.PI / 2, 100 - level * 20, 0, level);
    }
    
    ctx.globalAlpha = 1;
  };

  const drawInfiniteInfinite = (ctx: CanvasRenderingContext2D, time: number, depth: number, recursiveDepth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    // Recursive spirals with increasing abstraction
    ctx.strokeStyle = `rgba(192, 132, 252, ${0.4 + Math.sin(time) * 0.2})`;
    ctx.lineWidth = 1;

    const numSpirals = 5 + Math.floor(depth * 0.5);
    
    for (let level = 0; level <= Math.min(recursiveDepth, 4); level++) {
      const levelAlpha = 0.8 / (level + 1);
      const levelOffset = level * 15;
      
      for (let s = 0; s < numSpirals; s++) {
        ctx.globalAlpha = levelAlpha;
        ctx.beginPath();
        
        for (let i = 0; i < 200 + level * 50; i++) {
          const angle = i * (0.1 + level * 0.02) + time + s * Math.PI * 0.4 + level;
          const radius = i * (2 + level) + Math.sin(time * 2 + s + level) * 10;
          const x = centerX + levelOffset + Math.cos(angle) * radius;
          const y = centerY + levelOffset + Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // Mandelbrot-like recursive patterns with increasing complexity
    ctx.fillStyle = `rgba(147, 51, 234, ${0.1 + Math.sin(time) * 0.05})`;
    
    for (let level = 0; level <= Math.min(recursiveDepth, 3); level++) {
      const points = 50 + level * 20;
      const levelOffset = level * 25;
      
      ctx.globalAlpha = 0.6 / (level + 1);
      
      for (let i = 0; i < points; i++) {
        const x = centerX + levelOffset + Math.sin(time + i * 0.1 + level) * (100 + i * 5 + level * 20);
        const y = centerY + levelOffset + Math.cos(time * 1.3 + i * 0.1 + level) * (100 + i * 5 + level * 20);
        const size = (5 + Math.sin(time * 2 + i + level) * 3) * (1 + level * 0.2);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add recursive symbols at high depth
        if (depth > 10 && level === 0 && i % 10 === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(time + i) * 0.1})`;
          ctx.font = `${8 + depth}px monospace`;
          ctx.fillText('∞', x - 5, y + 5);
          ctx.fillStyle = `rgba(147, 51, 234, ${0.1 + Math.sin(time) * 0.05})`;
        }
      }
    }
    
    ctx.globalAlpha = 1;
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
};
