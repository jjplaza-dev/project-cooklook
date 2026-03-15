import React, { useEffect } from 'react';
import { ShieldCheck, Database, EyeOff, Lock } from 'lucide-react';

const Privacy = () => {

    useEffect(() => window.scrollTo(0, 0), []);

  const sections = [
    {
      icon: <EyeOff className="w-6 h-6 text-[var(--color-primary-)]" />,
      title: "No Personal Collection",
      content: "CookLook does not collect, store, or sell your personal data. We don't use accounts, track your identity, or monitor your browsing habits."
    },
    {
      icon: <Database className="w-6 h-6 text-[var(--color-primary-)]" />,
      title: "Local Storage Only",
      content: "Your 'Favorites' list is stored exclusively in your browser's Local Storage. This data never leaves your device and is not accessible by us."
    },
    {
      icon: <Lock className="w-6 h-6 text-[var(--color-primary-)]" />,
      title: "You're in Control",
      content: "Since data is stored locally, clearing your browser cache or site data will remove your favorites. You have total autonomy over your information."
    }
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen bg-[var(--color-background-)]">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-[var(--color-primary-)]/10">
          <ShieldCheck className="w-8 h-8 text-[var(--color-primary-)]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[var(--color-accent-)] mb-6 tracking-tighter">
          Privacy <span className="text-[var(--color-primary-)]">Matters</span>
        </h1>
        <p className="text-[var(--color-secondary-)] font-medium text-lg max-w-2xl mx-auto">
          We believe the best way to protect your data is to never ask for it in the first place.
        </p>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {sections.map((section, idx) => (
          <div 
            key={idx} 
            className="p-8 rounded-[2.5rem] bg-white border border-[var(--color-secondary-)]/5 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="mb-6">{section.icon}</div>
            <h2 className="text-xl font-black text-[var(--color-accent-)] mb-3 tracking-tight">
              {section.title}
            </h2>
            <p className="text-[var(--color-secondary-)] leading-relaxed text-sm font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="p-10 rounded-[3rem] bg-[var(--color-accent-)] text-white text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-4 tracking-tight">Purely Functional</h3>
          <p className="opacity-70 max-w-xl mx-auto text-sm leading-relaxed">
            CookLook is designed to be a tool for you, not a product for advertisers. 
            Enjoy your recipes with the peace of mind that your kitchen business is your own.
          </p>
        </div>
        {/* Subtle motion-designer background detail */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>
    </main>
  );
};

export default Privacy;