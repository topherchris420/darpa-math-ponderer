import { Link } from 'react-router-dom';
import { Brain, Infinity, Users, ExternalLink } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-thin text-white tracking-widest">
            MATHEMATICS
          </h1>
          <p className="text-xl text-purple-200 font-light max-w-2xl mx-auto">
            An immersive environment for mathematical exploration and AI-powered discovery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                Pure contemplative exploration without interaction.
              </p>
              <div className="flex items-center justify-center space-x-2 text-purple-400 text-xs">
                <Infinity className="w-4 h-4" />
                <span>Autonomous Contemplation</span>
              </div>
            </div>
          </Link>

          {/* Collaborator Module */}
          <Link 
            to="/collaborator" 
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/40 to-slate-800/40 backdrop-blur-sm border border-blue-500/20 p-8 hover:border-blue-400/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-blue-600/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Users className="w-12 h-12 text-blue-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">COLLABORATE</h2>
              <p className="text-blue-200 text-sm leading-relaxed">
                AI-powered mathematical discovery through human-machine collaboration. 
                Explore novel structures, theorems, and conjectures.
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-400 text-xs">
                <Brain className="w-4 h-4" />
                <span>Human-AI Synergy</span>
              </div>
            </div>
          </Link>

          {/* Explore Module - now links to external website */}
          <a 
            href="https://vers3dynamics.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-900/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/20 p-8 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-emerald-600/20 group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <ExternalLink className="w-12 h-12 text-emerald-300" />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">EXPLORE</h2>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Advanced mathematical exploration tools and dynamic systems visualization. 
                Discover new frontiers in mathematical modeling.
              </p>
              <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs">
                <ExternalLink className="w-4 h-4" />
                <span>External Platform</span>
              </div>
            </div>
          </a>
        </div>

        <div className="text-purple-400 text-sm max-w-xl mx-auto">
          <p>
            Enter a space where mathematics meets AI, where computation becomes collaboration, 
            and where new mathematical frontiers emerge through human-machine synergy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
