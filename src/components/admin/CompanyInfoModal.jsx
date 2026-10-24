import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { updateCompanyInfo } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';

export const CompanyInfoModal = ({ isOpen, onClose, companyInfo, onSaveSuccess }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    emails: companyInfo?.emails || [],
    phones: companyInfo?.phones || [],
    locations: companyInfo?.locations || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        emails: companyInfo?.emails || [],
        phones: companyInfo?.phones || [],
        locations: companyInfo?.locations || []
      });
    }
  }, [isOpen, companyInfo]);

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

  if (!isOpen) return null;

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleRemoveField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      // Filter out empty strings
      const cleanedData = {
        emails: formData.emails.filter(e => e.trim() !== ''),
        phones: formData.phones.filter(p => p.trim() !== ''),
        locations: formData.locations.filter(l => l.trim() !== '')
      };
      
      const updatedInfo = await updateCompanyInfo(cleanedData, token);
      onSaveSuccess(updatedInfo);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update company info');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldSection = (title, field, placeholder) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">{title}</label>
        <button
          type="button"
          onClick={() => handleAddField(field)}
          className="text-purple-400 hover:text-purple-300 flex items-center text-xs font-bold"
        >
          <Plus className="w-3 h-3 mr-1" /> Add
        </button>
      </div>
      {formData[field].map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            className="flex-1 bg-[#070611] border border-purple-500/20 rounded-none px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm font-sans"
            placeholder={placeholder}
            required
          />
          <button
            type="button"
            onClick={() => handleRemoveField(field, index)}
            className="p-2 text-red-400 hover:text-white bg-[#120F2D] hover:bg-red-600 rounded-none border border-red-500/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      {formData[field].length === 0 && (
        <p className="text-xs text-gray-400 italic">No {title.toLowerCase()} added.</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0E0C1F] border border-purple-500/25 rounded-none p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white font-space">Edit Contact Info</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-none text-xs font-mono text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderFieldSection('Emails', 'emails', 'company@example.com')}
          {renderFieldSection('Phone Numbers', 'phones', '+1 234 567 8900')}
          {renderFieldSection('Locations', 'locations', 'City, Country')}

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-none border border-purple-500/20 text-gray-300 font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-none cyber-button-solid !rounded-none font-bold text-xs uppercase tracking-wider disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
