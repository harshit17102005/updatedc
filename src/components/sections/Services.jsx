import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { fetchServices, deleteService, defaultServices } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';
import { ServiceFormModal } from '../admin/ServiceFormModal';
import { WhyUsStats } from './WhyUs';

const certifications = [
  {
    href: "https://www.credly.com/earner/earned/badge/f2de7353-342a-4e6f-88ea-c674116837f0",
    img: "/GIACCertificationForensicAnalyst.png",
    code: "GCFA // SANS FOR508",
    title: "Certified Forensic Analyst",
    desc: "Advanced threat hunting, enterprise memory analysis, forensic timeline reconstruction, and deep adversarial dwell-time identification."
  },
  {
    href: "https://www.credly.com/earner/earned/badge/1671a9b8-676e-4887-89e6-d35c73e747a8",
    img: "/GIACCertificationIncidentHandler.png",
    code: "GCIH // SANS SEC504",
    title: "Certified Incident Handler",
    desc: "Adversarial exploit analysis, memory exploitation triage, malware containment, and post-breach operational recovery."
  },
  {
    href: "https://www.credly.com/earner/earned/badge/75006c8b-08f2-4ef4-bc1c-74b1676c85f2",
    img: "/GIACCertificationThreatIntelligence.png",
    code: "GCTI // SANS SEC588",
    title: "Threat Intelligence Analyst",
    desc: "Strategic intelligence modeling, MITRE ATT&CK adversary mapping, zero-day threat correlation, and perimeter defense hardening."
  }
];

export const Services = () => {
  const { isAuthenticated, token } = useAuth();
  const [services, setServices] = useState(defaultServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const loadServices = async () => {
    const data = await fetchServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id, token);
        loadServices();
      } catch (err) {
        alert('Failed to delete service: ' + err.message);
      }
    }
  };

  return (
    <section id="services" className="pt-14 pb-14 border-b border-[var(--border-hairline)] bg-[var(--bg-base)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[var(--border-hairline)]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--text-heading)] rounded-none" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                PRACTICE AREAS & CAPABILITIES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--text-heading)] md:whitespace-nowrap">
              Core Technical Auditing Services.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={() => { setEditingService(null); setIsModalOpen(true); }}
                className="brand-btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2"
              >
                <Icons.Plus className="w-3.5 h-3.5" />
                Add Practice Area
              </button>
            )}
          </div>
        </div>

        {/* Architectural Services Directory (Clean Hairline Rows, No Bento Boxes) */}
        <div className="divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.Shield;
            const numberFormatted = String(index + 1).padStart(2, '0');

            return (
              <div 
                key={service._id || index}
                className="py-8 group transition-colors duration-200 hover:bg-[var(--bg-surface)] px-4 -mx-4"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Col 1: Number & Icon */}
                  <div className="lg:col-span-1 flex items-center gap-4">
                    <span className="font-mono text-sm font-semibold text-[var(--text-muted)]">
                      {numberFormatted}
                    </span>
                    <IconComponent className="w-5 h-5 text-[var(--text-heading)] opacity-80" strokeWidth={1.75} />
                  </div>

                  {/* Col 2: Title */}
                  <div className="lg:col-span-4">
                    <Link
                      to={`/service/${service.slug}`}
                      className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-heading)] hover:opacity-80 transition-opacity"
                    >
                      {service.title}
                    </Link>
                  </div>

                  {/* Col 3: Description */}
                  <div className="lg:col-span-5">
                    <p className="font-sans text-sm text-[var(--text-body)] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Col 4: Action & Admin */}
                  <div className="lg:col-span-2 flex items-center justify-end gap-3">
                    <Link
                      to={`/service/${service.slug}`}
                      className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-heading)] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore</span>
                      <Icons.ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {isAuthenticated && (
                      <div className="flex items-center gap-1 ml-4 border-l border-[var(--border-hairline)] pl-3">
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingService(service); setIsModalOpen(true); }}
                          className="p-1.5 border border-[var(--border-hairline)] hover:bg-[var(--text-heading)] hover:text-[var(--bg-base)] text-[var(--text-heading)] rounded-none transition-colors"
                          title="Edit Service"
                        >
                          <Icons.Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(service._id); }}
                          className="p-1.5 border border-red-500/30 text-red-600 hover:bg-red-600 hover:text-white rounded-none transition-colors"
                          title="Delete Service"
                        >
                          <Icons.Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Why Us / Credentials Registry */}
        <div id="why-us" className="mt-14 sm:mt-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[var(--border-hairline)]">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-[var(--text-heading)] rounded-none" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                  VERIFIED ACCREDITATIONS & METHODOLOGIES
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--text-heading)] md:whitespace-nowrap">
                Principal-Led SANS & GIAC Auditing.
              </h2>
            </div>
            <p className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] max-w-xs text-right">
              Every audit is performed directly by certified senior engineers, not outsourced scanners.
            </p>
          </div>

          {/* GIAC Credentials Gallery (Museum Spacing, Real Verification Links) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <a 
                key={idx}
                href={cert.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-[var(--border-hairline)] bg-[var(--bg-card)] p-8 sm:p-10 rounded-none flex flex-col justify-between hover:border-[var(--text-heading)] transition-colors group"
                aria-label={`Verify GIAC Certification ${cert.title}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                      {cert.code}
                    </span>
                    <Icons.ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-heading)] transition-colors" />
                  </div>

                  <div className="flex justify-center mb-8">
                    <img 
                      src={cert.img} 
                      alt={`GIAC Certification ${cert.title}`} 
                      className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[var(--text-heading)] mb-3">
                    {cert.title}
                  </h3>

                  <p className="font-sans text-xs text-[var(--text-body)] leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] font-mono text-[11px] uppercase tracking-widest text-[var(--text-heading)] font-semibold flex items-center justify-between">
                  <span>Verify Credly Issuer</span>
                  <span className="text-[var(--text-muted)]">SANS GIAC</span>
                </div>
              </a>
            ))}
          </div>

          {/* Stats Bar */}
          <WhyUsStats />
        </div>

      </div>

      <ServiceFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadServices}
        initialData={editingService}
      />
    </section>
  );
};
