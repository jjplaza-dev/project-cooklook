import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

/**
 * Robustly parses a Python-style list string: ["item 1", "item 2"] 
 * or ['1½" item', 'other item'].
 */
const parseIngredientList = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str;

  let cleaned = str.trim();
  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    cleaned = cleaned.slice(1, -1);
  }

  return cleaned
    .split(/',(?:\s+)?'|",(?:\s+)?"/) 
    .map(item => {
      return item.replace(/^['"]|['"]$/g, '').trim();
    })
    .filter(item => item !== "");
};

// Helper to attach parsed arrays to recipe objects
const transformRecipe = (recipe) => {
  if (!recipe) return null;
  return {
    ...recipe,
    parsedIngredients: parseIngredientList(recipe.Ingredients),
    parsedCleaned: parseIngredientList(recipe.Cleaned_Ingredients)
  };
};

export function useSearchRecipes(params) {
  return useQuery({
    queryKey: ["recipes", "search", params],
    queryFn: async () => {
      let query = supabase.from("recipes").select("*");

      if (params?.ingredients) {
        const ingredientList = params.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        if (ingredientList.length > 0) {
          const filterString = ingredientList
            .map((ing) => `Cleaned_Ingredients.ilike.%${ing}%`)
            .join(",");
          
          query = query.or(filterString);
        }
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      return data.map(transformRecipe);
    },
    placeholderData: (previousData) => previousData,
  });
}

export function useRecipe(id) {
  return useQuery({
    queryKey: ["recipes", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw new Error(error.message);
      }
      
      // Normalize single recipe
      return transformRecipe(data);
    },
    enabled: !!id,
  });
}

export function useBatchRecipes(ids) {
  return useQuery({
    queryKey: ["recipes", "batch", ids],
    queryFn: async () => {
      if (!ids || ids.length === 0) return [];

      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .in("id", ids);

      if (error) throw new Error(error.message);
      
      // Normalize array of recipes
      return data.map(transformRecipe);
    },
    enabled: Array.isArray(ids) && ids.length > 0,
  });
}