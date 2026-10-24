import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as Icons from 'lucide-react';
import { fetchServices, deleteService, defaultServices } from '../utils/blogStore';
import { useAuth } from '../contexts/AuthContext';
import { ServiceFormModal } from '../components/admin/ServiceFormModal';

const ServiceCard = ({ service, index, isAuthenticated, onEdit, onDelete }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const IconComponent = Icons[service.icon] || Icons.Search;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full relative group/card"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-full p-[1px] rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-shadow duration-500"
      >
        {/* Animated Gradient Border */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 255, 0.4), transparent 40%)`
          }}
        />
        
        {/* Inner Card - Fully Transparent Glass Effect for All Services Page */}
        <Link 
          to={`/service/${service.slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block relative h-full bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] p-8 rounded-2xl flex flex-col items-start gap-4 transition-all duration-500 overflow-hidden"
        >
          {/* Subtle center purple glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(90,20,150,0.2) 0%, transparent 60%)' }} />

          <div className="relative z-10 p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20">
            <IconComponent className="w-8 h-8 text-primary group-hover:text-glow" />
          </div>
          <h3 className="text-xl font-bold font-space text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {service.description}
          </p>
        </Link>
      </div>

      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(service); }}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <Icons.Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(service._id); }}
            className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full backdrop-blur-md transition-colors"
          >
            <Icons.Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const ServicesPage = () => {
  const navigate = useNavigate();
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
    <main className="pt-24 pb-24 relative min-h-screen bg-[#F8F5EF] dark:bg-gray-950">
      <Helmet>
        <title>Cybersecurity Services | Penetration Testing & VAPT - Defensive Cyber</title>
        <meta name="description" content="Explore our complete suite of advanced cybersecurity solutions, including penetration testing, vulnerability assessments, and managed security services." />
      </Helmet>
      <div className="container mx-auto px-6 relative z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
          className="group inline-flex items-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none cursor-pointer mt-8 mb-4"
        >
          <Icons.ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <div className="text-center max-w-3xl mx-auto mb-16 pt-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-space uppercase tracking-tight mb-6 text-white"
          >
            ALL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-200">CYBERSECURITY SERVICES</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 font-sans text-base mb-8"
          >
            Explore our complete suite of advanced cybersecurity solutions designed to secure every aspect of your digital infrastructure.
          </motion.p>
          
          {isAuthenticated && (
            <button
              onClick={() => { setEditingService(null); setIsModalOpen(true); }}
              className="mt-4 px-6 py-2.5 rounded-none cyber-button-solid text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 mx-auto"
            >
              <Icons.Plus className="w-4 h-4" />
              Add Service
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service._id || index} 
              service={service} 
              index={index} 
              isAuthenticated={isAuthenticated}
              onEdit={(s) => { setEditingService(s); setIsModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <ServiceFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadServices}
        initialData={editingService}
      />
    </main>
  );
};
