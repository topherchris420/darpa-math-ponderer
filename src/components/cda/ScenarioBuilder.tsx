import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ScenarioBuilder = () => {
  const { toast } = useToast();
  const { scenarios, addScenario } = useAppContext();
  const [scenarioName, setScenarioName] = useState('');
  const [initialConditions, setInitialConditions] = useState('');
  const [objectives, setObjectives] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenarioName) {
      toast({
        title: "Error",
        description: "Scenario name is required.",
        variant: "destructive",
      });
      return;
    }
    const newScenario = { name: scenarioName, conditions: initialConditions, objectives };
    addScenario(newScenario);
    toast({
      title: "Scenario Saved",
      description: `Scenario "${scenarioName}" has been saved.`,
    });
    setScenarioName('');
    setInitialConditions('');
    setObjectives('');
  };

  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-blue-500/30">
      <h2 className="text-lg font-light text-white mb-4">Scenario Builder</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-md font-light text-white mb-2">Create New Scenario</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="scenarioName" className="block text-sm font-medium text-slate-300 mb-1">
                Scenario Name
              </label>
              <Input
                id="scenarioName"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="e.g., 'Operation Cyber Guardian'"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="initialConditions" className="block text-sm font-medium text-slate-300 mb-1">
                Initial Conditions
              </label>
              <Textarea
                id="initialConditions"
                value={initialConditions}
                onChange={(e) => setInitialConditions(e.target.value)}
                placeholder="Describe the starting state of the scenario..."
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="objectives" className="block text-sm font-medium text-slate-300 mb-1">
                Objectives
              </label>
              <Textarea
                id="objectives"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Define the primary and secondary goals..."
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
              Save Scenario
            </Button>
          </form>
        </div>
        <div>
          <h3 className="text-md font-light text-white mb-2">Saved Scenarios</h3>
          <div className="space-y-4">
            {scenarios.length > 0 ? (
              scenarios.map((scenario, index) => (
                <Card key={index} className="bg-slate-700/50 border-slate-600 text-white">
                  <CardHeader>
                    <CardTitle className="font-light">{scenario.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 font-light text-sm"><strong>Conditions:</strong> {scenario.conditions}</p>
                    <p className="text-slate-300 font-light text-sm"><strong>Objectives:</strong> {scenario.objectives}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-slate-400 text-sm">No scenarios saved yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
