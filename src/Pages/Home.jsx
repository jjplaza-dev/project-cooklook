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
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [ingredients, setIngredients] = useState("");

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const elementRef = useRef(null);
  const containerRef = useRef(null);

  // Animation: Hero and General Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animation: Scroll-based Hero Scaling
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        height: "90vh",
        width: "90%",
        borderRadius: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Animation: How It Works Steps
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".step-image", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }).from(".step-text", {
        y: "100%",
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main ref={heroRef} className="flex-grow pt-20">
        {/* Hero Section */}
        <div 
          ref={elementRef} 
          className="w-full h-screen m-auto relative overflow-hidden bg-base-100 py-20 lg:py-32" 
          style={{
            backgroundImage: `url("src/assets/images/choppingboard1.jpg")`, 
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        >
          <div className="absolute inset-0 bg-black/20 z-0" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center hero-content">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 bg-amber-950/10 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              Discover delicious recipes instantly
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Cook with what <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                you have today.
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Enter the ingredients in your pantry, and we'll show you the magic
              you can create. No waste, just taste.
            </p>

            <div className="max-w-2xl mx-auto relative group">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-2">
                <Search className="w-6 h-6 text-gray-400 ml-3 mr-2" />
                <input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g. chicken, potatoes, garlic..."
                  className="w-full border-none text-lg h-12 bg-transparent focus:outline-none text-gray-800"
                />
                <button className="bg-primary text-white rounded-xl px-8 py-3 font-semibold transition-all hover:bg-primary/90">
                  Find Recipes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-500">Three simple steps to your next delicious meal.</p>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { title: "Check Your Pantry", img: "src/assets/images/pantry.png", desc: "Look around and see what ingredients you have." },
                { title: "Enter Ingredients", img: "src/assets/images/ingredientslist.png", desc: "Type them into our search bar above." },
                { title: "Get Cooking", img: "src/assets/images/cooking.png", desc: "Browse recipes and enjoy your meal." }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="step-image w-[80%] aspect-video mx-auto mb-6">
                    <img className="w-full h-full object-cover rounded-lg" src={item.img} alt={item.title} />
                  </div>
                  <h3 className="step-text text-xl font-bold mb-3">{item.title}</h3>
                  <p className="step-text text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use CookLook?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ChefHat, title: "Smart Recommendations", desc: "Our algorithm finds the best match for your ingredients." },
                { icon: Heart, title: "Save Favorites", desc: "Keep a personal cookbook of your most loved recipes." },
                { icon: TrendingUp, title: "Trending Recipes", desc: "Discover what the community is cooking daily." }
              ].map((feature, idx) => (
                <div key={idx} className="feature-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
       <section
          className="py-24 relative bg-base-100 overflow-hidden"
        >
          <div className="absolute inset-0 scale-110 z-10" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to create something delicious?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of home cooks reducing waste and eating better with
              Dishapp.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.querySelector("input")?.focus()}
                size="lg"
                className="text-lg px-8 h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-2px] transition-all flex justify-between items-center"
              >
                Start Cooking
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}