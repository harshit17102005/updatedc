import React from 'react';

/**
 * Editorial Geometric Grid Background with Subtle Ambient Bottom-Left Shade
 * Light/Cream Mode: Soft golden ambient illumination from bottom-left
 * Dark Mode: Soft purple ambient illumination from bottom-left
 */
export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-300">
      {/* Ambient bottom-left illumination (golden in cream, purple in dark) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: 'var(--bottom-left-ambient)'
        }}
      />

      {/* Architectural geometric hairline grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />
    </div>
  );
};
