import { Link } from 'react-router-dom';
import { Brain, Users, Compass, Shield, Zap } from 'lucide-react';
import { Icon3D } from '../components/ui/icon-3d';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-8 p-8 max-w-7xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-5xl font-thin tracking-widest">
            COGNITIVE DOMINANCE ADJUTANT
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-3xl mx-auto">
            An advanced decision support tool for analysis, insight generation, and concept visualization in DoD-relevant domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Domain Selection */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-800/60 backdrop-blur-sm border border-cyan-500/20 p-6 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-cyan-600/20 group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <Icon3D icon={Compass} variant="glow" size={48} className="text-cyan-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">Domain Selection</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Select a DoD-relevant domain to tailor the analytical focus and generate domain-specific insights.
              </p>
            </div>
          </div>

          {/* AI Collaborator */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-800/60 backdrop-blur-sm border border-teal-500/20 p-6 hover:border-teal-400/40 transition-all duration-300 hover:scale-105">
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-teal-600/20 group-hover:bg-teal-500/30 transition-colors duration-300">
                  <Icon3D icon={Users} variant="floating" size={48} className="text-teal-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">AI Collaborator</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Partner with an AI to generate novel strategies, identify risks, and uncover hidden opportunities.
              </p>
            </div>
          </div>

          {/* Scenario Builder */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-800/60 backdrop-blur-sm border border-blue-500/20 p-6 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-blue-600/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Icon3D icon={Shield} variant="pulse" size={48} className="text-blue-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">Scenario Builder</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Define initial conditions and operational variables to construct and analyze complex scenarios.
              </p>
            </div>
          </div>

          {/* Concept Visualizer */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-800/60 backdrop-blur-sm border border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 lg:col-span-2">
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-purple-600/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Icon3D icon={Brain} variant="glow" size={48} className="text-purple-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">Concept Visualizer</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Create dynamic "mind maps" to visualize the relationships between concepts, strategies, and risks.
              </p>
            </div>
          </div>

          {/* Insight Builder */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-800/60 backdrop-blur-sm border border-amber-500/20 p-6 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-amber-600/20 group-hover:bg-amber-500/30 transition-colors duration-300">
                  <Icon3D icon={Zap} variant="rotate" size={48} className="text-amber-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">Insight Builder</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Organize and display AI-generated insights, strategies, and risks for comprehensive analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="text-slate-500 text-sm max-w-2xl mx-auto">
          <p>
            Empowering strategic decision-making through human-machine collaboration and advanced data visualization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
