import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MealDbApi from "../../api/MealDbApi";
import UserContext from "../auth/UserContext";
import "./RecipeCard.css";

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

  const instructionSteps = instructions ? instructions.split(/\.\s+/) : [];

  return (
    <div className="RecipeCard-card">
      <Link to={`/recipes/${id}`}>
        <h2>{name}</h2>
      </Link>
      <div className="card-body">
        <ol>
          {category && <li>{category}</li>}
          {area && <li>{area}</li>}
          {tags && <li>{tags}</li>}
          {thumbnail && <img src={thumbnail} alt={name} className="card-img" />}
          {instructionSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <button onClick={handleToggleFavorite}>
          {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
