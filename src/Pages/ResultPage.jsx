import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Filter } from "lucide-react";
import { useSearchRecipes } from "../assets/utils/recipeService"; 
import RecipeCard from "../Components/RecipeCard";

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("ingredients") || "";
  
  useEffect(() => window.scrollTo(0, 0), []);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { 
    data: recipes = [], 
    isLoading, 
    isError 
  } = useSearchRecipes({ 
    ingredients: query 
  });

  // Memoize pagination to prevent unnecessary re-calculations
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background-)]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-[var(--color-primary-)] animate-spin mb-4" />
          <div className="absolute inset-0 blur-xl bg-[var(--color-primary-)]/20 animate-pulse" />
        </div>
        <p className="text-xl font-black text-[var(--color-accent-)] tracking-tight">
          Sourcing the freshest results...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-)]">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-red-100">
          <p className="text-[var(--color-accent-)] font-bold">Something went wrong while fetching recipes.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-[var(--color-primary-)] font-bold underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-10 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col bg-[var(--color-background-)]">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--color-accent-)] mb-3 tracking-tighter">
            Results for <span className="text-[var(--color-primary-)]">"{query}"</span>
          </h1>
          <p className="text-[var(--color-secondary-)] font-medium text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Found {recipes.length} curated recipes
          </p>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[var(--color-secondary-)]/10 max-w-md">
            <p className="text-2xl font-black text-[var(--color-accent-)] mb-2">Pantry's a bit empty!</p>
            <p className="text-[var(--color-secondary-)]">We couldn't find matches for "{query}". Try using broader terms like "chicken" or "pasta".</p>
          </div>
        </div>
      ) : (
        <>
          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 flex-grow content-start">
            {currentRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                // We pass the user query down so the card can highlight matched ingredients
                searchQuery={query} 
              />
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