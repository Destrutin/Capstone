import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealDbApi from "../../api/MealDbApi";

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

  return (
    <div className="RecipeDetails">
      <h2>{mealDetails.strMeal}</h2>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <p>{mealDetails.strInstructions}</p>
      <a href={mealDetails.strYoutube}>Tutorial Video</a>
    </div>
  );
}

export default RecipeDetails;
