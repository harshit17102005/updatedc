import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { fetchServices, defaultServices } from '../utils/blogStore';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      try {
        const services = await fetchServices();
        const found = (services || defaultServices).find(s => s.slug === id);
        setService(found);
      } catch (e) {
        const found = defaultServices.find(s => s.slug === id);
        setService(found);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-transparent">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-none animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-purple-300">Loading Assessment Specs...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-transparent">
        <h2 className="text-2xl font-bold font-space mb-4">Capability Not Found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="cyber-button !rounded-none text-xs uppercase tracking-wider font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const IconComponent = Icons[service.icon] || Icons.Search;

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-white">
      <Helmet>
        <title>{`${service.title} | Defensive Cyber Services`}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="container mx-auto px-6 relative z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="group inline-flex items-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none cursor-pointer mb-8"
        >
          <Icons.ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-4 rounded-none bg-[#0E0C1F] border border-purple-500/25 mb-6 backdrop-blur-sm"
            >
              <IconComponent className="w-10 h-10 text-purple-400" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold font-space uppercase mb-4 tracking-tight"
            >
              {service.title}
            </motion.h1>
            
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              {service.description}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#0E0C1F]/90 backdrop-blur-md p-8 md:p-12 rounded-none border border-purple-500/15 shadow-xl"
          >
            <div 
              className="prose max-w-none text-gray-300 leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: service.content || `<p>${service.description}</p>` }}
            />

            <div className="mt-12 pt-8 border-t border-purple-500/15 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Need this assessment for your organization?
              </span>
              <a 
                href="/#contact"
                className="cyber-button-solid !rounded-none text-xs uppercase tracking-wider font-bold"
              >
                Schedule Assessment <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
