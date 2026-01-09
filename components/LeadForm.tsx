import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { LeadPayload, LeadInterest } from '../types';
import { submitLead, validateLeadData } from '../services/api';

interface LeadFormProps {
  variant?: 'dark' | 'light' | 'minimal';
  title?: string;
  subtitle?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ variant = 'light', title = "Get a Free Consultation", subtitle = "Start your journey today." }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<LeadPayload>>({
    interest: 'Selling'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (error) setError(null);
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);

    // Validate form data
    const validation = validateLeadData(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      await submitLead({
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        interest: (formData.interest as LeadInterest) || 'Selling',
        address: formData.address,
        city: formData.city,
        timeframe: formData.timeframe,
        message: formData.message,
        leadSource: 'Seller Landing Page'
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-10 text-center rounded-2xl ${variant === 'dark' ? 'bg-[#0b0b0d] text-white border border-white/10' : 'bg-white text-slate-800 shadow-xl border border-slate-100'}`}>
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
        <h3 className="text-2xl font-serif font-bold mb-3">Request Received</h3>
        <p className="opacity-80 text-sm leading-relaxed mb-6">Thank you for reaching out. Sebastian will review your information and contact you shortly.</p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({ interest: 'Selling' });
          }}
          className="text-sm font-semibold underline decoration-2 underline-offset-4 opacity-60 hover:opacity-100 transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  const baseInputClass = "w-full px-4 py-3.5 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200";
  const themeClasses = variant === 'dark' 
    ? "bg-[#111111] border-white/15 text-white focus:ring-[#d4af37] focus:ring-offset-[#050505] placeholder-gray-500 hover:border-[#d4af37]/50" 
    : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-yellow-500 placeholder-slate-400 hover:bg-white hover:border-slate-300";

  const isSellingInterest = formData.interest === 'Selling' || formData.interest === 'Both';

  return (
    <div className={`p-8 lg:p-10 rounded-2xl ${variant === 'dark' ? 'bg-[#0b0b0d] text-white border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' : 'bg-white text-slate-800 shadow-2xl shadow-slate-200/50 border border-slate-100'}`}>
      <h3 className="text-2xl font-serif font-bold mb-3">{title}</h3>
      <p className={`mb-8 text-sm leading-relaxed ${variant === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
        {subtitle}
      </p>

      {/* Error Display */}
      {(error || validationErrors.length > 0) && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${variant === 'dark' ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            {validationErrors.length > 0 && (
              <ul className="text-red-500 text-sm space-y-1">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            placeholder="e.g. John Smith" 
            required
            className={`${baseInputClass} ${themeClasses}`}
            onChange={handleChange}
            value={formData.name || ''}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">Phone</label>
          <input 
              type="tel" 
              name="phone"
              placeholder="(555) 123-4567" 
            className={`${baseInputClass} ${themeClasses}`}
              onChange={handleChange}
              value={formData.phone || ''}
          />
        </div>
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">Email</label>
          <input 
              type="email" 
              name="email"
              placeholder="john@example.com" 
              required
            className={`${baseInputClass} ${themeClasses}`}
              onChange={handleChange}
              value={formData.email || ''}
          />
          </div>
        </div>

        <div>
           <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">I am interested in...</label>
           <select 
              name="interest"
              className={`${baseInputClass} ${themeClasses}`}
              value={formData.interest}
              onChange={handleChange}
           >
              <option value="Selling">Selling a Home</option>
              <option value="Buying">Buying a Home</option>
              <option value="Both">Both Selling & Buying</option>
              <option value="Just curious">Just Curious / Other</option>
           </select>
        </div>

        {isSellingInterest && (
          <div className={`p-5 rounded-xl border border-dashed ${variant === 'dark' ? 'border-white/20 bg-[#111111]/70' : 'border-slate-300 bg-slate-50/50'} space-y-4 animate-in fade-in slide-in-from-top-4 duration-500`}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">Property Address</label>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Street Address" 
                    required={isSellingInterest}
                    className={`${baseInputClass} ${themeClasses}`}
                    onChange={handleChange}
                    value={formData.address || ''}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="City" 
                    required={isSellingInterest}
                    className={`${baseInputClass} ${themeClasses}`}
                    onChange={handleChange}
                    value={formData.city || ''}
                  />
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5 ml-1">Ideal Timeframe</label>
                <select 
                    name="timeframe"
                    required={isSellingInterest}
                    className={`${baseInputClass} ${themeClasses}`}
                    onChange={handleChange}
                    value={formData.timeframe || ''}
                >
                    <option value="">Select timeframe...</option>
                    <option value="ASAP">ASAP (0-3 months)</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="Just researching">Just researching</option>
                </select>
             </div>
          </div>
        )}
        
        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${
            variant === 'dark' 
              ? 'bg-gradient-to-r from-[#d4af37] to-[#b88d2c] text-[#050505] hover:brightness-110 shadow-lg shadow-[#d4af37]/30' 
              : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20'
          }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Submit Inquiry <Send size={18} /></>}
        </button>
        
        <p className={`text-[10px] text-center mt-4 leading-normal ${variant === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
          By submitting, you agree to receive calls/texts from Sebastian Street. Message/data rates may apply. Your information is kept strictly confidential.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
