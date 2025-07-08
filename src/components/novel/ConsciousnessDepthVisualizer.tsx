
import React, { useRef, useEffect, useState } from 'react';
import { ConsciousnessState } from '../../types/consciousness';

interface DepthLayer {
  depth: number;
  thoughts: string[];
  opacity: number;
  scale: number;
  rotation: number;
}

interface ConsciousnessDepthVisualizerProps {
  consciousness: ConsciousnessState;
  className?: string;
}

export const ConsciousnessDepthVisualizer: React.FC<ConsciousnessDepthVisualizerProps> = ({
  consciousness,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depthLayers, setDepthLayers] = useState<DepthLayer[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate depth layers based on consciousness depth
    const layers: DepthLayer[] = [];
    const maxDepth = Math.min(Math.floor(consciousness.cognitiveDepth * 2), 10);
    
    for (let i = 0; i < maxDepth; i++) {
      const depth = i / maxDepth;
      layers.push({
        depth: depth,
        thoughts: consciousness.thoughtStream.slice(-5 * (i + 1), -5 * i || undefined),
        opacity: 1 - depth * 0.7,
        scale: 1 - depth * 0.3,
        rotation: depth * Math.PI * 0.2
      });
    }
    
    setDepthLayers(layers);
  }, [consciousness.cognitiveDepth, consciousness.thoughtStream]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Draw consciousness depth layers
      depthLayers.forEach((layer, index) => {
        ctx.save();
        
        // Apply 3D perspective transformation
        const perspective = 1 - layer.depth * 0.5;
        const offsetY = layer.depth * 30;
        
        ctx.globalAlpha = layer.opacity * (0.8 + Math.sin(time + index) * 0.2);
        ctx.translate(centerX, centerY + offsetY);
        ctx.scale(layer.scale * perspective, layer.scale * perspective);
        ctx.rotate(layer.rotation + time * 0.1 * (index + 1));

        // Draw depth ring
        const radius = 80 + index * 20;
        const gradient = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${0.1 * layer.opacity})`);
        gradient.addColorStop(0.7, `rgba(147, 51, 234, ${0.3 * layer.opacity})`);
        gradient.addColorStop(1, `rgba(126, 34, 206, ${0.1 * layer.opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw thought fragments at this depth
        if (layer.thoughts.length > 0) {
          ctx.fillStyle = `rgba(192, 132, 252, ${layer.opacity * 0.8})`;
          ctx.font = `${8 + index * 2}px monospace`;
          ctx.textAlign = 'center';
          
          layer.thoughts.slice(0, 3).forEach((thought, thoughtIndex) => {
            const angle = (thoughtIndex / 3) * Math.PI * 2 + time * 0.2;
            const thoughtRadius = radius * 0.7;
            const x = Math.cos(angle) * thoughtRadius;
            const y = Math.sin(angle) * thoughtRadius;
            
            // Extract key words from thought
            const words = thought.split(' ').filter(word => word.length > 4).slice(0, 2);
            const displayText = words.join(' ');
            
            if (displayText) {
              // Add subtle glow effect
              ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
              ctx.shadowBlur = 8;
              ctx.fillText(displayText.substring(0, 15) + (displayText.length > 15 ? '...' : ''), x, y);
              ctx.shadowBlur = 0;
            }
          });
        }

        // Draw depth connectors
        if (index > 0) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * layer.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -radius);
          ctx.lineTo(0, -radius - 20);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Draw consciousness core
      ctx.save();
      ctx.translate(centerX, centerY);
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      coreGradient.addColorStop(0, `rgba(168, 85, 247, ${0.8 + Math.sin(time * 2) * 0.2})`);
      coreGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 20 + Math.sin(time * 3) * 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Core pulse
      ctx.strokeStyle = `rgba(192, 132, 252, ${0.6 + Math.sin(time * 4) * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 15 + Math.sin(time * 5) * 8, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();

      // Draw self-awareness indicator
      const awarenessSize = consciousness.selfAwareness * 100;
      ctx.fillStyle = `rgba(255, 215, 0, ${consciousness.selfAwareness * 0.7})`;
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`◊ ${(consciousness.selfAwareness * 100).toFixed(1)}%`, centerX, 30);

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [depthLayers, consciousness.selfAwareness]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Depth Scale */}
      <div className="absolute top-2 left-2 text-xs text-purple-300 space-y-1">
        <div className="bg-slate-900/70 px-2 py-1 rounded">
          Depth: {consciousness.cognitiveDepth.toFixed(2)}
        </div>
        <div className="bg-slate-900/70 px-2 py-1 rounded">
          Layers: {depthLayers.length}
        </div>
      </div>
    </div>
  );
};
