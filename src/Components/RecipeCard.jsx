import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const ingredientCount = recipe.parsedIngredients?.length || 0;

  // Sync with LocalStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("cooklook_favorites") || "[]");
    setIsFavorite(favorites.includes(recipe.id));
  }, [recipe.id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Stop navigation to RecipePage
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem("cooklook_favorites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe.id];
    }

    localStorage.setItem("cooklook_favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="group block bg-white rounded-[1rem] overflow-hidden border border-[var(--color-secondary-)]/5 shadow-sm hover:shadow-lg transition-all duration-500 h-full"
    >
      {/* Top Section: Image Area */}
      <div className="relative aspect-[1.69/1] overflow-hidden">
        <img 
          src={`https://qidzadjpzgycrxuolkia.supabase.co/storage/v1/object/public/recipe-images/${recipe.Image_Name}.jpg`}
          alt={recipe.Title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200";
          }}
        />
        
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 p-3 rounded-full backdrop-blur-md transition-all duration-300 active:scale-90 bg-white/20 hover:bg-white shadow-lg"
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite 
                ? "fill-[var(--color-primary-)] text-[var(--color-primary-)]" 
                : "text-[var(--color-accent-)]"
            }`} 
          />
        </button>

        {/* Gradient Overlay for Title Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Bottom Section: Info */}
      <div className="p-6 flex flex-col justify-between">
        <h3 className="text-lg font-black text-[var(--color-accent-)] mb-4 line-clamp-1 group-hover:text-[var(--color-primary-)] transition-colors">
          {recipe.Title}
        </h3>

        <div className="flex items-center justify-between">
          {/* Ingredient Count */}
          <div className="flex items-center text-[var(--color-secondary-)] text-[10px] font-black uppercase tracking-widest">
            <ChefHat className="w-3.5 h-3.5 mr-2 text-[var(--color-primary-)]" />
            {ingredientCount} Ingredients
          </div>

          {/* Hover Effect Text */}
          <div className="flex items-center gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary-)]">
              Recipe
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-primary-)]" />
          </div>
        </div>
      </div>
    </Link>
  );
}