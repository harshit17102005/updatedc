import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchPostById } from '../utils/blogStore';
import { ArrowLeft, Calendar, BookOpen, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-transparent">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-none animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-purple-300">Loading Intelligence...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-transparent">
        <h2 className="text-2xl font-bold font-space mb-4">Advisory Not Found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="cyber-button !rounded-none text-xs uppercase tracking-wider font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 relative min-h-screen text-white bg-transparent">
      <Helmet>
        <title>{`${post.title} | Defensive Cyber`}</title>
        <meta name="description" content={post.excerpt || 'Read the full cybersecurity advisory.'} />
      </Helmet>

      <div className="container mx-auto px-6 relative z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            if (location.state && location.state.from) {
              navigate(location.state.from);
            } else {
              navigate('/');
            }
          }}
          className="absolute top-0 left-6 lg:left-12 group z-[60] flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none w-max cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="max-w-4xl mx-auto mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-[#0E0C1F]/90 backdrop-blur-md p-8 md:p-12 rounded-none border border-purple-500/15 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6 border-b border-purple-500/15">
              <span className="inline-flex px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-none items-center justify-center gap-2 w-max bg-purple-500/10 text-purple-300 border border-purple-500/25">
                {post.type === 'news' ? <Radio className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                {post.type}
              </span>
              
              <div className="flex items-center text-gray-400 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5 mr-2 text-purple-400" />
                {post.date ? new Date(post.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Recently Published'}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-space text-white mb-8 leading-tight">
              {post.title}
            </h1>

            <div 
              className="prose max-w-none text-gray-300 leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};
