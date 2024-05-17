import React, { useEffect, useState, useContext } from "react";
import MealDbApi from "../../api/MealDbApi";
import RecipeCard from "../recipe/RecipeCard";
import UserContext from "../auth/UserContext";
import "./FavoritesPage.css";

function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchFavoriteRecipes() {
      const userId = await MealDbApi.getUserId(currentUser.username);
      try {
        const response = await MealDbApi.getFavoriteRecipes(userId);
        setFavoriteRecipes(response.recipes);
      } catch (err) {
        console.error("Error fetching favorite recipes:", err);
      }
    }

    fetchFavoriteRecipes();
  }, [currentUser.username]);

  async function removeFromFavorites(recipeId) {
    try {
      const userId = await MealDbApi.getUserId(currentUser.username);
      await MealDbApi.removeFromFavorites(recipeId, userId);
      setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      alert("Recipe removed from favorites");
    } catch (err) {
      console.error("Error removing recipe from favorites:", err);
      alert("Failed to remove recipe from favorites");
    }
  }

  return (
    <div className="favorites-page">
      <h1>Favorite Recipes</h1>
      <div className="favorite-recipes">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.title}
            category={recipe.category}
            instructions={recipe.instructions}
            isFavorite={true}
            isOnFavoritesPage={true}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
