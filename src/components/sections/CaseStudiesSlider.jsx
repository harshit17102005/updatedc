import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchReviews, deleteReview, fetchClients, deleteClient } from '../../utils/blogStore';
import { ReviewFormModal } from '../admin/ReviewFormModal';
import { ClientFormModal } from '../admin/ClientFormModal';

const defaultCaseStudies = [
  {
    text: "This is the second time I've worked with Ankur. He is very professional, knowledgeable in cybersecurity and endpoint security tools, and always thorough with reproduction evidence.",
    companyAndPost: "Enterprise Security Client"
  },
  {
    text: "Ankur demonstrated deep offensive and defensive security knowledge. His ability to isolate architectural misconfigurations and articulate remediation steps directly helped our engineers resolve critical risks.",
    companyAndPost: "Cloud Security Specialist | Ex-Accenture | Ex-McAfee"
  },
  {
    text: "A consummate professional. Delivered clear technical proof-of-concepts, verifiable CVSS rankings, and comprehensive executive summaries that made board reporting effortless.",
    companyAndPost: "Governance, Risk and Compliance Lead | Kyndryl (Airtel Africa)"
  },
  {
    text: "Ankur's offensive security tradecraft and attention to business logic vulnerabilities are exceptional. He identified critical authorization bypasses that automated scanners completely missed.",
    companyAndPost: "Senior Security Intelligence Analyst | Capital One"
  }
];

const defaultClients = [
  { name: "TryHackMe", location: "London, UK" },
  { name: "CodeCentro", location: "United States" },
  { name: "ActiveBytes Innovation", location: "Dubai, UAE" },
  { name: "Empathy Technologies", location: "Global" }
];

export const CaseStudiesSlider = () => {
  const { isAuthenticated, token } = useAuth();
  
  const [caseStudies, setCaseStudies] = useState(defaultCaseStudies);
  const [clients, setClients] = useState(defaultClients);
  
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentClientIndex, setCurrentClientIndex] = useState(0);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  
  const [editingReview, setEditingReview] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  const loadData = async () => {
    try {
      const fetchedReviews = await fetchReviews();
      const fetchedClients = await fetchClients();
      if (fetchedReviews && fetchedReviews.length > 0) {
        setCaseStudies(fetchedReviews);
      }
      if (fetchedClients && fetchedClients.length > 0) {
        setClients(fetchedClients);
      }
    } catch (err) {
      console.error("Failed to load data, using defaults");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const nextReviewSlide = () => {
    setCurrentReviewIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };
  const prevReviewSlide = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const nextClientSlide = () => {
    setCurrentClientIndex((prev) => (prev >= clients.length - 1 ? 0 : prev + 1));
  };
  const prevClientSlide = () => {
    setCurrentClientIndex((prev) => (prev <= 0 ? clients.length - 1 : prev - 1));
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Delete this review?")) {
      await deleteReview(id, token);
      setCurrentReviewIndex(0);
      loadData();
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm("Delete this client?")) {
      await deleteClient(id, token);
      setCurrentClientIndex(0);
      loadData();
    }
  };

  const currentReview = caseStudies[currentReviewIndex];

  return (
    <section id="cases" className="py-14 sm:py-16 border-b border-[var(--border-hairline)] bg-[var(--bg-base)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[var(--border-hairline)]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--text-heading)] rounded-none" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                VERIFIED ENGAGEMENT FEEDBACK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--text-heading)] md:whitespace-nowrap">
              Auditor Attestation & Feedback.
            </h2>
          </div>
          {isAuthenticated && (
            <button 
              onClick={() => { setEditingReview(null); setIsReviewModalOpen(true); }}
              className="brand-btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2 mt-4 md:mt-0"
            >
              <Plus className="w-3.5 h-3.5" /> Add Review
            </button>
          )}
        </div>

        {/* Editorial Testimonial Dossier */}
        {caseStudies.length > 0 && (
          <div className="max-w-4xl mx-auto border border-[var(--border-hairline)] bg-[var(--bg-card)] p-8 sm:p-14 mb-10 sm:mb-12 relative">
            
            {/* Header / Counter */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border-hairline)] mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                TESTIMONIAL {String(currentReviewIndex + 1).padStart(2, '0')} // {String(caseStudies.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReviewSlide}
                  aria-label="Previous review"
                  className="p-2 border border-[var(--border-hairline)] hover:border-[var(--text-heading)] text-[var(--text-heading)] transition-colors rounded-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReviewSlide}
                  aria-label="Next review"
                  className="p-2 border border-[var(--border-hairline)] hover:border-[var(--text-heading)] text-[var(--text-heading)] transition-colors rounded-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Testimonial Quote in Playfair Display Serif */}
            <AnimatePresence mode="wait">
              {currentReview && (
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-serif text-xl sm:text-2xl text-[var(--text-heading)] leading-relaxed italic mb-8">
                    "{currentReview.text}"
                  </p>
                  
                  <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                      — {currentReview.companyAndPost}
                    </p>

                    {isAuthenticated && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditingReview(currentReview);
                            setIsReviewModalOpen(true);
                          }}
                          className="p-1.5 border border-[var(--border-hairline)] text-[var(--text-heading)] hover:bg-[var(--text-heading)] hover:text-[var(--bg-base)] transition-colors rounded-none"
                          title="Edit Review"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteReview(currentReview._id)}
                          className="p-1.5 border border-red-500/30 text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-none"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* Organizations & Clients Row */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-hairline)] mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
              ENGAGEMENT PARTNERS & CLIENT ORGANIZATIONS
            </span>
            {isAuthenticated && (
              <button 
                onClick={() => { setEditingClient(null); setIsClientModalOpen(true); }}
                className="brand-btn-primary !py-2 !px-4 text-[11px] flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Client
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, idx) => (
              <div 
                key={client._id || idx}
                className="border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 flex flex-col justify-between rounded-none group hover:border-[var(--text-heading)] transition-colors"
              >
                <h4 className="font-serif text-lg font-bold text-[var(--text-heading)] mb-2">
                  {client.name}
                </h4>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-hairline)]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    {client.location || 'Enterprise'}
                  </span>
                  {isAuthenticated && (
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => { setEditingClient(client); setIsClientModalOpen(true); }}
                        className="p-1 text-[var(--text-muted)] hover:text-[var(--text-heading)]"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client._id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ReviewFormModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        onSuccess={loadData}
        initialData={editingReview}
      />
      <ClientFormModal 
        isOpen={isClientModalOpen} 
        onClose={() => setIsClientModalOpen(false)} 
        onSuccess={loadData}
        initialData={editingClient}
      />
    </section>
  );
};
