import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Practices & Standards', href: '/#why-us' },
    { name: 'Engagements', href: '/#cases' },
    { name: 'Inquiries (FAQ)', href: '/faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-hairline)]">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center h-20">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/middle-logo-dark.png"
            alt="Defensive Cyber Insignia"
            className="w-8 h-8 object-contain dark:invert-0 opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-[var(--text-heading)] leading-none">
              DEFENSIVE CYBER
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase mt-0.5">
              SECURITY AUDIT & ADVISORY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-[var(--text-body)] hover:text-[var(--text-heading)] transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-heading)] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Corner Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Minimalist Hard Square Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme palette"
            title={theme === 'dark' ? 'Switch to Warm Slate Cream' : 'Switch to Charcoal Obsidian'}
            className="px-3 py-2 border border-[var(--border-hairline)] bg-[var(--bg-base)] text-[var(--text-body)] hover:text-[var(--text-heading)] hover:border-[var(--text-heading)] transition-all font-mono text-xs flex items-center gap-2 cursor-pointer rounded-none"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="tracking-wider uppercase text-[11px]">CREAM</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="tracking-wider uppercase text-[11px]">DARK</span>
              </>
            )}
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-red-700/40 bg-red-950/20 text-red-700 dark:text-red-400 hover:bg-red-700 hover:text-white transition-all text-xs font-mono font-medium uppercase tracking-wider cursor-pointer rounded-none"
            >
              Logout Admin
            </button>
          ) : (
            <a
              href="/#contact"
              className="cyber-button-solid !rounded-none !py-2.5 !px-5 text-xs tracking-wider"
            >
              Engage Us
            </a>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 border border-[var(--border-hairline)] text-[var(--text-heading)] rounded-none"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            className="p-2 border border-[var(--border-hairline)] text-[var(--text-heading)] rounded-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-base)] px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm uppercase tracking-widest text-[var(--text-body)] hover:text-[var(--text-heading)] py-2 border-b border-[var(--border-hairline)]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 border border-red-700 text-red-600 font-mono text-xs uppercase tracking-wider rounded-none"
                  >
                    Logout Admin
                  </button>
                ) : (
                  <a
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full cyber-button-solid text-center block !py-3"
                  >
                    Engage Us
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
