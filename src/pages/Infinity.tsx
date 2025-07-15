
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Icon3D } from '../components/ui/icon-3d';
import Think from '../components/Think';

const Infinity = () => {
  return (
    <>
      <div className="absolute top-4 left-4 z-50">
        <Link 
          to="/" 
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-purple-500/20 rounded-lg text-purple-200 hover:text-white hover:border-purple-400/40 transition-all duration-200"
        >
          <Icon3D icon={ArrowLeft} variant="primary" size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      <Think />
    </>
  );
};

export default Infinity;
