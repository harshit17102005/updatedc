import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addFaq, updateFaq } from '../../utils/faqStore';
import { useAuth } from '../../contexts/AuthContext';

export const FaqFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const { token } = useAuth();
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          question: initialData.question || '',
          answer: initialData.answer || '',
        });
      } else {
        setFormData({
          question: '',
          answer: '',
        });
      }
      setError('');
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      if (isEditing) {
        await updateFaq(initialData._id || initialData.id, formData, token);
      } else {
        await addFaq(formData, token);
      }
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to save FAQ: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#0E0C1F] border border-purple-500/25 rounded-none w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b border-purple-500/15">
            <h2 className="text-xl font-bold font-space text-white">
              {isEditing ? 'Edit FAQ' : 'Create New FAQ'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-none hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-none text-sm font-medium">
                {error}
              </div>
            )}

            <form id="faq-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Question</label>
                <input 
                  type="text" 
                  name="question" 
                  required
                  value={formData.question} 
                  onChange={handleChange}
                  placeholder="Enter the question"
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Answer</label>
                <textarea 
                  name="answer" 
                  rows="6"
                  required
                  value={formData.answer} 
                  onChange={handleChange}
                  placeholder="Provide the answer..."
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none text-sm font-sans"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-purple-500/15 flex justify-end gap-3 bg-[#070611]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="faq-form"
              disabled={isSubmitting}
              className="cyber-button-solid !rounded-none opacity-100 disabled:opacity-50 flex items-center justify-center min-w-[120px] text-xs font-mono uppercase tracking-wider font-bold"
            >
              <span className="relative z-10">{isSubmitting ? 'Saving...' : 'Save FAQ'}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
