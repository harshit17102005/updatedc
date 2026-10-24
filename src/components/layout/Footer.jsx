import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchCompanyInfo } from '../../utils/blogStore';
import { CompanyInfoModal } from '../admin/CompanyInfoModal';

const socialLinks = [
  {
    name: "X / Twitter",
    href: "https://x.com",
    svg: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    svg: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
  }
];

export const Footer = () => {
  const { isAuthenticated } = useAuth();
  const [companyInfo, setCompanyInfo] = useState({ locations: [], phones: [], emails: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadInfo = async () => {
      const data = await fetchCompanyInfo();
      setCompanyInfo(data);
    };
    loadInfo();
  }, []);

  return (
    <footer className="border-t border-[var(--border-hairline)] bg-[var(--footer-bg)] pt-20 pb-12 transition-colors duration-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[var(--border-hairline)]">
          
          {/* Brand & Mandate */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/middle-logo-dark.png" alt="Defensive Cyber" className="h-7 w-auto opacity-90" />
              <span className="font-serif font-bold text-lg tracking-tight text-[var(--text-heading)]">
                DEFENSIVE CYBER
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--text-body)] leading-relaxed mb-6">
              Independent technical cybersecurity auditing, adversary emulation, and vulnerability assessment firm. Principal-led and standards-aligned.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name} 
                  className="w-8 h-8 border border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:border-[var(--text-heading)] flex items-center justify-center transition-colors rounded-none"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d={link.svg}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[var(--text-heading)] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
              {[
                { name: 'Audit Services', path: '/#services' },
                { name: 'Firm Credentials', path: '/#why-us' },
                { name: 'Engagements', path: '/#cases' },
                { name: 'Technical FAQ', path: '/faq' },
                { name: 'Legal Disclosures', path: '/legal' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Methodologies */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[var(--text-heading)] mb-6">
              Standards & Frameworks
            </h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              <li>OWASP ASVS v4.0.3</li>
              <li>NIST SP 800-115 (VAPT)</li>
              <li>PTES Execution Standard</li>
              <li>SANS / GIAC Verified Protocols</li>
            </ul>
          </div>

          {/* Headquarters & Scoping Desk */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif font-bold text-sm text-[var(--text-heading)]">
                Scoping Desk
              </h4>
              {isAuthenticated && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[11px] font-mono text-[var(--text-heading)] underline flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" /> Edit
                </button>
              )}
            </div>

            <ul className="space-y-3 font-mono text-xs text-[var(--text-body)]">
              {companyInfo.locations?.map((loc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  <span>{loc}</span>
                </li>
              ))}
              {companyInfo.phones?.map((phone, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>{phone}</span>
                </li>
              ))}
              {companyInfo.emails?.map((email, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>{email}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Defensive Cyber. All rights reserved. Zero telemetry trackers.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-[var(--text-heading)] transition-colors">Privacy Charter</Link>
            <Link to="/legal" className="hover:text-[var(--text-heading)] transition-colors">Engagement Terms</Link>
          </div>
        </div>

      </div>

      <CompanyInfoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyInfo={companyInfo}
        onSaveSuccess={(newInfo) => setCompanyInfo(newInfo)}
      />
    </footer>
  );
};
