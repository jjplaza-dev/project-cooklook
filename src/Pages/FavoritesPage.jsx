import React, { useState, useEffect, useMemo } from 'react';
import { useBatchRecipes } from '../assets/utils/recipeService';
import RecipeCard from '../Components/RecipeCard';
import { ChevronLeft, ChevronRight, Loader2, HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 1. Fetch IDs from LocalStorage on mount and listen for changes
  useEffect(() => {
    const loadFavorites = () => {
      const stored = JSON.parse(localStorage.getItem('cooklook_favorites') || '[]');
      setFavoriteIds(stored);
    };

    loadFavorites();

    // Listen for our custom event (dispatched from RecipeCard)
    window.addEventListener('favoritesUpdated', loadFavorites);
    return () => window.removeEventListener('favoritesUpdated', loadFavorites);
  }, []);

  // 2. Fetch the actual recipe data using the IDs
  const { data: recipes = [], isLoading, isError } = useBatchRecipes(favoriteIds);

  // 3. Pagination Logic
  const { currentRecipes, totalPages } = useMemo(() => {
    const total = Math.ceil(recipes.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    return {
      currentRecipes: recipes.slice(start, start + itemsPerPage),
      totalPages: total
    };
  }, [recipes, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && favoriteIds.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background-)]">
        <Loader2 className="w-12 h-12 text-[var(--color-primary-)] animate-spin mb-4" />
        <p className="text-xl font-black text-[var(--color-accent-)] tracking-tight">
          Loading your favorites...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-)]">
        <p className="text-[var(--color-accent-)] font-bold">Failed to load favorites.</p>
      </div>
    );
  }

  return (
    <main className="pt-10 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col bg-[var(--color-background-)]">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-[var(--color-accent-)] mb-3 tracking-tighter">
          Your <span className="text-[var(--color-primary-)]">Favorites</span>
        </h1>
        <p className="text-[var(--color-secondary-)] font-medium text-lg">
          You have saved {favoriteIds.length} recipes
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[var(--color-secondary-)]/10 max-w-md flex flex-col items-center">
            <HeartCrack className="w-16 h-16 text-[var(--color-secondary-)]/30 mb-6" />
            <p className="text-2xl font-black text-[var(--color-accent-)] mb-2">No favorites yet!</p>
            <p className="text-[var(--color-secondary-)] mb-8">Start exploring and heart the recipes you want to keep.</p>
            <Link 
              to="/" 
              className="px-8 py-4 bg-[var(--color-primary-)] text-white font-bold rounded-2xl hover:scale-105 transition-transform"
            >
              Discover Recipes
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Responsive Grid: 1, 2, 3, 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 flex-grow content-start">
            {currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
             <div className="flex items-center justify-center gap-4 py-8 mt-auto">
             <button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="w-12 h-12 flex items-center justify-center rounded-2xl border border-[var(--color-secondary-)]/20 text-[var(--color-accent-)] hover:bg-[var(--color-primary-)] hover:text-white hover:border-[var(--color-primary-)] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90"
             >
               <ChevronLeft className="w-6 h-6" />
             </button>
             
             <div className="flex items-center bg-white px-6 h-12 rounded-2xl border border-[var(--color-secondary-)]/10 shadow-sm gap-3">
               <span className="text-sm font-bold text-[var(--color-secondary-)]">Page</span>
               <span className="text-sm font-black text-[var(--color-primary-)]">{currentPage}</span>
               <span className="text-sm font-bold text-[var(--color-secondary-)]">of {totalPages}</span>
             </div>

             <button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="w-12 h-12 flex items-center justify-center rounded-2xl border border-[var(--color-secondary-)]/20 text-[var(--color-accent-)] hover:bg-[var(--color-primary-)] hover:text-white hover:border-[var(--color-primary-)] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90"
             >
               <ChevronRight className="w-6 h-6" />
             </button>
           </div>
          )}
        </>
      )}
    </main>
  );
}