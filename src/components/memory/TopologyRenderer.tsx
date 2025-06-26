
import React from 'react';
import { MemoryNode } from '../../types/memoryTopology';

interface TopologyRendererProps {
  ctx: CanvasRenderingContext2D;
  memoryNodes: MemoryNode[];
  entropy: number;
  temporalDrift: number;
  time: number;
}

export const drawTopology = (
  ctx: CanvasRenderingContext2D,
  memoryNodes: MemoryNode[],
  entropy: number,
  temporalDrift: number,
  time: number
) => {
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
    drawTopologyFolds(ctx, entropy, time);
  }
};

export const drawTopologyFolds = (
  ctx: CanvasRenderingContext2D,
  entropy: number,
  time: number
) => {
  const canvas = ctx.canvas;
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
