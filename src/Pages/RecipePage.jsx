import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronUp, Loader2, CheckCircle2 } from "lucide-react";
import { useRecipe } from "../assets/utils/recipeService";

export default function RecipePage() {
  const { id } = useParams();
  const [isMobileIngredientsOpen, setIsMobileIngredientsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const { data: recipe, isLoading, isError } = useRecipe(id);

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background-)]">
        <Loader2 className="w-12 h-12 text-[var(--color-primary-)] animate-spin mb-4" />
        <p className="text-[var(--color-secondary-)] font-bold text-lg tracking-tight">
          Assembling the ingredients...
        </p>
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-)]">
        <div className="text-center">
          <p className="text-[var(--color-accent-)] text-2xl font-black mb-4">Recipe not found.</p>
          <button onClick={() => window.history.back()} className="text-[var(--color-primary-)] font-bold underline">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // CATERING TO NEW FETCHING: Use the pre-parsed array from recipeService
  const ingredientsList = recipe.parsedIngredients || [];
  const instructionSteps = recipe.Instructions?.split("\n").filter((step) => step.trim() !== "") || [];

  const IngredientsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-[var(--color-accent-)] tracking-tight">
          Ingredients
        </h2>
        <span className="text-xs font-black uppercase tracking-widest text-[var(--color-primary-)] bg-[var(--color-primary-)]/10 px-3 py-1 rounded-full">
          {ingredientsList.length} Items
        </span>
      </div>
      
      <div className="space-y-4">
        {ingredientsList.map((ingredient, idx) => (
          <label key={idx} className="flex items-start gap-4 cursor-pointer group relative">
            <div className="relative flex items-center justify-center mt-1">
               <input
                type="checkbox"
                checked={!!checkedItems[idx]}
                onChange={() => toggleCheck(idx)}
                className="peer appearance-none w-6 h-6 rounded-lg border-2 border-[var(--color-secondary-)]/20 checked:bg-[var(--color-primary-)] checked:border-[var(--color-primary-)] transition-all cursor-pointer"
              />
              <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
            </div>
            
            <span
              className={`text-lg leading-snug transition-all duration-300 font-medium ${
                checkedItems[idx] 
                  ? "text-[var(--color-secondary-)] line-through opacity-40 italic" 
                  : "text-[var(--color-accent-)]/80 group-hover:text-[var(--color-accent-)]"
              }`}
            >
              {ingredient}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pt-24 pb-24 px-6 max-w-7xl mx-auto bg-[var(--color-background-)]">
      <header className="mb-12 border-b border-[var(--color-secondary-)]/10 pb-8">
        <h1 className="text-4xl md:text-7xl font-black text-[var(--color-accent-)] leading-[1] tracking-tighter mb-4">
          {recipe.Title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-bold text-[var(--color-secondary-)]">
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* LEFT SIDEBAR: Sticky Ingredients */}
        <aside className="hidden md:block md:col-span-4 sticky top-32 self-start">
          <div className="p-8 rounded-[2.5rem] bg-white border border-[var(--color-secondary-)]/10 shadow-xl shadow-black/[0.02]">
            <IngredientsList />
          </div>
        </aside>

        {/* RIGHT CONTENT: Image & Procedures */}
        <div className="md:col-span-8 flex flex-col gap-16">
          <div className="w-full aspect-[4/3] lg:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
            <img
              src={`https://qidzadjpzgycrxuolkia.supabase.co/storage/v1/object/public/recipe-images/${recipe.Image_Name}.jpg`}
              alt={recipe.Title}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200";
              }}
            />
          </div>

          <section>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--color-accent-)] mb-12 tracking-tight">
              Procedures
            </h2>
            <div className="space-y-16">
              {instructionSteps.map((step, idx) => (
                <div key={idx} className="group relative pl-16 md:pl-20">
                  {/* Vertical line connector */}
                  {idx !== instructionSteps.length - 1 && (
                    <div className="absolute left-[31px] md:left-[39px] top-12" />
                  )}
                  
                  <span className="absolute left-0 top-0 text-5xl md:text-7xl font-black text-[var(--color-primary-)]/20 leading-none select-none transition-colors group-hover:text-[var(--color-primary-)]/40">
                    {String(idx + 1).padStart(2)}
                  </span>
                  
                  <p className="text-xl md:text-xl text-[var(--color-accent-)] font-medium leading-relaxed pt-2">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-[3rem] shadow-[0_-20px_80px_rgba(0,0,0,0.2)] border-t border-[var(--color-secondary-)]/10 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMobileIngredientsOpen ? "h-[85vh]" : "h-24"
        }`}
      >
        <button
          onClick={() => setIsMobileIngredientsOpen(!isMobileIngredientsOpen)}
          className="w-full h-24 px-10 flex items-center justify-between group"
        >
          <div className="flex flex-col items-start">
            <div className="w-12 h-1.5 bg-[var(--color-secondary-)]/10 rounded-full mb-4 self-center mx-auto md:hidden" />
            <span className="font-black text-2xl text-[var(--color-accent-)]">
              Ingredients
            </span>
          </div>
          <div className={`p-3 rounded-2xl transition-all duration-500 ${isMobileIngredientsOpen ? 'rotate-180 bg-[var(--color-primary-)] text-white' : 'bg-[var(--color-background-)] text-[var(--color-primary-)]'}`}>
             <ChevronUp className="w-6 h-6" />
          </div>
        </button>
        
        <div className="h-[calc(85vh-96px)] overflow-y-auto px-10 pb-20">
          <IngredientsList />
        </div>
      </div> 
    </main>
  );
}