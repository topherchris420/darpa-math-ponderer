
import React, { useEffect, useRef, useState } from 'react';
import { UniverseModel } from './Think';

interface CosmicCanvasProps {
  model: UniverseModel;
  depth: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({ model, depth }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create base gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Model-specific visualizations
      switch (model) {
        case 'finite-finite':
          drawFiniteFinite(ctx, time, depth);
          break;
        case 'finite-infinite':
          drawFiniteInfinite(ctx, time, depth);
          break;
        case 'infinite-finite':
          drawInfiniteFinite(ctx, time, depth);
          break;
        case 'infinite-infinite':
          drawInfiniteInfinite(ctx, time, depth);
          break;
      }

      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [model, depth, dimensions]);

  const drawFiniteFinite = (ctx: CanvasRenderingContext2D, time: number, depth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const gridSize = 40;
    const cols = Math.floor(ctx.canvas.width / gridSize);
    const rows = Math.floor(ctx.canvas.height / gridSize);

    ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 + Math.sin(time) * 0.1})`;
    ctx.lineWidth = 1;

    // Collapsing grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const collapse = Math.sin(time * 2 + distanceFromCenter * 0.01) * (depth * 0.1);
        
        const size = gridSize * (1 - collapse * 0.1);
        ctx.strokeRect(x - size/2, y - size/2, size, size);
      }
    }
  };

  const drawFiniteInfinite = (ctx: CanvasRenderingContext2D, time: number, depth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const numRings = 8;

    ctx.strokeStyle = `rgba(99, 102, 241, ${0.4 + Math.sin(time) * 0.2})`;
    ctx.lineWidth = 2;

    // Expanding bounded loops
    for (let i = 0; i < numRings; i++) {
      const radius = 50 + i * 40 + Math.sin(time + i) * 20;
      const expansion = Math.sin(time * 0.5 + i * 0.5) * (depth * 0.05);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * (1 + expansion), 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawInfiniteFinite = (ctx: CanvasRenderingContext2D, time: number, depth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 + Math.sin(time) * 0.1})`;
    ctx.lineWidth = 1;

    // Fractal tree with cutoffs
    const drawBranch = (x: number, y: number, angle: number, length: number, generation: number) => {
      if (generation > 6 || length < 2) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      const newLength = length * (0.7 + Math.sin(time + generation) * 0.1);
      const angleOffset = 0.5 + Math.sin(time * 0.5) * 0.3;

      drawBranch(endX, endY, angle - angleOffset, newLength, generation + 1);
      drawBranch(endX, endY, angle + angleOffset, newLength, generation + 1);
    };

    drawBranch(centerX, centerY + 100, -Math.PI / 2, 100, 0);
  };

  const drawInfiniteInfinite = (ctx: CanvasRenderingContext2D, time: number, depth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    // Recursive spirals
    ctx.strokeStyle = `rgba(192, 132, 252, ${0.4 + Math.sin(time) * 0.2})`;
    ctx.lineWidth = 1;

    const numSpirals = 5;
    for (let s = 0; s < numSpirals; s++) {
      ctx.beginPath();
      for (let i = 0; i < 200; i++) {
        const angle = i * 0.1 + time + s * Math.PI * 0.4;
        const radius = i * 2 + Math.sin(time * 2 + s) * 10;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Mandelbrot-like recursive patterns
    ctx.fillStyle = `rgba(147, 51, 234, ${0.1 + Math.sin(time) * 0.05})`;
    for (let i = 0; i < 50; i++) {
      const x = centerX + Math.sin(time + i * 0.1) * (100 + i * 5);
      const y = centerY + Math.cos(time * 1.3 + i * 0.1) * (100 + i * 5);
      const size = 5 + Math.sin(time * 2 + i) * 3;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
};
