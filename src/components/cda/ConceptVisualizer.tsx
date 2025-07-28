import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ConceptVisualizer = () => {
  const { conceptNodes, conceptEdges, addConceptNode, updateNodePosition } = useAppContext();
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleAddNode = () => {
    if (newNodeLabel.trim() === '') return;
    addConceptNode({ label: newNodeLabel });
    setNewNodeLabel('');
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setDraggingNode(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNode || !svgRef.current) return;
    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    const { x, y } = svgPoint.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    updateNodePosition(draggingNode, x, y);
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('mousemove', handleMouseMove as any);
      svg.addEventListener('mouseup', handleMouseUp);
      return () => {
        svg.removeEventListener('mousemove', handleMouseMove as any);
        svg.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingNode]);

  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-purple-500/30">
      <h2 className="text-lg font-light text-white mb-4">Concept Visualizer</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.target.value)}
          placeholder="New concept..."
          className="bg-slate-700 border-slate-600 text-white"
        />
        <Button onClick={handleAddNode} className="bg-purple-600 hover:bg-purple-500">
          Add Node
        </Button>
      </div>
      <svg ref={svgRef} width="100%" height="600" className="bg-slate-800/50 rounded-lg cursor-grab active:cursor-grabbing">
        {conceptEdges.map((edge, i) => {
          const fromNode = conceptNodes.find(node => node.id === edge.from);
          const toNode = conceptNodes.find(node => node.id === edge.to);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#4A5568"
              strokeWidth="2"
            />
          );
        })}
        {conceptNodes.map(node => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
            className="cursor-pointer"
          >
            <circle cx="0" cy="0" r="10" fill="#8B5CF6" />
            <text
              x="15"
              y="5"
              fill="#E2E8F0"
              fontSize="14"
              className="font-light select-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ConceptVisualizer;
