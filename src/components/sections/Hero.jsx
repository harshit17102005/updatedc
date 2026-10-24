import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const capabilities = [
  {
    num: '01',
    category: 'WEB & APIS',
    badge: 'OWASP ASVS',
    title: 'Business Logic & API Exploitation',
    scope: 'Deep manual testing targeting auth bypasses, multi-tenant leaks & payment workflows.',
  },
  {
    num: '02',
    category: 'CLOUD ESTATE',
    badge: 'IAM HARDENING',
    title: 'Cloud & Infrastructure Boundary Audits',
    scope: 'Multi-cloud attack paths from initial foothold to full account takeover across AWS, GCP & Azure.',
  },
  {
    num: '03',
    category: 'MOBILE & BINARY',
    badge: 'MASVS L2',
    title: 'Mobile Application & Runtime Defense',
    scope: 'Binary decompilation, secure enclave analysis, and runtime manipulation on iOS & Android.',
  },
  {
    num: '04',
    category: 'ADVERSARY SIMULATION',
    badge: 'MITRE ATT&CK',
    title: 'Scenario-Based Red Team Engagements',
    scope: 'Covert multi-vector adversary operations evaluating detection thresholds and SOC response.',
  },
];

export const Hero = () => {
  return (
    <section className="relative pt-28 pb-14 border-b border-[var(--border-hairline)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column - Airy, High-Hierarchy Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Overline - Clean, No Gimmicky Slashes */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                Technical Security & Penetration Testing
              </span>
            </div>

            {/* Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-heading)] leading-[1.08] mb-5">
              Precision Security for Uncompromising Organizations.
            </h1>

            {/* Concise, Direct Body Copy (No dense wall of text) */}
            <p className="font-sans text-base sm:text-lg text-[var(--text-body)] leading-relaxed max-w-xl mb-8">
              Principal-led offensive assessments that uncover deep architectural flaws and logic vulnerabilities before adversaries exploit them.
            </p>

            {/* Hard Square Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="#contact" 
                className="brand-btn-primary flex items-center justify-center gap-3 !rounded-none !py-3 !px-7"
              >
                Request Scope Docket <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#services" 
                className="brand-btn-secondary flex items-center justify-center gap-2 !rounded-none !py-3 !px-7"
              >
                Our Capabilities
              </a>
            </div>

            {/* Tabular Architectural Stats Bar with Open Spacing */}
            <div className="grid grid-cols-3 border-t border-b border-[var(--border-hairline)] py-6 divide-x divide-[var(--border-hairline)]">
              <div className="pr-4 sm:pr-8">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">120+</div>
                <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  Audits Delivered
                </div>
              </div>
              <div className="px-4 sm:px-8">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">0.0%</div>
                <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  False Positives
                </div>
              </div>
              <div className="pl-4 sm:pl-8">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">100%</div>
                <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  GIAC Certified
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Modular Spaced Cards with Technical Discipline Badges */}
          <div className="lg:col-span-5">
            <div className="border border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 sm:p-6 rounded-none shadow-sm">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)] mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent-signal)] rounded-none" />
                  <h2 className="font-mono text-xs uppercase tracking-widest font-semibold text-[var(--text-heading)]">
                    Assessment Disciplines
                  </h2>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  Manual Verification
                </span>
              </div>

              {/* Spaced Modular Discipline Tiles */}
              <div className="space-y-2.5">
                {capabilities.map((item) => (
                  <div 
                    key={item.num} 
                    className="py-3 px-4 border border-[var(--border-hairline)] bg-[var(--bg-surface)]/50 hover:bg-[var(--bg-surface)] hover:border-[var(--text-heading)]/40 transition-all rounded-none group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--text-heading)]">
                          {item.num}
                        </span>
                        <span className="text-[var(--text-muted)] text-[10px]">/</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                          {item.category}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-heading)] font-medium">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[var(--text-heading)] mb-1 group-hover:text-[var(--accent-signal)] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="font-sans text-[11px] text-[var(--text-body)] leading-relaxed">
                      {item.scope}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Assurance Note */}
              <div className="pt-3 mt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono text-[var(--text-body)]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--accent-signal)] shrink-0" strokeWidth={2.5} />
                  <span>PoC & retest included</span>
                </div>
                <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                  0% Scanners
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
