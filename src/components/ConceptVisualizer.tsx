
import React, { useEffect, useRef, useState } from 'react';

interface MathematicalConcept {
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
          height: Math.min(600, container.clientHeight)
        });
      }
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
    const filteredConcepts = concepts.filter(c => c.domain === activeDomain && c.visualizable);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create dark mathematical background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw concept network
      drawConceptNetwork(ctx, filteredConcepts, time);
      
      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [concepts, activeDomain, dimensions]);

  const drawConceptNetwork = (ctx: CanvasRenderingContext2D, concepts: MathematicalConcept[], time: number) => {
    if (concepts.length === 0) return;

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    // Position concepts in a circle
    concepts.forEach((concept, index) => {
      const angle = (index / concepts.length) * Math.PI * 2 + time * 0.1;
      const x = centerX + Math.cos(angle) * radius * (0.6 + concept.confidence * 0.4);
      const y = centerY + Math.sin(angle) * radius * (0.6 + concept.confidence * 0.4);
      
      // Draw connections
      concept.connections.forEach(connectionId => {
        const connectedIndex = concepts.findIndex(c => c.id === connectionId);
        if (connectedIndex !== -1) {
          const connectedAngle = (connectedIndex / concepts.length) * Math.PI * 2 + time * 0.1;
          const connectedConcept = concepts[connectedIndex];
          const connectedX = centerX + Math.cos(connectedAngle) * radius * (0.6 + connectedConcept.confidence * 0.4);
          const connectedY = centerY + Math.sin(connectedAngle) * radius * (0.6 + connectedConcept.confidence * 0.4);
          
          ctx.strokeStyle = `rgba(147, 51, 234, ${concept.confidence * 0.3})`;
          ctx.lineWidth = 1 + concept.confidence;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(connectedX, connectedY);
          ctx.stroke();
        }
      });

      // Draw concept node
      const nodeSize = 8 + concept.confidence * 12 + Math.sin(time * 2 + index) * 2;
      
      // Node glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize * 2);
      glowGradient.addColorStop(0, `rgba(168, 85, 247, ${concept.confidence * 0.8})`);
      glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, nodeSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Node core
      ctx.fillStyle = `rgba(168, 85, 247, ${0.7 + concept.confidence * 0.3})`;
      ctx.beginPath();
      ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      // Concept label for high-confidence concepts
      if (concept.confidence > 0.7) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        const words = concept.concept.split(' ').slice(0, 2);
        ctx.fillText(words.join(' '), x, y - nodeSize - 10);
      }
    });

    // Draw domain-specific mathematical patterns
    drawDomainPatterns(ctx, activeDomain, time);
  };

  const drawDomainPatterns = (ctx: CanvasRenderingContext2D, domain: string, time: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
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
            ctx.fillStyle = `rgba(34, 197, 94, ${0.3 + 0.4 * Math.sin(time + n * 0.01)})`;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'combinatorics':
        // Draw graph structures and combinatorial patterns
        const vertices = 8;
        const graphRadius = 100;
        for (let i = 0; i < vertices; i++) {
          for (let j = i + 1; j < vertices; j++) {
            if (Math.random() < 0.3) {
              const angle1 = (i / vertices) * Math.PI * 2 + time * 0.1;
              const angle2 = (j / vertices) * Math.PI * 2 + time * 0.1;
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
  };

  const isPrimeSimple = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
      <h3 className="text-lg font-light text-white mb-4">Mathematical Concept Space</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full border border-slate-700/50 rounded"
          style={{ maxHeight: '600px' }}
        />
        {concepts.filter(c => c.domain === activeDomain && c.visualizable).length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-slate-400 text-center">
              <p>No visualizable concepts yet</p>
              <p className="text-sm">Activate the AI to begin discovery</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
