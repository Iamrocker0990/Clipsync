import React, { useState } from 'react';
import axios from 'axios';
import { Download, Copy, CheckCircle2, Trash2, ShieldCheck, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, "");

const ReceiveClip = () => {
  const [code, setCode] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReceive = async () => {
    if (code.length < 4) {
      toast.error('Code too short');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/receive/${code}`);
      setContent(response.data.content);
      toast.success('Retrieved Clips');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Content Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setContent('');
    setCode('');
  };

  return (
    <div className="w-full h-full max-w-full">
      <div className="w-full h-full forest-card rounded-[28px] p-6 lg:p-10 transition-forest flex flex-col bg-white border border-[#e5e7eb] overflow-hidden">
        {!content ? (
          <div className="flex flex-col gap-10 h-full">
            <div className="flex flex-col gap-3 items-center w-full">
              <label className="text-[11px] font-black text-[#15803d] uppercase tracking-widest ml-1 text-center font-bold">2. Enter Sync Code</label>
              <div className="w-full relative px-2">
                <input
                  type="text"
                  placeholder="XXXXXX"
                  maxLength={6}
                  className="w-full bg-[#fdfbf7] border border-[#e5e7eb] focus:border-[#15803d]/40 focus:bg-white rounded-[20px] py-8 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.1em] text-center text-[#15803d] outline-none transition-forest placeholder:text-[#e2e8f0] uppercase select-all sm:py-10"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#15803d] font-black uppercase tracking-widest mt-2 underline decoration-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Encryption Active
              </div>
            </div>

            <button
              onClick={handleReceive}
              disabled={loading || code.length < 4}
              className={`flex items-center justify-center gap-3 px-8 py-4.5 sm:py-5 rounded-[20px] font-black transition-forest transform active:scale-[0.97] text-xl ${
                loading || code.length < 4
                  ? 'bg-emerald-50 text-emerald-300 cursor-not-allowed opacity-60' 
                  : 'bg-[#15803d] hover:bg-[#166534] text-white shadow-xl shadow-emerald-700/20'
              }`}
            >
              {loading ? (
                <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-xl font-black tracking-tight uppercase">Receive content</span>
                  <Download className="w-5 h-5" strokeWidth={3} />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#15803d]/60 font-black uppercase tracking-widest mt-auto mb-2">Sync through global nodes</p>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col gap-8 h-full overflow-hidden"
          >
            <div className="flex justify-between items-center sm:flex-row flex-col gap-4 w-full">
              <div className="flex items-center gap-2 text-[11px] text-[#15803d] font-black uppercase tracking-widest sm:ml-2">
                <Key className="w-3.5 h-3.5" />
                <span>Verified | {code}</span>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button 
                  onClick={copyContent} 
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-black transition-forest text-sm border-2 shadow-sm ${copied ? 'bg-emerald-100 text-[#166534] border-emerald-200' : 'bg-white hover:bg-[#fdfbf7] text-[#15803d] border-[#15803d]/20 hover:border-[#15803d] shadow-sm'}`}
                  title="Copy and Close"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-[#15803d]" /> : <Copy className="w-5 h-5 text-[#15803d]" />}
                  <span className="text-[14px] font-black uppercase">{copied ? 'Copied' : 'Copy and Close'}</span>
                </button>
                <button 
                  onClick={clear} 
                  className="p-3.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-forest border border-red-100 shadow-sm flex items-center justify-center"
                  title="Discard"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="bg-[#fdfbf7] border border-[#e5e7eb] rounded-[24px] p-6 lg:p-8 min-h-[180px] max-h-[350px] overflow-y-auto overflow-x-hidden selection:bg-[#15803d]/10 text-[#061a15] text-lg sm:text-l font-semibold leading-relaxed shadow-inner">
              <pre className="whitespace-pre-wrap font-sans select-all">
                {content}
              </pre>
            </div>
            <div className="mt-auto pt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between px-2">
              <span className="text-[10px] text-[#15803d] font-black uppercase tracking-widest leading-loose">Verified Link Active</span>
              <button 
                onClick={clear}
                className="text-[10px] font-black text-[#15803d] hover:text-red-500 transition-colors uppercase tracking-widest underline underline-offset-4"
              >
                Clear Data
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReceiveClip;
