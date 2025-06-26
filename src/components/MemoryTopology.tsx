import React, { useEffect, useRef, useState } from 'react';

interface MemoryNode {
  id: string;
  concept: string;
  x: number;
  y: number;
  z: number;
  weight: number;
  connections: string[];
  age: number;
  semanticDensity: number;
}

interface TopologyProps {
  thoughts: string[];
  entropy: number;
  temporalDrift: number;
}

export const MemoryTopology: React.FC<TopologyProps> = ({ 
  thoughts, 
  entropy, 
  temporalDrift 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [memoryNodes, setMemoryNodes] = useState<MemoryNode[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();

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

  // Update memory topology based on new thoughts
  useEffect(() => {
    if (thoughts.length === 0) return;

    const latestThought = thoughts[thoughts.length - 1];
    const concepts = extractConcepts(latestThought);

    setMemoryNodes(prev => {
      const updated = [...prev];
      
      concepts.forEach(concept => {
        const existingNode = updated.find(node => node.concept === concept);
        
        if (existingNode) {
          // Strengthen existing node
          existingNode.weight = Math.min(existingNode.weight + 0.1, 2.0);
          existingNode.semanticDensity += 0.05;
        } else {
          // Create new node
          const newNode: MemoryNode = {
            id: `${concept}-${Date.now()}`,
            concept,
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            z: Math.random() * 100,
            weight: 0.5,
            connections: [],
            age: 0,
            semanticDensity: 1.0
          };
          updated.push(newNode);
        }
      });

      // Age all nodes and create connections
      updated.forEach(node => {
        node.age += 1;
        node.weight = Math.max(0.1, node.weight - 0.001); // Gradual decay
        
        // Create semantic connections
        if (Math.random() < 0.1) {
          const nearbyNodes = updated.filter(other => 
            other.id !== node.id && 
            calculateDistance(node, other) < 200 &&
            semanticSimilarity(node.concept, other.concept) > 0.3
          );
          
          if (nearbyNodes.length > 0) {
            const target = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)];
            if (!node.connections.includes(target.id)) {
              node.connections.push(target.id);
            }
          }
        }
      });

      // Remove nodes that are too old or weak
      return updated.filter(node => node.age < 1000 && node.weight > 0.05);
    });
  }, [thoughts, dimensions]);

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
      drawTopology(ctx, time);
      
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

  const extractConcepts = (thought: string): string[] => {
    const conceptPatterns = [
      /\b(boundary|infinite|structure|void|recursion|pattern|form|edge|limit|endless)\b/gi
    ];
    
    const concepts: string[] = [];
    conceptPatterns.forEach(pattern => {
      const matches = thought.match(pattern);
      if (matches) {
        concepts.push(...matches.map(m => m.toLowerCase()));
      }
    });
    
    return [...new Set(concepts)]; // Remove duplicates
  };

  const calculateDistance = (node1: MemoryNode, node2: MemoryNode): number => {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    const dz = node1.z - node2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  const semanticSimilarity = (concept1: string, concept2: string): number => {
    const semanticGroups = {
      spatial: ['boundary', 'edge', 'limit', 'structure', 'form'],
      infinite: ['infinite', 'endless', 'eternal', 'unbounded'],
      abstract: ['void', 'pattern', 'recursion', 'iteration']
    };

    for (const group of Object.values(semanticGroups)) {
      if (group.includes(concept1) && group.includes(concept2)) {
        return 0.8;
      }
    }
    return 0.2;
  };

  const drawTopology = (ctx: CanvasRenderingContext2D, time: number) => {
    // Draw connections first
    ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 + entropy * 0.02})`;
    ctx.lineWidth = 1;

    memoryNodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const connectedNode = memoryNodes.find(n => n.id === connectionId);
        if (connectedNode) {
          // Apply topology warping based on semantic density
          const warpX = Math.sin(time + node.semanticDensity) * 20;
          const warpY = Math.cos(time + node.semanticDensity) * 20;
          
          ctx.beginPath();
          ctx.moveTo(node.x + warpX, node.y + warpY);
          ctx.lineTo(connectedNode.x + warpX, connectedNode.y + warpY);
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    memoryNodes.forEach(node => {
      const nodeSize = 3 + node.weight * 8 + Math.sin(time + node.age * 0.01) * 2;
      const opacity = Math.max(0.2, node.weight);
      
      // Apply temporal drift effects
      const driftX = Math.sin(time * 0.1 + node.age * 0.001) * temporalDrift;
      const driftY = Math.cos(time * 0.1 + node.age * 0.001) * temporalDrift;
      
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`;
      ctx.beginPath();
      ctx.arc(node.x + driftX, node.y + driftY, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw concept labels for strong nodes
      if (node.weight > 1.0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.font = '10px monospace';
        ctx.fillText(node.concept, node.x + driftX + 15, node.y + driftY + 5);
      }
    });

    // Draw topology fold indicators
    if (entropy > 10) {
      drawTopologyFolds(ctx, time);
    }
  };

  const drawTopologyFolds = (ctx: CanvasRenderingContext2D, time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const foldCount = Math.floor(entropy / 5);
    
    for (let i = 0; i < foldCount; i++) {
      const centerX = (canvas.width / 2) + Math.sin(time + i) * 200;
      const centerY = (canvas.height / 2) + Math.cos(time + i) * 200;
      const radius = 50 + Math.sin(time * 2 + i) * 30;
      
      ctx.strokeStyle = `rgba(192, 132, 252, ${0.1 + Math.sin(time + i) * 0.1})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.setLineDash([]);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
};
