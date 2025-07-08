
import React, { useRef, useEffect, useState } from 'react';
import { ConsciousnessState } from '../../types/consciousness';

interface ConceptNode {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  connections: string[];
  strength: number;
  category: 'topology' | 'algebra' | 'analysis' | 'logic' | 'geometry';
  lastActivated: number;
}

interface MathematicalConceptNetworkProps {
  consciousness: ConsciousnessState;
  influences?: Record<string, number>;
  className?: string;
}

export const MathematicalConceptNetwork: React.FC<MathematicalConceptNetworkProps> = ({
  consciousness,
  influences = {},
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<ConceptNode[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Initialize mathematical concept nodes
    const conceptNodes: ConceptNode[] = [
      // Topology
      { id: 'continuity', name: 'Continuity', x: 200, y: 150, vx: 0, vy: 0, mass: 1.2, connections: ['boundary', 'limit'], strength: 0, category: 'topology', lastActivated: 0 },
      { id: 'boundary', name: 'Boundary', x: 300, y: 100, vx: 0, vy: 0, mass: 1.5, connections: ['continuity', 'closure'], strength: 0, category: 'topology', lastActivated: 0 },
      { id: 'closure', name: 'Closure', x: 400, y: 150, vx: 0, vy: 0, mass: 1.1, connections: ['boundary', 'limit'], strength: 0, category: 'topology', lastActivated: 0 },
      
      // Analysis
      { id: 'limit', name: 'Limit', x: 150, y: 250, vx: 0, vy: 0, mass: 1.8, connections: ['continuity', 'infinity'], strength: 0, category: 'analysis', lastActivated: 0 },
      { id: 'infinity', name: 'Infinity', x: 350, y: 300, vx: 0, vy: 0, mass: 2.0, connections: ['limit', 'cardinality'], strength: 0, category: 'analysis', lastActivated: 0 },
      { id: 'convergence', name: 'Convergence', x: 250, y: 350, vx: 0, vy: 0, mass: 1.3, connections: ['limit', 'sequence'], strength: 0, category: 'analysis', lastActivated: 0 },
      
      // Algebra
      { id: 'structure', name: 'Structure', x: 100, y: 100, vx: 0, vy: 0, mass: 1.6, connections: ['symmetry', 'group'], strength: 0, category: 'algebra', lastActivated: 0 },
      { id: 'symmetry', name: 'Symmetry', x: 50, y: 200, vx: 0, vy: 0, mass: 1.4, connections: ['structure', 'invariant'], strength: 0, category: 'algebra', lastActivated: 0 },
      { id: 'group', name: 'Group', x: 150, y: 50, vx: 0, vy: 0, mass: 1.3, connections: ['structure', 'operation'], strength: 0, category: 'algebra', lastActivated: 0 },
      
      // Logic
      { id: 'paradox', name: 'Paradox', x: 450, y: 250, vx: 0, vy: 0, mass: 1.7, connections: ['contradiction', 'russell'], strength: 0, category: 'logic', lastActivated: 0 },
      { id: 'contradiction', name: 'Contradiction', x: 500, y: 150, vx: 0, vy: 0, mass: 1.2, connections: ['paradox', 'consistency'], strength: 0, category: 'logic', lastActivated: 0 },
      { id: 'consistency', name: 'Consistency', x: 450, y: 50, vx: 0, vy: 0, mass: 1.1, connections: ['contradiction', 'axiom'], strength: 0, category: 'logic', lastActivated: 0 },
      
      // Geometry
      { id: 'dimension', name: 'Dimension', x: 50, y: 350, vx: 0, vy: 0, mass: 1.4, connections: ['space', 'manifold'], strength: 0, category: 'geometry', lastActivated: 0 },
      { id: 'space', name: 'Space', x: 150, y: 400, vx: 0, vy: 0, mass: 1.6, connections: ['dimension', 'metric'], strength: 0, category: 'geometry', lastActivated: 0 },
      { id: 'curvature', name: 'Curvature', x: 300, y: 450, vx: 0, vy: 0, mass: 1.3, connections: ['space', 'manifold'], strength: 0, category: 'geometry', lastActivated: 0 }
    ];

    setNodes(conceptNodes);
  }, []);

  useEffect(() => {
    // Update node strengths based on thought content and influences
    setNodes(prevNodes => 
      prevNodes.map(node => {
        let newStrength = node.strength * 0.95; // Natural decay
        
        // Check if current thought mentions this concept
        const currentThought = consciousness.thoughtStream[consciousness.thoughtStream.length - 1] || '';
        if (currentThought.toLowerCase().includes(node.name.toLowerCase()) || 
            currentThought.toLowerCase().includes(node.id)) {
          newStrength = Math.min(newStrength + 0.3, 1.0);
          node.lastActivated = Date.now();
        }

        // Apply user influences
        if (influences[node.id]) {
          newStrength = Math.min(newStrength + Math.abs(influences[node.id]) * 0.2, 1.0);
        }

        // Entropy affects connection strength
        const entropyEffect = consciousness.entropy * 0.02;
        newStrength += (Math.random() - 0.5) * entropyEffect;

        return { ...node, strength: Math.max(0, Math.min(1, newStrength)) };
      })
    );
  }, [consciousness.thoughtStream, consciousness.entropy, influences]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Physics simulation
      const updatedNodes = [...nodes];
      
      // Apply forces between connected nodes
      updatedNodes.forEach(node => {
        let fx = 0, fy = 0;
        
        // Connection forces
        node.connections.forEach(connId => {
          const connectedNode = updatedNodes.find(n => n.id === connId);
          if (connectedNode) {
            const dx = connectedNode.x - node.x;
            const dy = connectedNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const idealDistance = 80 + (node.strength + connectedNode.strength) * 30;
            
            if (distance > 0) {
              const force = (distance - idealDistance) * 0.01;
              fx += (dx / distance) * force;
              fy += (dy / distance) * force;
            }
          }
        });

        // Repulsion from other nodes
        updatedNodes.forEach(otherNode => {
          if (otherNode.id !== node.id) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0 && distance < 120) {
              const repulsion = 500 / (distance * distance);
              fx += (dx / distance) * repulsion;
              fy += (dy / distance) * repulsion;
            }
          }
        });

        // Boundary forces
        const margin = 50;
        if (node.x < margin) fx += (margin - node.x) * 0.02;
        if (node.x > rect.width - margin) fx -= (node.x - (rect.width - margin)) * 0.02;
        if (node.y < margin) fy += (margin - node.y) * 0.02;
        if (node.y > rect.height - margin) fy -= (node.y - (rect.height - margin)) * 0.02;

        // Apply forces
        node.vx = (node.vx + fx) * 0.9; // Damping
        node.vy = (node.vy + fy) * 0.9;
        
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.lineWidth = 1;
      
      nodes.forEach(node => {
        node.connections.forEach(connId => {
          const connectedNode = nodes.find(n => n.id === connId);
          if (connectedNode) {
            const strength = (node.strength + connectedNode.strength) / 2;
            const opacity = 0.2 + strength * 0.6;
            const width = 1 + strength * 3;
            
            ctx.globalAlpha = opacity;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const radius = 8 + node.strength * 12;
        const opacity = 0.4 + node.strength * 0.6;
        
        // Category colors
        const colors = {
          topology: '#8b5cf6',
          algebra: '#06b6d4',
          analysis: '#f59e0b',
          logic: '#ef4444',
          geometry: '#10b981'
        };
        
        const color = colors[node.category];
        
        // Node glow
        if (node.strength > 0.3) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
          gradient.addColorStop(0, `${color}40`);
          gradient.addColorStop(1, `${color}00`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Node body
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Node border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Node label
        if (node.strength > 0.2) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `${10 + node.strength * 4}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(node.name, node.x, node.y - radius - 8);
        }
      });

      ctx.globalAlpha = 1;

      // Draw legend
      const categories = ['topology', 'algebra', 'analysis', 'logic', 'geometry'];
      const colors = {
        topology: '#8b5cf6',
        algebra: '#06b6d4', 
        analysis: '#f59e0b',
        logic: '#ef4444',
        geometry: '#10b981'
      };

      categories.forEach((category, index) => {
        const x = 20;
        const y = 20 + index * 25;
        
        ctx.fillStyle = colors[category as keyof typeof colors];
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(category.charAt(0).toUpperCase() + category.slice(1), x + 15, y + 4);
      });

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-slate-900/50"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="absolute top-2 right-2 text-xs text-purple-300 bg-slate-900/70 px-2 py-1 rounded">
        Mathematical Concept Network
      </div>
    </div>
  );
};
