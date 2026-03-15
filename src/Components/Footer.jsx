import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 border-t border-[var(--color-secondary-)]/10 bg-[var(--color-background-)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-black text-[var(--color-accent-)] tracking-tighter">
            COOKLOOK<span className="text-[var(--color-primary-)]">.</span>
          </h2>
          <p className="text-sm text-[var(--color-secondary-)] mt-1 font-medium">
            Elevating your digital kitchen experience.
          </p>
        </div>

        {/* Quick Links / Status */}
        <div className="flex gap-8 text-sm font-bold text-[var(--color-accent-)]/60">
          <a href="#" className="hover:text-[var(--color-primary-)] transition-colors">Recipes</a>
          <a href="#" className="hover:text-[var(--color-primary-)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--color-primary-)] transition-colors">Privacy</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[var(--color-secondary-)] font-medium">
          © {currentYear} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;