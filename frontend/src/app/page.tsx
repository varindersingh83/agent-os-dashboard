import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4 text-center">
      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-2xl">
        <span className="text-4xl font-bold">OS</span>
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        Agent OS
      </h1>
      <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
        The Intelligent Organization Operating System. Manage your Council and Armies of agents from a single hub.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/auth/signin" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all"
        >
          Enter Council Room
        </Link>
        <Link 
          href="/dashboard" 
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition-all text-slate-300"
        >
          View Dashboard
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl text-left">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="font-bold mb-2">Passive Learning</h3>
          <p className="text-sm text-slate-400">Agents ingest Slack/Gmail data into long-term Qdrant memory.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="font-bold mb-2">Council Model</h3>
          <p className="text-sm text-slate-400">4 Core personas (Hacker, Builder, Growth) running autonomous missions.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="font-bold mb-2">Actionable Preview</h3>
          <p className="text-sm text-slate-400">Real-time thought streams and artifact generation view.</p>
        </div>
      </div>
    </div>
  );
}
