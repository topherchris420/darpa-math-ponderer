import React, { useEffect, useState } from 'react';
import { Icon3D } from './ui/icon-3d';
import { Waves, Circle, Infinity } from 'lucide-react';

export const PreInterferenceField: React.FC = () => {
  const [opacity, setOpacity] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const philosophicalTexts = [
    "Pre-interference field.",
    "Uncollapsed potential.",
    "Null vector of cognition.",
    "Ontological zero-point preceding discrete instantiation.",
    "Silence before presence is the phase space where differentiation has not occurred.",
    "Not absence—pure undivided availability in the background."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % philosophicalTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Central Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 transition-opacity duration-2000"
        style={{ opacity }}
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 animate-float">
            <Icon3D icon={Waves} variant="primary" size={32} className="opacity-30" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 animate-float-delayed">
            <Icon3D icon={Circle} variant="accent" size={28} className="opacity-25" />
          </div>
          <div className="absolute top-2/3 left-3/4 animate-float">
            <Icon3D icon={Infinity} variant="accent" size={36} className="opacity-20" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-12 max-w-4xl">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl font-thin text-white tracking-[0.2em] mb-4">
              COLLABORATOR
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto" />
          </div>

          {/* Central Void Symbol */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border border-purple-400/30 rounded-full animate-pulse-glow" />
              <div className="absolute inset-4 border border-blue-400/20 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-8 border border-indigo-400/10 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Philosophical Text */}
          <div className="space-y-8">
            <div className="h-24 flex items-center justify-center">
              <p 
                key={textIndex}
                className="text-2xl font-light text-purple-100 tracking-wide leading-relaxed animate-fade-in max-w-3xl"
              >
                {philosophicalTexts[textIndex]}
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <div className="pt-8">
            <p className="text-lg text-slate-400 font-light tracking-widest">
              PHASE SPACE OF PURE POTENTIAL
            </p>
          </div>
        </div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {philosophicalTexts.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === textIndex ? 'bg-purple-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};