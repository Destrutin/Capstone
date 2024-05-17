import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MealDbApi from "../../api/MealDbApi";
import UserContext from "../auth/UserContext";

function RecipeCard({
  id,
  name,
  category,
  instructions,
  area,
  tags,
  thumbnail,
  isFavorite,
}) {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setLoading(false);
    setFavorited(isFavorite);
  }, [isFavorite]);

  async function handleToggleFavorite() {
    try {
      const userId = await MealDbApi.getUserId(currentUser.username);
      let newFavoriteState;

      if (favorited) {
        await MealDbApi.removeFromFavorites(id, userId);
        newFavoriteState = false;
      } else {
        const recipeDetails = await MealDbApi.getMealById(id);
        const meal = recipeDetails.meals[0];
        await MealDbApi.addToFavorites(meal.idMeal, {
          userId: userId,
          title: meal.strMeal,
          category: meal.strCategory,
          instructions: meal.strInstructions,
        });
        newFavoriteState = true;
      }
      setFavorited(newFavoriteState);
      alert(
        newFavoriteState
          ? "Recipe added to favorites"
          : "Recipe removed from favorites"
      );
    } catch (err) {
      console.error("Error toggling favorite status:", err);
      alert("Failed to toggle favorite status");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link className="RecipeCard-card" to={`/recipes/${id}`}>
        <h2>{name}</h2>
      </Link>
      <div className="card-body">
        <ul>
          {category && <li>{category}</li>}
          {area && <li>{area}</li>}
          {tags && <li>{tags}</li>}
          {thumbnail && <img src={thumbnail} alt={name} className="card-img" />}
          {instructions && <li>{instructions}</li>}
        </ul>
        <button onClick={handleToggleFavorite}>
          {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </>
  );
}

export default RecipeCard;
