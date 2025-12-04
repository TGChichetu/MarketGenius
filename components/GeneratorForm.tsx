import React, { useState } from 'react';
import { ContentType, Platform, Tone, FormData } from '../types';
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Megaphone, 
  Mail, 
  FileText, 
  ShoppingBag, 
  Type,
  Loader2,
  Wand2,
  Sparkles
} from 'lucide-react';

interface GeneratorFormProps {
  isLoading: boolean;
  onSubmit: (data: FormData) => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ isLoading, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    contentType: ContentType.SOCIAL_POST,
    platform: Platform.INSTAGRAM,
    topic: '',
    audience: '',
    tone: Tone.PROFESSIONAL,
    details: '',
  });

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.INSTAGRAM: return <Instagram className="h-4 w-4" />;
      case Platform.LINKEDIN: return <Linkedin className="h-4 w-4" />;
      case Platform.FACEBOOK: return <Facebook className="h-4 w-4" />;
      case Platform.TWITTER: return <Twitter className="h-4 w-4" />;
      default: return <Megaphone className="h-4 w-4" />;
    }
  };

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case ContentType.SOCIAL_POST: return <Instagram className="h-5 w-5" />;
      case ContentType.EMAIL_COPY: return <Mail className="h-5 w-5" />;
      case ContentType.BLOG_POST: return <FileText className="h-5 w-5" />;
      case ContentType.AD_COPY: return <Megaphone className="h-5 w-5" />;
      case ContentType.PRODUCT_DESC: return <ShoppingBag className="h-5 w-5" />;
      case ContentType.TAGLINE: return <Type className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-indigo-600" />
          Content Parameters
        </h2>
        <p className="text-sm text-slate-500 mt-1">Define what you want the AI to create for you.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Content Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">What are you creating?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.values(ContentType).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('contentType', type)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                  formData.contentType === type
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className={`mb-2 ${formData.contentType === type ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {getContentTypeIcon(type)}
                </div>
                <span className="text-xs font-medium">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Platform Selection (Only for Social/Ads) */}
        {(formData.contentType === ContentType.SOCIAL_POST || formData.contentType === ContentType.AD_COPY) && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <label className="block text-sm font-medium text-slate-700">Platform</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(Platform).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleChange('platform', p)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    formData.platform === p
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {getPlatformIcon(p)}
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Core Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">Topic / Product Name</label>
            <input
              id="topic"
              type="text"
              required
              placeholder="e.g., Summer Coffee Blend, New SaaS Feature..."
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <input
                id="audience"
                type="text"
                placeholder="e.g., Busy Moms, Tech Founders..."
                value={formData.audience}
                onChange={(e) => handleChange('audience', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">Tone of Voice</label>
              <select
                id="tone"
                value={formData.tone}
                onChange={(e) => handleChange('tone', e.target.value as Tone)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
              >
                {Object.values(Tone).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-slate-700 mb-1">Key Details / Key Points</label>
            <textarea
              id="details"
              rows={4}
              placeholder="List specific features, benefits, dates, or keywords you want included..."
              value={formData.details}
              onChange={(e) => handleChange('details', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.topic}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-white transition-all shadow-md hover:shadow-lg ${
            isLoading || !formData.topic
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Magic...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Content
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneratorForm;