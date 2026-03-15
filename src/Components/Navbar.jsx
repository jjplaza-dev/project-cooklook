import React, { useState, useEffect } from "react";
import { UtensilsCrossed, Heart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const location = useLocation();

  // Handle scroll for the glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync favorite count from LocalStorage
  useEffect(() => {
    const updateCount = () => {
      const favorites = JSON.parse(localStorage.getItem("cooklook_favorites") || "[]");
      setFavoriteCount(favorites.length);
    };

    // Initial load
    updateCount();

    // Listen for custom event to update without refreshing
    window.addEventListener('favoritesUpdated', updateCount);
    return () => window.removeEventListener('favoritesUpdated', updateCount);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileOpen 
            ? "bg-white/80 backdrop-blur-lg py-3 shadow-sm" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-[var(--color-primary-)] p-2 rounded-xl text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[var(--color-primary-)]/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tight text-[var(--color-accent-)]">
                CookLook
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-bold text-[var(--color-secondary-)] hover:text-[var(--color-primary-)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              <Link to="/favorites" className="relative group">
                <div className="p-2 rounded-full hover:bg-[var(--color-secondary-)]/10 text-[var(--color-secondary-)] transition-colors">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {favoriteCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary-)] text-[10px] font-black text-white shadow-sm border-2 border-white">
                      {favoriteCount > 99 ? '99+' : favoriteCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/favorites" className="relative text-[var(--color-secondary-)]">
                <Heart className="w-6 h-6" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary-)] text-[10px] font-black text-white border-2 border-white">
                    {favoriteCount > 99 ? '99+' : favoriteCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-[var(--color-accent-)] p-1 hover:bg-[var(--color-secondary-)]/10 rounded-lg transition-colors"
              >
                {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute w-full left-0 top-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl transition-all duration-300 overflow-hidden ${
            isMobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block text-xl font-black text-[var(--color-accent-)] hover:text-[var(--color-primary-)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content jump when navbar becomes sticky */}
      <div className="h-20" /> 
    </>
  );
}

export default Navbar;