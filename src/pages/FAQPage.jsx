import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/sections/FAQ';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const FAQPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-white">
      <Helmet>
        <title>Frequently Asked Questions | Defensive Cyber</title>
        <meta name="description" content="Find answers to common cybersecurity, penetration testing, and security compliance questions." />
      </Helmet>

      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-4 mb-4 max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none w-max cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
        <FAQ />
      </div>
    </main>
  );
};
