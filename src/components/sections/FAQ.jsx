import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchFaqs, deleteFaq } from '../../utils/faqStore';
import { FaqFormModal } from '../ui/FaqFormModal';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const { isAuthenticated, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const loadFaqs = async () => {
    const data = await fetchFaqs();
    setFaqs(data);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFaq(id, token);
        loadFaqs();
      } catch (err) {
        console.error('Failed to delete FAQ', err);
      }
    }
  };

  return (
    <section id="faq" className="py-14 sm:py-16 border-b border-[var(--border-hairline)] bg-[var(--bg-base)]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Section Header */}
        <div className="pb-5 mb-8 border-b border-[var(--border-hairline)]">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[var(--text-heading)] rounded-none" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
              METHODOLOGY CLARIFICATIONS & FAQ
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--text-heading)] mb-4 md:whitespace-nowrap">
            Security Engagement Inquiries.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--text-body)] leading-relaxed max-w-2xl">
            Practical clarity regarding our scoping procedures, testing rules of engagement, and formal remediation sign-off protocols.
          </p>

          {isAuthenticated && (
            <div className="mt-6">
              <button 
                onClick={() => { setEditingFaq(null); setIsModalOpen(true); }}
                className="brand-btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Question
              </button>
            </div>
          )}
        </div>

        {/* Clean Accordion Items */}
        <div className="divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-6 transition-colors duration-200"
            >
              <button
                className="w-full text-left flex justify-between items-start gap-4 focus:outline-none cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-serif text-lg sm:text-xl font-bold text-[var(--text-heading)] group-hover:opacity-80 transition-opacity">
                  {faq.question}
                </span>

                <div className="flex items-center gap-3 shrink-0 pt-1">
                  {isAuthenticated && (
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleEdit(faq)} 
                        className="p-1.5 border border-[var(--border-hairline)] text-[var(--text-heading)] rounded-none"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(faq._id || faq.id)} 
                        className="p-1.5 border border-red-500/30 text-red-600 rounded-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <ChevronDown 
                    className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pr-12 text-[var(--text-body)] font-sans text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>

      <FaqFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadFaqs} 
        initialData={editingFaq}
      />
    </section>
  );
};
