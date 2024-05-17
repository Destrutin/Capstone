import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealDbApi from "../../api/MealDbApi";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    async function fetchMealDetails() {
      try {
        let mealDetailsData = await MealDbApi.getMealById(id);
        setMealDetails(mealDetailsData.meals[0]);
      } catch (err) {
        console.error("Error fetching meal details:", err);
      }
    }

    fetchMealDetails();
  }, [id]);

  if (!mealDetails) {
    return <div>Loading...</div>;
  }

  const instructions = mealDetails.strInstructions.split(".");

  return (
    <div className="recipe-details">
      <h2>{mealDetails.strMeal}</h2>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction.trim()}</li>
        ))}
      </ol>
      <a href={mealDetails.strYoutube}>Tutorial Video</a>
    </div>
  );
}

export default RecipeDetails;
