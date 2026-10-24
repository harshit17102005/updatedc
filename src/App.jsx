import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { BlogPage } from './pages/BlogPage';
import { NewsPage } from './pages/NewsPage';
import { AdminBlog } from './pages/AdminBlog';
import { BlogPost } from './pages/BlogPost';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';

import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="relative min-h-screen text-[var(--text-base)] font-sans selection:bg-purple-600/30 selection:text-white transition-colors duration-300">
            {/* Ambient Background Layer */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
              <AnimatedBackground />
            </div>

            {/* Page Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
              <header>
                <Navbar />
              </header>
            
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs" element={<BlogPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/secure-admin" element={<AdminBlog />} />
                  <Route path="/post/:id" element={<BlogPost />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/legal" element={<PrivacyTermsPage />} />
                  <Route path="/service/:id" element={<ServiceDetailsPage />} />
                </Routes>
              </main>

              <footer>
                <Footer />
              </footer>
            </div>
          </div>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
  );
}

export default App;
