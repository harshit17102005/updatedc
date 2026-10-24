import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { Blog } from '../components/sections/Blog';


import { CaseStudiesSlider } from '../components/sections/CaseStudiesSlider';
import { Contact } from '../components/sections/Contact';

export const Home = () => {
  const location = useLocation();
  const [showEnquireBtn, setShowEnquireBtn] = useState(true);
  const contactRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowEnquireBtn(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);
  return (
    <main>
      <Helmet>
        <title>Defensive Cyber - Premier Cybersecurity & Penetration Testing Services</title>
        <meta name="description" content="Defensive Cyber provides top-tier penetration testing, vulnerability assessments, and cybersecurity consulting to protect your business." />
        <meta name="keywords" content="Cybersecurity, Penetration Testing, VAPT, Cyber Defense, Security Audit" />
      </Helmet>
      <Hero />
      <Services />
      <div className="relative -mt-[1px]">
        <div className="relative z-10">
          <Blog />
        </div>
      </div>
      
      {/* Whitish Golden Theme Sections */}
      <div className="relative bg-transparent">
        <div className="relative z-10">
          <CaseStudiesSlider />
          <div ref={contactRef}>
            <Contact />
          </div>
        </div>
      </div>
      
      {/* Fixed Enquire Now Button */}
      <a 
        href="#contact" 
        className={`fixed bottom-8 right-8 brand-btn-primary !rounded-none text-xs font-mono uppercase tracking-widest font-semibold text-center flex items-center justify-center z-50 transition-opacity duration-300 !py-3 !px-6 border border-[var(--border-hairline)] ${showEnquireBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        Enquire Scope
      </a>
    </main>
  );
};
