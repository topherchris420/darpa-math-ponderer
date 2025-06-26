
import { Link } from 'react-router-dom';
import { Brain, Infinity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-thin text-white tracking-widest">
            MATHEMATICS
          </h1>
          <p className="text-xl text-purple-200 font-light max-w-2xl mx-auto">
            An immersive environment for mathematical exploration and contemplation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Think Module */}
          <Link 
            to="/infinity" 
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/40 to-slate-800/40 backdrop-blur-sm border border-purple-500/20 p-8 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-purple-600/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Brain className="w-12 h-12 text-purple-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">THINK</h2>
              <p className="text-purple-200 text-sm leading-relaxed">
                Autonomous AI contemplation on the nature of finite and infinite universes. 
                No interaction required—pure contemplative exploration.
              </p>
              <div className="flex items-center justify-center space-x-2 text-purple-400 text-xs">
                <Infinity className="w-4 h-4" />
                <span>Continuous Contemplation</span>
              </div>
            </div>
          </Link>

          {/* Placeholder for future modules */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-800/40 to-purple-900/40 backdrop-blur-sm border border-slate-500/20 p-8 opacity-50">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-slate-600/20">
                  <div className="w-12 h-12 bg-slate-400/20 rounded" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">EXPLORE</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Interactive mathematical exploration tools. Coming soon...
              </p>
              <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs">
                <span>Module in Development</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-purple-400 text-sm max-w-xl mx-auto">
          <p>
            Enter a space where mathematics meets philosophy, where computation becomes contemplation, 
            and where the infinite reveals itself through autonomous thought.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
