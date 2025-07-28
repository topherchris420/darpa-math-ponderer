import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';

const InsightBuilder = () => {
  const { insights, addInsight, removeInsight } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Opportunity');
  const [severity, setSeverity] = useState('Medium');

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleAddInsight = () => {
    if (title.trim() === '' || description.trim() === '') return;
    addInsight({ title, description, type, severity });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-amber-500/30">
      <h2 className="text-lg font-light text-white mb-4">Insight Builder</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-md font-light text-white mb-2">Add New Insight</h3>
          <div className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Insight Title"
              className="bg-slate-700 border-slate-600 text-white"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insight Description"
              className="bg-slate-700 border-slate-600 text-white"
            />
            <div className="flex space-x-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-600">
                  <SelectItem value="Opportunity">Opportunity</SelectItem>
                  <SelectItem value="Risk">Risk</SelectItem>
                  <SelectItem value="Strategy">Strategy</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-600">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddInsight} className="w-full bg-amber-600 hover:bg-amber-500">
              Add Insight
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-md font-light text-white mb-2">Generated Insights</h3>
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.map((insight, index) => (
                <Card key={index} className="bg-slate-700/50 border-slate-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span className="font-light">{insight.title}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getBadgeVariant(insight.severity)}>{insight.type}</Badge>
                        <Button variant="destructive" size="sm" onClick={() => removeInsight(index)}>X</Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 font-light">{insight.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-slate-400 text-sm">No insights generated yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightBuilder;
