import React from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap } from 'lucide-react';
import SendClip from './components/SendClip';
import ReceiveClip from './components/ReceiveClip';

function App() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#061a15] flex flex-col items-center selection:bg-[#15803d]/20 antialiased overflow-x-hidden">
      {/* Background soft green radial */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime-100/20 rounded-full blur-[100px]" />
      </div>

      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#ffffffff',
            color: '#061a15',
            border: '2px solid #166534/10',
            borderRadius: '16px',
            fontSize: 'max(14px, 0.9rem)',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
          },
        }} 
      />

      <header className="relative z-10 w-full max-w-5xl px-6 py-10 flex items-center justify-between transition-forest">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#15803d] rounded-xl shadow-lg shadow-emerald-700/20">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#061a15]">
            ClipSync
          </h1>
        </div>
        
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#15803d] uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Nodes</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#15803d] uppercase tracking-[0.2em]">
            <Zap className="w-4 h-4" />
            <span>High Speed</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center mb-16 pt-4">
        <div className="max-w-2xl text-center mb-12 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-[#01261d] tracking-tight leading-[1.15] px-2">
              Sync Fragments <br />
              <span className="text-[#15803d] font-bold">Fast & Readable</span>
            </h2>
            <p className="text-[#3f6212]/70 text-lg md:text-xl font-medium max-w-md mx-auto mt-6">
              A private, high-contrast bridge for your texts and snippets. Instant, secure, and clearly visible.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 w-full max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SendClip />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ReceiveClip />
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 w-full max-w-5xl px-6 py-12 border-t border-[#15803d]/10 mt-auto text-center">
        <p className="text-[#15803d]/50 text-xs font-bold uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} CLIPSYNC | BUILT FOR CLARITY
        </p>
      </footer>
    </div>
  );
}

export default App;
