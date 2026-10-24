import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPost, updatePost } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';
import JoditEditor from 'jodit-react';

export const PostFormModal = ({ isOpen, onClose, initialData, type, onSuccess }) => {
  const { token } = useAuth();
  const isEditing = !!initialData;
  const editor = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    type: type || 'blog',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          excerpt: initialData.excerpt || '',
          content: initialData.content || '',
          type: initialData.type || type || 'blog'
        });
      } else {
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          type: type || 'blog',
        });
      }
      setError('');
    }
  }, [isOpen, initialData, type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const config = useMemo(() => {
    const apiBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').replace(/\/api$/, '');
    return {
      readonly: false, 
      placeholder: 'Write your full post content here...',
      uploader: {
        url: `${import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api'}/upload?baseUrl=${encodeURIComponent(apiBase)}`,
        format: 'json',
        method: 'POST',
        error: function(e) {
          console.log("Upload error", e);
        }
      },
      image: {
        editSrc: false,
        editTitle: true,
        editAlt: true,
        editLink: true,
        editSize: true,
        editBorderRadius: true,
        editMargins: true,
        editAlign: true,
        editClass: true,
        editStyle: true,
      },
      height: 400
    };
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fallback to editor value if state hasn't updated yet (due to missing onBlur)
    const currentContent = formData.content; 
    if (!formData.title || !currentContent) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const dataToSave = { ...formData, content: currentContent };
      if (isEditing) {
        await updatePost(initialData._id || initialData.id, dataToSave, token);
      } else {
        await createPost(dataToSave, token);
      }
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to save post: ' + err.message);
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
              {isEditing ? 'Edit Advisory / Post' : `Create New ${type === 'news' ? 'Advisory' : 'Research Post'}`}
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

            <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="hidden">
                <input type="hidden" name="type" value={formData.type} />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="Enter advisory / article title"
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Short Excerpt</label>
                <textarea 
                  name="excerpt" 
                  rows="2"
                  required
                  value={formData.excerpt} 
                  onChange={handleChange}
                  placeholder="Brief summary for the preview card"
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none text-sm font-sans"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Full Content</label>
                <div className="bg-[#070611] text-gray-200 rounded-none overflow-hidden border border-purple-500/20">
                  <JoditEditor
                    ref={editor}
                    value={formData.content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => handleEditorChange(newContent)}
                    onChange={newContent => handleEditorChange(newContent)} 
                  />
                </div>
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
              form="post-form"
              disabled={isSubmitting}
              className="cyber-button-solid !rounded-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
