import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockInsights = [
  {
    title: 'Vulnerability in Enemy Comms',
    description: 'A critical vulnerability has been identified in the adversary\'s communication network, which could be exploited to disrupt command and control.',
    type: 'Opportunity',
    severity: 'High',
  },
  {
    title: 'Logistical Bottleneck',
    description: 'Our primary supply route is vulnerable to disruption, posing a significant risk to sustained operations.',
    type: 'Risk',
    severity: 'Medium',
  },
  {
    title: 'Recommended Course of Action',
    description: 'Launch a targeted cyber-attack to exploit the identified vulnerability while simultaneously reinforcing our supply route defenses.',
    type: 'Strategy',
    severity: 'N/A',
  },
];

const InsightBuilder = () => {
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

  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-amber-500/30">
      <h2 className="text-lg font-light text-white mb-4">Insight Builder</h2>
      <div className="space-y-4">
        {mockInsights.map((insight, index) => (
          <Card key={index} className="bg-slate-700/50 border-slate-600 text-white">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="font-light">{insight.title}</span>
                <Badge variant={getBadgeVariant(insight.severity)}>{insight.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 font-light">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsightBuilder;
