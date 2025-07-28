import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

interface AppState {
  selectedDomain: string | null;
  scenarios: any[]; // Replace 'any' with a proper type later
  insights: any[]; // Replace 'any' with a proper type later
  conceptNodes: Node[];
  conceptEdges: Edge[];
}

interface AppContextType extends AppState {
  selectDomain: (domain: string) => void;
  addScenario: (scenario: any) => void;
  addInsight: (insight: any) => void;
  removeInsight: (index: number) => void;
  addConceptNode: (node: Omit<Node, 'id' | 'x' | 'y'>) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    selectedDomain: null,
    scenarios: [],
    insights: [],
    conceptNodes: [
      { id: 'root', label: 'Primary Objective', x: 400, y: 50 },
    ],
    conceptEdges: [],
  });

  const selectDomain = (domain: string) => {
    setState(prevState => ({ ...prevState, selectedDomain: domain }));
  };

  const addScenario = (scenario: any) => {
    setState(prevState => ({ ...prevState, scenarios: [...prevState.scenarios, scenario] }));
  };

  const addInsight = (insight: any) => {
    setState(prevState => ({ ...prevState, insights: [...prevState.insights, insight] }));
  };

  const removeInsight = (index: number) => {
    setState(prevState => ({
      ...prevState,
      insights: prevState.insights.filter((_, i) => i !== index),
    }));
  };

  const addConceptNode = (node: Omit<Node, 'id' | 'x' | 'y'>) => {
    setState(prevState => {
      const newNode: Node = {
        ...node,
        id: `node-${prevState.conceptNodes.length + 1}`,
        x: Math.random() * 800,
        y: Math.random() * 600,
      };
      const newEdge: Edge = {
        from: 'root', // default to connect to root
        to: newNode.id,
      };
      return {
        ...prevState,
        conceptNodes: [...prevState.conceptNodes, newNode],
        conceptEdges: [...prevState.conceptEdges, newEdge],
      };
    });
  };

  const updateNodePosition = (id: string, x: number, y: number) => {
    setState(prevState => ({
      ...prevState,
      conceptNodes: prevState.conceptNodes.map(node =>
        node.id === id ? { ...node, x, y } : node
      ),
    }));
  };

  return (
    <AppContext.Provider value={{ ...state, selectDomain, addScenario, addInsight, addConceptNode, updateNodePosition }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
