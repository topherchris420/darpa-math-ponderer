
import { Link } from 'react-router-dom';
import { Brain, Infinity, Users, ExternalLink } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin text-white tracking-widest">
            MATHEMATICS
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 font-light max-w-2xl mx-auto px-4">
            An immersive environment for mathematical exploration and AI-powered discovery
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-2">
          {/* Think Module */}
          <Link 
            to="/infinity" 
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/40 to-slate-800/40 backdrop-blur-sm border border-purple-500/20 p-6 sm:p-8 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-3 sm:p-4 rounded-full bg-purple-600/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-light text-white">THINK</h2>
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
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/40 to-slate-800/40 backdrop-blur-sm border border-blue-500/20 p-6 sm:p-8 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-3 sm:p-4 rounded-full bg-blue-600/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-light text-white">COLLABORATE</h2>
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

          {/* Explore Module */}
          <a 
            href="https://vers3dynamics.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-900/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/20 p-6 sm:p-8 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation sm:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-3 sm:p-4 rounded-full bg-emerald-600/20 group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <ExternalLink className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-300" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-light text-white">EXPLORE</h2>
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

        <div className="text-purple-400 text-sm max-w-xl mx-auto px-4">
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
