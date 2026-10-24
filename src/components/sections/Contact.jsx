import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { submitContact } from '../../utils/blogStore';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const contactData = {
      name: form.name.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
    };

    setIsSubmitting(true);
    try {
      await submitContact(contactData);
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Failed to send inquiry: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-16 border-b border-[var(--border-hairline)] bg-[var(--bg-base)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="border border-[var(--border-hairline)] bg-[var(--bg-card)] p-8 sm:p-12 md:p-14 rounded-none">
            
            {/* Header */}
            <div className="pb-5 mb-6 border-b border-[var(--border-hairline)]">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-[var(--text-heading)] rounded-none" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                  ENGAGEMENT REQUEST & SCOPING
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--text-heading)] mb-4 md:whitespace-nowrap">
                Initiate a Security Assessment.
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--text-body)] leading-relaxed max-w-2xl">
                Engage our senior offensive security team under mutual non-disclosure. We review targets and respond with a tailored assessment scope and methodology docket within one business day.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                    Principal Contact
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full border border-[var(--border-hairline)] bg-[var(--bg-base)] rounded-none px-4 py-3 text-[var(--text-heading)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--text-heading)] transition-colors"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                    Corporate Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full border border-[var(--border-hairline)] bg-[var(--bg-base)] rounded-none px-4 py-3 text-[var(--text-heading)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--text-heading)] transition-colors"
                    placeholder="security@organization.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                    Assessment Discipline
                  </label>
                  <select 
                    aria-label="Select an assessment discipline" 
                    name="service" 
                    defaultValue="" 
                    required
                    className="w-full border border-[var(--border-hairline)] bg-[var(--bg-base)] rounded-none px-4 py-3 text-[var(--text-heading)] text-sm focus:outline-none focus:border-[var(--text-heading)] transition-colors"
                  >
                    <option value="" disabled hidden>Select discipline...</option>
                    <option value="penetration-testing">Web Application & API VAPT</option>
                    <option value="cloud-security">Cloud Infrastructure Audit</option>
                    <option value="digital-forensics">Digital Forensics & Evidence</option>
                    <option value="incident-response">Incident Containment & Response</option>
                    <option value="red-teaming">Adversary Emulation (Red Team)</option>
                    <option value="other">Bespoke Security Architecture</option>
                  </select>
                </div>

              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
                  Scope Overview & Target Environment
                </label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full border border-[var(--border-hairline)] bg-[var(--bg-base)] rounded-none px-4 py-3 text-[var(--text-heading)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--text-heading)] transition-colors resize-none"
                  placeholder="Outline your target domains, IP ranges, active compliance requirements (SOC 2, ISO 27001), or timeline constraints..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-hairline)]">
                <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                  ALL INQUIRIES STRICTLY CONFIDENTIAL // NDA PROTECTED
                </span>

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className="brand-btn-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 !rounded-none"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : submitted ? (
                    <>
                      <span>TRANSMITTED</span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT INQUIRY</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};
