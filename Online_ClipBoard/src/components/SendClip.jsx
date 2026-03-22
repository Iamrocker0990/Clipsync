import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Copy, Clipboard, CheckCircle2, ChevronRight, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, "");

const SendClip = () => {
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 300);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [content]);

  const handleSend = async () => {
    if (!content) {
      toast.error('Content cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/send`, { content });
      setCode(response.data.code);
      toast.success('Generated Link');
    } catch (error) {
      toast.error('Network Error - Check Backend');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied Code');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full max-w-full">
      <div className="w-full h-full forest-card rounded-[28px] p-6 lg:p-10 transition-forest flex flex-col bg-white border border-[#e5e7eb] overflow-hidden">
        {!code ? (
          <div className="flex flex-col gap-8 h-full">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-[#15803d] uppercase tracking-widest ml-1 lg:ml-2 font-bold">1. Paste Original Content</label>
              <textarea
                ref={textareaRef}
                placeholder="Paste exact content here..."
                autoFocus
                className="w-full bg-[#fdfbf7] border border-[#e5e7eb] focus:border-[#15803d]/40 focus:bg-white rounded-[20px] py-5 px-6 sm:py-6 sm:px-8 text-[#061a15] font-semibold text-lg leading-relaxed outline-none transition-forest placeholder:text-[#cbd5e1] min-h-[160px] sm:min-h-[220px] max-h-[300px] resize-none overflow-y-auto"
                style={{ whiteSpace: 'pre-wrap' }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={loading || !content}
              className={`flex items-center justify-center gap-3 px-8 py-4.5 sm:py-5 rounded-[20px] font-black transition-forest transform active:scale-[0.97] touch-none select-none ${
                loading || !content
                  ? 'bg-emerald-50 text-emerald-300 cursor-not-allowed opacity-60' 
                  : 'bg-[#15803d] hover:bg-[#166534] text-white shadow-xl shadow-emerald-700/20'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-lg font-black tracking-tight uppercase">Upload exact clip</span>
                  <Send className="w-5 h-5" strokeWidth={3} />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#15803d]/60 font-black uppercase tracking-widest mt-auto mb-2 font-bold">Exact spaces & characters preserved</p>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-12 py-6 h-full text-center overflow-hidden"
          >
            <div className="space-y-4 w-full px-4">
              <span className="text-[11px] font-black text-[#15803d] uppercase tracking-widest leading-loose flex items-center justify-center gap-1.5 underline underline-offset-8 decoration-emerald-100 font-bold">
                <Hash className="w-3.5 h-3.5" />
                Syncing code
              </span>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#15803d] px-2 transition-colors select-all leading-tight tracking-[0.02em] break-all">
                {code}
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full mt-auto">
              <button
                onClick={copyCode}
                className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-50 text-[#166534] rounded-[20px] transition-forest border-2 border-emerald-100 font-black text-lg active:scale-95 shadow-sm px-4"
              >
                {copied ? <CheckCircle2 className="w-6 h-6 animate-pulse" /> : <Clipboard className="w-6 h-6" />}
                <span className="font-bold uppercase tracking-wide">{copied ? 'Code Copied' : 'Copy and Sync'}</span>
              </button>
              <button
                onClick={() => { setCode(''); setContent(''); }}
                className="w-full py-4 text-[#15803d] hover:text-[#061a15] rounded-[20px] transition-forest font-black text-sm uppercase tracking-widest active:scale-95 flex items-center justify-center gap-1.5 underline underline-offset-4"
              >
                New Transfer <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SendClip;
