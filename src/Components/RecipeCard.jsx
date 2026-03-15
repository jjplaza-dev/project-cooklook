import React from 'react';
import { Clock, ChefHat, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, searchQuery }) {
  // Use the pre-parsed array from our service
  const ingredientCount = recipe.parsedIngredients?.length || 0;
  
  // Optional: Calculate how many searched ingredients match this recipe
  const searchTerms = searchQuery?.toLowerCase().split(',').map(s => s.trim()) || [];
  const matchedCount = recipe.parsedCleaned?.filter(ing => 
    searchTerms.some(term => ing.toLowerCase().includes(term))
  ).length || 0;

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-[var(--color-secondary-)]/10 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      {/* Recipe Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.Image_Name || '/api/placeholder/400/300'} 
          alt={recipe.Title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--color-accent-)] flex items-center shadow-sm">
          <ChefHat className="w-3 h-3 mr-1.5 text-[var(--color-primary-)]" />
          {ingredientCount} Ingredients
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-[var(--color-accent-)] mb-2 line-clamp-2 group-hover:text-[var(--color-primary-)] transition-colors">
          {recipe.Title}
        </h3>
        
        {/* Match Indicator */}
        {searchQuery && (
          <div className="mb-4">
            <div className="w-full bg-[var(--color-background-)] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[var(--color-primary-)] h-full transition-all duration-1000" 
                style={{ width: `${Math.min((matchedCount / searchTerms.length) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] font-bold text-[var(--color-secondary-)] mt-1.5 uppercase tracking-wider">
              Matches {matchedCount} of your items
            </p>
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--color-secondary-)]/5">
          <div className="flex items-center text-[var(--color-secondary-)] text-xs font-bold">
            <Clock className="w-4 h-4 mr-1.5 text-[var(--color-primary-)]" />
            {recipe.Time || '30-45'} mins
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--color-background-)] flex items-center justify-center group-hover:bg-[var(--color-primary-)] group-hover:text-white transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}