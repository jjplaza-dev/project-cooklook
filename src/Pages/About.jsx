import React from 'react';

const About = () => {
  return (
    <main className="min-h-screen pt-10 pb-24 px-6 max-w-6xl mx-auto bg-[var(--color-background-)]">
      
      {/* Brand Identity Section */}
      <section className="mb-24">
        <div className="inline-block px-4 py-1 rounded-full border border-[var(--color-primary-)] text-[var(--color-primary-)] text-xs font-bold tracking-[0.2em] mb-6 uppercase">
          About the Platform
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-[var(--color-accent-)] leading-[0.9] tracking-tighter mb-10">
          YOUR DIGITAL <br />
          <span className="text-[var(--color-secondary-)]/40">KITCHEN</span> COMPANION<span className="text-[var(--color-primary-)]">.</span>
        </h1>
        <p className="text-xl md:text-3xl text-[var(--color-accent-)]/80 leading-snug max-w-4xl font-medium">
          CookLook is a streamlined search engine designed to navigate a vast library of over 13,000 recipes with zero friction. 
        </p>
      </section>

      {/* Feature Grid: Focusing on Site Utility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[var(--color-secondary-)]/10 pt-16">
        
        {/* Massive Library */}
        <div className="space-y-4">
          <div className="text-4xl font-black text-[var(--color-primary-)]">13k+</div>
          <h3 className="text-xl font-bold text-[var(--color-accent-)]">Curated Recipes</h3>
          <p className="text-[var(--color-accent-)]/70 leading-relaxed">
            From quick weeknight meals to complex culinary projects. Our database is optimized for speed, ensuring you find exactly what you need in milliseconds.
          </p>
        </div>

        {/* Minimalist UI */}
        <div className="space-y-4">
          <div className="text-4xl font-black text-[var(--color-primary-)]">0.0s</div>
          <h3 className="text-xl font-bold text-[var(--color-accent-)]">Distraction Free</h3>
          <p className="text-[var(--color-accent-)]/70 leading-relaxed">
            We’ve stripped away the long-winded backstories found on most food blogs. CookLook delivers ingredients and procedures immediately.
          </p>
        </div>

        {/* Technical Precision */}
        <div className="space-y-4">
          <div className="text-4xl font-black text-[var(--color-primary-)]">Real-time</div>
          <h3 className="text-xl font-bold text-[var(--color-accent-)]">Ingredient Tracking</h3>
          <p className="text-[var(--color-accent-)]/70 leading-relaxed">
            An interactive interface that allows you to check off ingredients as you go, keeping your place in the kitchen consistent and organized.
          </p>
        </div>
      </div>

      {/* The Mission Statement */}
      <section className="mt-32 p-12 md:p-20 rounded-[3rem] bg-white border border-[var(--color-secondary-)]/10 shadow-sm text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--color-accent-)] mb-6 tracking-tight">
          Effortless Discovery.
        </h2>
        <p className="text-lg md:text-xl text-[var(--color-secondary-)] max-w-2xl mx-auto leading-relaxed">
          The goal of CookLook is to bridge the gap between "what's in the pantry" and "what's for dinner." By focusing on a "Procedure-First" layout, we make the cooking process as seamless as the search itself.
        </p>
      </section>

    </main>
  );
};

export default About;