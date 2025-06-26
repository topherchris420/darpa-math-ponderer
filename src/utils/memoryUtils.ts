
import { MemoryNode } from '../types/memoryTopology';

export const extractConcepts = (thought: string): string[] => {
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

export const calculateDistance = (node1: MemoryNode, node2: MemoryNode): number => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  const dz = node1.z - node2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const semanticSimilarity = (concept1: string, concept2: string): number => {
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

export const updateMemoryNodes = (
  currentNodes: MemoryNode[],
  latestThought: string,
  dimensions: { width: number; height: number }
): MemoryNode[] => {
  const concepts = extractConcepts(latestThought);
  const updated = [...currentNodes];
  
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
};
