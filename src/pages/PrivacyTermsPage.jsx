import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const PrivacyTermsPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the services provided by Defensive Cyber Consulting Services (\"Defensive Cyber\", \"we\", \"us\", or \"our\"), you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree, you must not use our website or services."
    },
    {
      title: "2. Privacy & Data Protection",
      content: "We take your privacy seriously. Any data collected through contact forms or client onboarding (such as your name, corporate email, and requested services) is used strictly for legitimate business communications, scoping, and security assessments. We do not sell, rent, or lease your private information to third parties. All client-related technical data is handled with strict non-disclosure obligations."
    },
    {
      title: "3. Scope of Cybersecurity Services",
      content: "Defensive Cyber provides offensive security assessments, vulnerability assessments, and penetration testing (VAPT) exclusively upon explicit written authorization. Penetration testing activities are performed within the boundaries of agreed-upon Rules of Engagement (RoE). Any unauthorized testing outside agreed parameters is strictly prohibited."
    },
    {
      title: "4. Confidentiality & Non-Disclosure",
      content: "All vulnerability findings, source code audits, network diagrams, and assessment reports generated during engagements are treated as strictly confidential. Defensive Cyber implements military-grade encryption and secure access controls to ensure the confidentiality and integrity of all client findings."
    },
    {
      title: "5. Limitation of Liability",
      content: "While Defensive Cyber employs rigorous methodologies aligned with OWASP, NIST, and PTES standards, cybersecurity is an evolving domain. We do not guarantee that our assessments will identify every conceivable vulnerability. Defensive Cyber shall not be liable for any indirect, incidental, or consequential damages resulting from unauthorized third-party actions."
    },
    {
      title: "6. Modifications to Terms",
      content: "Defensive Cyber reserves the right to revise these Terms and Conditions at any time. Continued use of our website or services following any updates signifies your agreement to the modified terms."
    }
  ];

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-white">
      <Helmet>
        <title>Privacy Policy & Terms | Defensive Cyber</title>
        <meta name="description" content="Read the Privacy Policy and Terms & Conditions for Defensive Cyber Consulting Services." />
      </Helmet>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="mb-10">
          <a 
            href="/"
            className="group inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none w-max cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
        </div>

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-purple-500/25 bg-purple-500/10 mb-4">
            <span className="text-xs font-mono font-medium tracking-widest text-purple-300 uppercase">
              LEGAL & GOVERNANCE
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold font-space text-white uppercase tracking-tight"
          >
            PRIVACY & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-200">TERMS</span>
          </motion.h1>
          <p className="text-gray-300 font-sans text-sm md:text-base mt-3 max-w-xl mx-auto">
            Governing rules of engagement, confidentiality obligations, and data handling policies.
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className={`bg-[#0E0C1F]/90 backdrop-blur-md border border-purple-500/15 rounded-none overflow-hidden transition-colors ${openSection === idx ? 'border-purple-400/50 bg-[#14112E]' : 'hover:border-purple-500/30'}`}
            >
              <button 
                onClick={() => setOpenSection(openSection === idx ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none cursor-pointer"
              >
                <span className={`font-space font-semibold text-base sm:text-lg transition-colors ${openSection === idx ? 'text-purple-300' : 'text-white'}`}>
                  {section.title}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 text-purple-400 shrink-0 ml-4 ${openSection === idx ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {openSection === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-300 font-sans text-sm sm:text-base leading-relaxed border-t border-purple-500/10">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
