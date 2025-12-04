import React, { useState } from 'react';
import Header from './components/Header';
import GeneratorForm from './components/GeneratorForm';
import ResultDisplay from './components/ResultDisplay';
import { generateMarketingContent } from './services/geminiService';
import { FormData, GenerationResult } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  const handleGenerate = async (data: FormData) => {
    setIsLoading(true);
    setResult(null); // Clear previous result to show loading state clearly or keep it? Clearing feels snappier for new generation.

    try {
      const content = await generateMarketingContent(data);
      setResult({
        content,
        type: data.contentType,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Generation failed", error);
      // In a real app, we'd use a toast notification here
      alert("Something went wrong while generating content. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // This could just clear the result, or we could pass a reset signal to the form
    // For now, let's just clear the result view so the empty state returns
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold mb-2">Create Faster.</h2>
              <p className="text-indigo-100 text-sm mb-0">
                Generate tailored marketing copy for your brand in seconds using advanced AI.
              </p>
            </div>
            
            <GeneratorForm 
              isLoading={isLoading} 
              onSubmit={handleGenerate} 
            />
          </div>

          {/* Right Column: Output Display */}
          <div className="lg:col-span-7 xl:col-span-8 min-h-[500px]">
            <ResultDisplay 
              result={result} 
              onReset={handleReset}
            />
          </div>
          
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} MarketGenius AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;