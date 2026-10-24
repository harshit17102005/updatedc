import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-36 pb-24 relative min-h-screen bg-transparent text-white">
      <Helmet>
        <title>About Us | Defensive Cyber - Cybersecurity Experts</title>
        <meta name="description" content="Learn about Defensive Cyber, a team of cybersecurity experts dedicated to protecting your organization from advanced threats and vulnerabilities." />
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none w-max cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-purple-500/25 bg-purple-500/10 mb-4">
              <span className="text-xs font-mono font-medium tracking-widest text-purple-300 uppercase">
                ORGANIZATIONAL PROFILE
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-space tracking-tight text-white">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-200">DEFENSIVE CYBER</span>
            </h1>
          </div>

          <div className="space-y-8 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
            
            <section className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 md:p-10 rounded-none border border-purple-500/15 shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold font-space text-white mb-6">
                Cybersecurity: Defending What Matters Most
              </h2>
              <div className="space-y-4">
                <p>
                  In today's digital world, a single cyber incident can disrupt operations, damage reputations, and compromise years of hard work. At <strong className="text-white">Defensive Cyber</strong>, we help organizations stay prepared, resilient, and secure against an ever-changing threat landscape through comprehensive <strong className="text-white">penetration testing</strong>, <strong className="text-white">vulnerability assessments</strong>, and advanced <strong className="text-white">cyber defense strategies</strong>.
                </p>
                <p>
                  Built on years of hands-on experience in enterprise cybersecurity, our approach combines technical expertise with practical, business-focused solutions. We don't believe in one-size-fits-all security. Every organization faces unique challenges, whether it's achieving regulatory <strong className="text-white">compliance</strong>, securing cloud infrastructure, or requiring <strong className="text-white">managed security services (MSSP)</strong>. We work closely with our clients to understand their environment, identify potential risks, and implement strategies that truly make a difference.
                </p>
                <p>
                  Whether it's responding to a security incident, uncovering the source of an attack, analyzing sophisticated malware, or providing actionable cyber threat intelligence, our goal is simple—to help businesses operate with confidence in a secure digital environment.
                </p>
              </div>
            </section>

            <section className="py-6">
              <h2 className="text-xl md:text-2xl font-bold font-space text-white mb-8 text-center">
                Our Core Technical Domains
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 rounded-none border border-purple-500/15 shadow-xl hover:border-purple-400/40 hover:bg-[#14112E] transition-all">
                  <h3 className="text-base font-bold font-space text-purple-300 mb-3">
                    Digital Forensics
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">
                    When security incidents occur, understanding <strong className="text-white">what happened, how it happened, and what to do next</strong> is critical. Our digital forensics services help organizations investigate cyber incidents, preserve digital evidence, identify root causes, and support informed decision-making during recovery.
                  </p>
                </div>

                <div className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 rounded-none border border-purple-500/15 shadow-xl hover:border-purple-400/40 hover:bg-[#14112E] transition-all">
                  <h3 className="text-base font-bold font-space text-purple-300 mb-3">
                    Cyber Threat Intelligence
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">
                    Cyber threats evolve every day. We continuously analyze emerging attack techniques, threat actors, and security trends to provide organizations with meaningful intelligence that helps them strengthen their defenses before attacks become incidents.
                  </p>
                </div>

                <div className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 rounded-none border border-purple-500/15 shadow-xl hover:border-purple-400/40 hover:bg-[#14112E] transition-all">
                  <h3 className="text-base font-bold font-space text-purple-300 mb-3">
                    Incident Response
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">
                    A rapid response can significantly reduce the impact of a cyberattack. We help organizations contain, investigate, and recover from security incidents through a structured and efficient response process, minimizing downtime and protecting critical business operations.
                  </p>
                </div>

                <div className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 rounded-none border border-purple-500/15 shadow-xl hover:border-purple-400/40 hover:bg-[#14112E] transition-all">
                  <h3 className="text-base font-bold font-space text-purple-300 mb-3">
                    Reverse Engineering & Malware Analysis
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">
                    Understanding malicious software is essential to building stronger defenses. Through detailed malware analysis and reverse engineering, we uncover how threats operate, identify indicators of compromise, and help organizations improve their detection and response capabilities.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 md:p-10 rounded-none border border-purple-500/15 shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold font-space text-white mb-6">
                Why Organizations Choose Defensive Cyber
              </h2>
              <div className="space-y-4">
                <p>
                  Our work is driven by expertise, precision, and a commitment to protecting what matters most. We focus on delivering practical cybersecurity solutions that help organizations strengthen resilience, reduce risk, and stay ahead of evolving threats.
                </p>
                <p>
                  We value long-term partnerships built on trust, transparency, and technical excellence. Every engagement is approached with professionalism, attention to detail, and a clear understanding that cybersecurity is not just about technology—it's about enabling businesses to operate securely and confidently.
                </p>
              </div>
            </section>

            <section className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 md:p-10 rounded-none border border-purple-500/15 shadow-xl mt-12 text-center">
              <h2 className="text-xl md:text-2xl font-bold font-space text-white mb-4">
                Let's Build a More Secure Future
              </h2>
              <p className="mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Whether you're strengthening your security posture, responding to an incident, or looking for expert guidance in today's complex cyber landscape, <strong className="text-white">Defensive Cyber</strong> is here to support you.
              </p>
              <div className="font-mono text-sm uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30 inline-block px-6 py-3 rounded-none">
                Contact our specialized cybersecurity team today to fortify your digital infrastructure.
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </main>
  );
};
