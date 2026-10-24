import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPosts, deletePost, fetchCisaNews } from '../utils/blogStore';
import { useAuth } from '../contexts/AuthContext';
import { PostFormModal } from '../components/admin/PostFormModal';
import { ArrowLeft, ArrowRight, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      let manualNews = data.filter(p => p.type === 'news');
      let combined = [...manualNews];

      try {
        const cisaNews = await fetchCisaNews(10);
        if (cisaNews && cisaNews.length > 0) {
          combined = [...manualNews, ...cisaNews];
        }
      } catch (e) {
        console.error('Failed to load CISA news', e);
      }

      setPosts(combined);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news post?')) {
      try {
        await deletePost(id, token);
        loadPosts();
      } catch (err) {
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  return (
    <main className="pt-32 pb-24 relative min-h-screen text-white bg-transparent">
      <Helmet>
        <title>Cybersecurity News & Advisories | Defensive Cyber</title>
        <meta name="description" content="Stay up to date with the latest cybersecurity advisories, CISA alerts, and vulnerability disclosures." />
      </Helmet>
      
      <div className="container mx-auto px-6 relative z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('blog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
          className="absolute top-0 left-6 lg:left-12 group z-50 flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none w-max cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="text-center max-w-3xl mx-auto mb-12 pt-4 mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-purple-500/25 bg-purple-500/10 mb-4">
            <span className="text-xs font-mono font-medium tracking-widest text-purple-300 uppercase">
              THREAT ADVISORIES & DISCLOSURES
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-space text-white uppercase tracking-tight"
          >
            CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-200">ADVISORIES</span>
          </motion.h1>
        </div>

        {isAuthenticated && (
          <div className="flex justify-center mb-12">
            <button 
              onClick={handleAddNew}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-none font-semibold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Post New Advisory
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group flex flex-col h-full rounded-none border border-purple-500/15 hover:border-purple-400/40 bg-[#0E0C1F]/90 backdrop-blur-md transition-all duration-300 hover:bg-[#14112E] relative"
            >
              {isAuthenticated && !post.isExternal && (
                <div className="absolute top-4 right-4 z-20 flex gap-1">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="p-1.5 bg-[#120F2D] hover:bg-purple-600 text-white rounded-none border border-purple-500/30 transition-colors"
                    title="Edit News"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(post._id || post.id)}
                    className="p-1.5 bg-[#120F2D] hover:bg-red-600 text-red-400 hover:text-white rounded-none border border-red-500/30 transition-colors"
                    title="Delete News"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow text-left min-w-0 w-full">
                <div className="mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 border border-purple-500/20">
                    {post.isExternal ? 'CISA Telemetry' : 'Security Advisory'}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-space text-white group-hover:text-purple-300 transition-colors mb-3 break-words pr-6">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-purple-500/15 flex justify-between items-center w-full">
                  {post.isExternal ? (
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Read on CISA <ArrowRight className="w-4 h-4 ml-1.5" />
                    </a>
                  ) : (
                    <span 
                      onClick={() => navigate(`/post/${post._id || post.id}`, { state: { from: '/news' } })}
                      className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      Read Full Advisory <ArrowRight className="w-4 h-4 ml-1.5" />
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-gray-500">
                    {post.date ? new Date(post.date).toLocaleDateString() : ''}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PostFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadPosts}
        initialData={editingPost}
        defaultType="news"
      />
    </main>
  );
};
