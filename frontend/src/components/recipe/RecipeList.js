import React, { useEffect, useState, useContext } from "react";
import SearchBar from "../searchbar/SearchBar";
import MealDbApi from "../../api/MealDbApi";
import RecipeCard from "./RecipeCard";
import UserContext from "../auth/UserContext";
import "./RecipeList.css";

function RecipeList() {
  const [meals, setMeals] = useState(null);
  const [favoritesMap, setFavoritesMap] = useState({});
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const mealsData = await MealDbApi.getMeals();
        setMeals(mealsData.meals);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      if (!meals) return;

      const userId = await MealDbApi.getUserId(currentUser.username);
      const favorites = await Promise.all(
        meals.map((m) => MealDbApi.getFavoriteStatus(m.idMeal, userId))
      );
      const favoritesObj = {};
      favorites.forEach((favorite, index) => {
        favoritesObj[meals[index].idMeal] = favorite.isFavorite;
      });
      setFavoritesMap(favoritesObj);
    }

    fetchFavorites();
  }, [meals, currentUser]);

  async function search(result) {
    setMeals(result.meals);
  }

  return (
    <div className="RecipeList">
      <h2>Recipes</h2>
      <SearchBar search={search} />
      <div>
        {meals &&
          meals.map((m) => (
            <RecipeCard
              key={m.idMeal}
              id={m.idMeal}
              name={m.strMeal}
              category={m.strCategory}
              area={m.strArea}
              tags={m.strTags}
              thumbnail={m.strMealThumb}
              isFavorite={favoritesMap[m.idMeal]}
              isFavoriteOnPage={false}
            />
          ))}
      </div>
    </div>
  );
}

export default RecipeList;
