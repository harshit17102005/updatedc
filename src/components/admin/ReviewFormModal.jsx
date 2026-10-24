import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createReview, updateReview } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';

export const ReviewFormModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const { token } = useAuth();
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    text: '',
    companyAndPost: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          text: initialData.text || '',
          companyAndPost: initialData.companyAndPost || ''
        });
      } else {
        setFormData({ text: '', companyAndPost: '' });
      }
      setError('');
    }
  }, [isOpen, initialData]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      if (isEditing && initialData._id) {
        await updateReview(initialData._id, formData, token);
      } else {
        await createReview(formData, token);
      }
      setIsSubmitting(false);
      setFormData({ text: '', companyAndPost: '' });
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to save review: ' + err.message);
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
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#0E0C1F] border border-purple-500/25 rounded-none w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b border-purple-500/15">
            <h2 className="text-xl font-bold font-space text-white">
              {isEditing ? 'Edit Client Review' : 'Add Client Review'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-none hover:bg-white/10 z-50 relative"
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

            <form id="review-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Review Text</label>
                <textarea 
                  name="text" 
                  rows="4"
                  required
                  value={formData.text} 
                  onChange={handleChange}
                  placeholder="Enter the client's review..."
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none text-sm font-sans"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Company & Post (Optional)</label>
                <input 
                  type="text" 
                  name="companyAndPost" 
                  value={formData.companyAndPost} 
                  onChange={handleChange}
                  placeholder="e.g., CTO at TechCorp"
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors text-sm font-sans"
                />
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-purple-500/15 flex justify-end gap-3 bg-[#070611]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-none border border-purple-500/20 font-mono text-xs uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="review-form"
              disabled={isSubmitting}
              className="cyber-button-solid !rounded-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Review' : 'Add Review')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
