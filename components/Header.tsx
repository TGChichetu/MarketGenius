import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">MarketGenius AI</h1>
            <p className="text-xs text-slate-500 font-medium">Powered by Gemini 2.5</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <Zap className="h-4 w-4" />
            <span>Built with Gemini API</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;