import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ArrowRight,
  Sparkles,
  ChefHat,
  Heart,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/images/choppingboard1.jpg"
import pantryImage from "../assets/images/pantry.png"
import ingredientsImage from "../assets/images/ingredientslist.png"
import cookingImage from "../assets/images/cooking.png"

gsap.registerPlugin(ScrollTrigger);

const MOST_SEARCHED = ["Chicken", "Pasta", "Garlic", "Potatoes", "Beef"];

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const elementRef = useRef(null);
  const containerRef = useRef(null);

  const handleSearch = (e, overrideQuery = null) => {
    if (e) e.preventDefault();
    const queryToSearch = overrideQuery || ingredients;
    if (queryToSearch.trim()) {
      navigate(`/results?ingredients=${encodeURIComponent(queryToSearch.trim())}`);
    }
  };
  
  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Scroll-based Hero Scaling
      gsap.to(elementRef.current, {
        height: "85vh",
        width: "92%",
        borderRadius: "3rem",
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3. Why Use CookLook: Slide X Animation
      // Starts at -50% X and 0 Opacity
      gsap.fromTo(
      ".feature-card",
      {
        x: "30%", // User-defined translate-x offset\
        y: "10%",
        opacity: 0,
      },
      {
        x: "0%",
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "none", // Clean, non-janky deceleration
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%", // Triggers when the section is 25% into the viewport
          toggleActions: "play none none none",
          // markers: true, // Uncomment this to visually debug the trigger point
        },
      }
    )

      // 4. How It Works Steps
      gsap.from(".step-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background-)] font-sans selection:bg-[var(--color-primary-)] selection:text-white overflow-x-hidden">
      
      <main ref={heroRef} className="flex-grow">
        
        {/* Hero Section */}
        <div 
          ref={elementRef} 
          className="w-full h-screen m-auto relative overflow-hidden py-20 lg:py-32 flex items-center justify-center shadow-2xl" 
          style={{
            backgroundImage: `url(${heroImg})`, 
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />
          
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center hero-content w-full">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold tracking-widest uppercase mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2 text-[var(--color-primary-)]" />
              Over 13,000 Recipes
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tighter">
              Cook with what <br />
              <span className="text-[var(--color-primary-)]">you have today.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Enter the ingredients in your pantry, and we'll show you the magic
              you can create. No waste, just taste.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
              <div className="relative flex items-center bg-white p-2 rounded-full shadow-2xl border-4 border-white/20 transition-all focus-within:border-[var(--color-primary-)]/50 backdrop-blur-sm">
                <Search className="w-6 h-6 text-[var(--color-secondary-)] ml-4 shrink-0" />
                <input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g. chicken, potatoes, garlic..."
                  className="w-full border-none text-lg md:text-xl h-14 bg-transparent focus:outline-none text-[var(--color-accent-)] px-4 font-medium placeholder:text-[var(--color-secondary-)]/60"
                />
                <button 
                  type="submit"
                  className="bg-[var(--color-primary-)] text-white rounded-full px-8 md:px-10 h-14 font-black tracking-wide uppercase text-sm transition-transform hover:scale-105 active:scale-95 shrink-0 shadow-lg shadow-[var(--color-primary-)]/30"
                >
                  Search
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
                <span className="text-white/70 font-medium mr-2">Most Searched:</span>
                {MOST_SEARCHED.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleSearch(e, item)}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-[var(--color-primary-)] text-white font-medium transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-[var(--color-primary-)] hover:scale-105 active:scale-95"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* How It Works */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-[var(--color-accent-)] tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-xl text-[var(--color-secondary-)] font-medium">Three simple steps to your next meal.</p>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              {[
                { title: "Check Your Pantry", img: `${pantryImage}`, desc: "Look around and see what ingredients you have available." },
                { title: "Enter Ingredients", img: `${ingredientsImage}`, desc: "Type them into our lightning-fast search bar above." },
                { title: "Get Cooking", img: `${cookingImage}`, desc: "Browse perfectly matched recipes and start prepping." }
              ].map((item, idx) => (
                <div key={idx} className="step-item group">
                  <div className="w-full max-w-[280px] aspect-square mx-auto mb-8 flex items-center justify-center">
                    <img className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" src={item.img} alt={item.title} />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--color-accent-)] mb-3">{item.title}</h3>
                  <p className="text-[var(--color-secondary-)] text-lg leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Use CookLook: Refined Animation & Style */}
        <section ref={featuresRef} className="py-32 bg-white border-y border-[var(--color-secondary-)]/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-[var(--color-accent-)] tracking-tight mb-4">
                Why Use CookLook?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ChefHat, title: "Smart Matching", desc: "Our engine instantly finds the best recipes for your specific ingredients." },
                { icon: Heart, title: "Curated Library", desc: "Access a highly curated database without the distracting fluff." },
                { icon: TrendingUp, title: "Interactive UI", desc: "Track procedures and check off ingredients in real-time as you cook." }
              ].map((feature, idx) => (
                <div key={idx} className="feature-card bg-[var(--color-background-)] p-10 rounded-[2.5rem] shadow-sm border border-[var(--color-secondary-)]/10">
                  <div className="w-16 h-16 bg-[var(--color-primary-)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary-)] mb-8">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--color-accent-)] mb-4">{feature.title}</h3>
                  <p className="text-lg text-[var(--color-secondary-)] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden bg-[var(--color-background-)]">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-[var(--color-accent-)] leading-tight tracking-tighter mb-8">
              Ready to create <br className="hidden md:block" />
              something delicious?
            </h2>
            <p className="text-xl md:text-2xl text-[var(--color-secondary-)] mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of home cooks reducing waste and eating better with CookLook.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[var(--color-primary-)] text-white text-xl font-bold px-12 h-16 rounded-full shadow-xl shadow-[var(--color-primary-)]/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center group"
            >
              Start Searching
              <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}