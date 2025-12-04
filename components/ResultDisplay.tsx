import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Share2, RefreshCw } from 'lucide-react';
import { GenerationResult } from '../types';

interface ResultDisplayProps {
  result: GenerationResult | null;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl h-full flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <Share2 className="h-8 w-8 text-indigo-200" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Create?</h3>
        <p className="text-slate-500 max-w-sm">
          Fill out the form on the left to generate professional marketing copy in seconds.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-semibold text-slate-700">{result.type} Generated</span>
          <span className="text-xs text-slate-400 ml-2">
            {result.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="flex gap-2">
            {/* Action buttons could go here */}
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-grow max-h-[600px] prose prose-indigo prose-sm sm:prose-base max-w-none">
        <ReactMarkdown>{result.content}</ReactMarkdown>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          New
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;