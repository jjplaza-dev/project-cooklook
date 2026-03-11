import React, { useState, useEffect } from "react";
import { UtensilsCrossed, Heart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle scroll for the glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileOpen 
          ? "bg-white/80 backdrop-blur-lg border-slate-100 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">
              CookLook
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <a href="/favorites" className="relative group">
              <div className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm border-2 border-white">
                  2
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <a href="/favorites" className="relative text-slate-600">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                2
              </span>
            </a>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-slate-900 p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 absolute w-full left-0 top-full">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block text-xl font-bold text-slate-900 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;