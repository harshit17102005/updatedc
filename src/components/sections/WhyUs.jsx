import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Shield, CheckCircle, Clock } from 'lucide-react';

const stats = [
  { label: 'Independent Security Audits', value: 120, suffix: '+', icon: Target },
  { label: 'Verified Remediation Rate', value: 99, suffix: '%', icon: CheckCircle },
  { label: 'Automated False-Positive Rate', value: 0, suffix: '%', icon: Shield },
  { label: 'Emergency Incident Response SLA', value: 24, suffix: 'h', icon: Clock },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      if (value === 0) {
        setCount(0);
        return;
      }
      let start = 0;
      const duration = 1600;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[var(--text-heading)] tracking-tight">
      {count}
      <span>{suffix}</span>
    </span>
  );
};

export const WhyUsStats = () => {
  return (
    <div className="mt-12 sm:mt-14 border-t border-b border-[var(--border-hairline)] py-8 sm:py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-start ${index !== 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4 text-[var(--text-muted)] shrink-0" strokeWidth={1.75} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                METRIC 0{index + 1}
              </span>
            </div>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--text-body)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
