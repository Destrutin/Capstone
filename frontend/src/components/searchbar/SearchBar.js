// SearchBar.js
import React, { useState } from "react";
import MealDbApi from "../../api/MealDbApi";
import "./SearchBar.css";

function SearchBar({ search }) {
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;
      if (filterType === "name") {
        result = await MealDbApi.searchMealsByName(filterValue);
      } else if (filterType === "category") {
        result = await MealDbApi.filterMealsByCategory(filterValue);
      } else if (filterType === "area") {
        result = await MealDbApi.filterMealsByArea(filterValue);
      } else if (filterType === "ingredient") {
        result = await MealDbApi.filterMealsByIngredient(filterValue);
      }

      if (!result || !result.meals || result.meals.length === 0) {
        setError("No results found.");
      } else {
        setError(null);
        search(result);
      }
    } catch (err) {
      console.error("Error searching meals:", err);
      setError("Error occurred while searching meals.");
    }
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <form className="SearchBar">
      <select value={filterType} onChange={handleFilterChange}>
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="area">Area</option>
        <option value="ingredient">Ingredient</option>
      </select>
      <input
        type="text"
        value={filterValue}
        onChange={handleFilterValueChange}
        placeholder={`Search by ${filterType}`}
      />
      <button onClick={handleSubmit}>Search</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default SearchBar;
