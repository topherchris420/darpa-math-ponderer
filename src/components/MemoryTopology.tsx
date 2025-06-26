
import React, { useEffect, useRef } from 'react';
import { TopologyProps } from '../types/memoryTopology';
import { useMemoryTopology } from '../hooks/useMemoryTopology';
import { useDimensions } from '../hooks/useDimensions';
import { drawTopology } from './memory/TopologyRenderer';

export const MemoryTopology: React.FC<TopologyProps> = ({ 
  thoughts, 
  entropy, 
  temporalDrift 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dimensions = useDimensions();
  const { memoryNodes } = useMemoryTopology(thoughts, dimensions);

  // Animate the topology
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
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(30, 0, 50, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw memory nodes and connections
      drawTopology(ctx, memoryNodes, entropy, temporalDrift, time);
      
      time += 0.01 / (1 + temporalDrift * 0.1); // Slow down with temporal drift
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [memoryNodes, entropy, temporalDrift, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
};
