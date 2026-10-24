import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPosts, fetchCisaNews, defaultPosts } from '../../utils/blogStore';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog = () => {
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    const loadHomepagePosts = async () => {
      try {
        const allPosts = await fetchPosts();
        let newsPost = allPosts.find(p => p.type === 'news');
        let blogPost = allPosts.find(p => p.type === 'blog');

        try {
          const cisaNews = await fetchCisaNews(1);
          if (cisaNews && cisaNews.length > 0) {
            newsPost = cisaNews[0];
          }
        } catch (e) {
          console.error('Failed to load CISA news', e);
        }

        if (!newsPost) newsPost = defaultPosts[0];
        if (!blogPost) blogPost = defaultPosts[1];

        setPosts([newsPost, blogPost]);
      } catch (err) {
        console.error('Failed to load homepage posts', err);
        setPosts(defaultPosts);
      }
    };
    
    loadHomepagePosts();
  }, []);

  return (
    <section id="blog" className="py-14 sm:py-16 border-b border-[var(--border-hairline)] bg-[var(--bg-base)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[var(--border-hairline)]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--text-heading)] rounded-none" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
                TECHNICAL DISPATCHES & ADVISORIES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[var(--text-heading)] md:whitespace-nowrap">
              Threat Intelligence & Bulletins.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] max-w-xs text-right">
            Zero-day vulnerability disclosures and defensive engineering writeups.
          </p>
        </div>

        {/* 2-Column Editorial Articles */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <div
              key={post._id || post.id}
              className="border border-[var(--border-hairline)] bg-[var(--bg-card)] p-8 sm:p-10 rounded-none flex flex-col justify-between hover:border-[var(--text-heading)] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-hairline)]">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                    {post.type === 'news' ? 'CISA ADVISORY / BULLETIN' : 'TECHNICAL RESEARCH'}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {index === 0 ? 'LATEST' : 'FEATURED'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-4 leading-snug">
                  {post.title}
                </h3>
                
                <p className="font-sans text-sm text-[var(--text-body)] leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between">
                {post.isExternal ? (
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-heading)] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Advisory Source</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link 
                    to={`/post/${post._id || post.id}`} 
                    state={{ from: '/#blog' }}
                    onClick={() => window.scrollTo(0, 0)}
                    className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-heading)] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Whitepaper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                <Link 
                  to={post.type === 'news' ? '/news' : '/blogs'} 
                  className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-heading)] uppercase tracking-wider underline"
                >
                  All {post.type === 'news' ? 'Advisories' : 'Research'}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
