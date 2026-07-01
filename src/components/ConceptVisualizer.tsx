import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface MathematicalConcept {
  id: string;
  domain: string;
  concept: string;
  confidence: number;
  connections: string[];
  proofHints: string[];
  visualizable: boolean;
}

interface ConceptVisualizerProps {
  concepts: MathematicalConcept[];
  activeDomain: string;
}

export const ConceptVisualizer: React.FC<ConceptVisualizerProps> = ({
  concepts,
  activeDomain
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.min(600, container.clientHeight || 450)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getDomainColors = useCallback((domain: string) => {
    switch (domain) {
      case 'topology':
        return {
          stroke: 'rgba(103, 232, 249, 0.3)', // cyan
          glow: 'rgba(103, 232, 249, 0.6)',
          core: 'rgba(34, 211, 238, 0.9)'
        };
      case 'number-theory':
        return {
          stroke: 'rgba(190, 242, 100, 0.3)', // lime
          glow: 'rgba(190, 242, 100, 0.6)',
          core: 'rgba(163, 230, 53, 0.9)'
        };
      case 'combinatorics':
        return {
          stroke: 'rgba(251, 191, 36, 0.3)', // amber
          glow: 'rgba(251, 191, 36, 0.6)',
          core: 'rgba(245, 158, 11, 0.9)'
        };
      case 'algebraic-geometry':
        return {
          stroke: 'rgba(244, 63, 94, 0.3)', // rose
          glow: 'rgba(244, 63, 94, 0.6)',
          core: 'rgba(225, 29, 72, 0.9)'
        };
      default:
        return {
          stroke: 'rgba(168, 85, 247, 0.3)', // purple fallback
          glow: 'rgba(168, 85, 247, 0.6)',
          core: 'rgba(147, 51, 234, 0.9)'
        };
    }
  }, []);

  const isPrimeSimple = useCallback((n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }, []);

  const drawDomainPatterns = useCallback((ctx: CanvasRenderingContext2D, domain: string, time: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const colors = getDomainColors(domain);
    
    ctx.strokeStyle = colors.stroke;
    ctx.lineWidth = 1;

    switch (domain) {
      case 'topology':
        // Draw topological shapes - torus and Klein bottle projections
        for (let i = 0; i < 3; i++) {
          const phase = time + i * Math.PI / 3;
          const r1 = 60 + i * 20;
          const r2 = 20 + i * 5;
          
          ctx.beginPath();
          for (let t = 0; t < Math.PI * 2; t += 0.1) {
            const x = centerX + (r1 + r2 * Math.cos(t)) * Math.cos(t + phase);
            const y = centerY + (r1 + r2 * Math.cos(t)) * Math.sin(t + phase);
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        break;

      case 'number-theory':
        // Draw prime spiral and number theory patterns
        ctx.beginPath();
        for (let n = 1; n < 200; n++) {
          const isPrime = isPrimeSimple(n);
          if (isPrime) {
            const angle = n * 0.1 + time;
            const radius = Math.sqrt(n) * 8;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            ctx.fillStyle = colors.core.replace('0.9', (0.2 + 0.3 * Math.sin(time + n * 0.05)).toFixed(2));
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'combinatorics': {
        // Draw graph structures and combinatorial patterns - deterministic (no flicker)
        const vertices = 8;
        const graphRadius = 100;
        for (let i = 0; i < vertices; i++) {
          for (let j = i + 1; j < vertices; j++) {
            // Pseudo-random deterministic hash based on vertex indices to prevent frame-by-frame flicker
            const val = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
            const hasEdge = (val - Math.floor(val)) < 0.35;
            
            if (hasEdge) {
              const angle1 = (i / vertices) * Math.PI * 2 + time * 0.05;
              const angle2 = (j / vertices) * Math.PI * 2 + time * 0.05;
              const x1 = centerX + graphRadius * Math.cos(angle1);
              const y1 = centerY + graphRadius * Math.sin(angle1);
              const x2 = centerX + graphRadius * Math.cos(angle2);
              const y2 = centerY + graphRadius * Math.sin(angle2);
              
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        }
        break;
      }

      case 'algebraic-geometry':
        // Draw algebraic curves and geometric patterns
        ctx.beginPath();
        for (let t = 0; t < Math.PI * 2; t += 0.02) {
          const r = 80 * (1 + 0.3 * Math.sin(3 * t + time));
          const x = centerX + r * Math.cos(t);
          const y = centerY + r * Math.sin(t);
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        break;
    }
  }, [getDomainColors, isPrimeSimple]);

  const drawConceptNetwork = useCallback((ctx: CanvasRenderingContext2D, activeConcepts: MathematicalConcept[], time: number) => {
    if (activeConcepts.length === 0) return;

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    const colors = getDomainColors(activeDomain);

    // Position concepts in a circle
    activeConcepts.forEach((concept, index) => {
      const angle = (index / activeConcepts.length) * Math.PI * 2 + time * 0.08;
      const x = centerX + Math.cos(angle) * radius * (0.6 + concept.confidence * 0.4);
      const y = centerY + Math.sin(angle) * radius * (0.6 + concept.confidence * 0.4);
      
      // Draw connections
      concept.connections.forEach(connectionId => {
        const connectedIndex = activeConcepts.findIndex(c => c.id === connectionId);
        if (connectedIndex !== -1) {
          const connectedAngle = (connectedIndex / activeConcepts.length) * Math.PI * 2 + time * 0.08;
          const connectedConcept = activeConcepts[connectedIndex];
          const connectedX = centerX + Math.cos(connectedAngle) * radius * (0.6 + connectedConcept.confidence * 0.4);
          const connectedY = centerY + Math.sin(connectedAngle) * radius * (0.6 + connectedConcept.confidence * 0.4);
          
          ctx.strokeStyle = colors.stroke;
          ctx.lineWidth = 1 + concept.confidence * 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(connectedX, connectedY);
          ctx.stroke();
        }
      });

      // Draw concept node
      const nodeSize = 6 + concept.confidence * 10 + Math.sin(time * 2 + index) * 1.5;
      
      // Node glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize * 2.5);
      glowGradient.addColorStop(0, colors.glow.replace('0.6', (concept.confidence * 0.5).toFixed(2)));
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, nodeSize * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Node core
      ctx.fillStyle = colors.core;
      ctx.beginPath();
      ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      // Concept label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      const words = concept.concept.split(' ').slice(0, 2);
      ctx.fillText(words.join(' '), x, y - nodeSize - 8);
    });

    // Draw domain-specific mathematical patterns
    drawDomainPatterns(ctx, activeDomain, time);
  }, [activeDomain, drawDomainPatterns, getDomainColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;
    const filteredConcepts = concepts.filter(c => c.domain === activeDomain && c.visualizable);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create dark mathematical background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(13, 21, 23, 0.85)'); // matches background HSL
      gradient.addColorStop(1, 'rgba(6, 10, 11, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw concept network
      drawConceptNetwork(ctx, filteredConcepts, time);
      
      time += 0.015;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [concepts, activeDomain, dimensions, drawConceptNetwork]);

  const activeConceptsCount = concepts.filter(c => c.domain === activeDomain && c.visualizable).length;

  return (
    <div className="bg-white/[0.03] rounded-lg p-5 border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm uppercase tracking-[0.16em] text-slate-500">Mathematical Manifold</h3>
          <p className="text-xs text-slate-400 mt-1">Real-time geometry projection</p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-200 uppercase tracking-widest">
          {activeDomain}
        </span>
      </div>
      <div className="relative flex-1 min-h-[300px] border border-white/5 rounded-md overflow-hidden bg-black/40">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
        {activeConceptsCount === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <div className="text-slate-400 text-center px-4">
              <p className="font-light text-white">No visualizable manifolds yet</p>
              <p className="text-xs text-slate-500 mt-1">Generate a conjecture to begin mapping</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
