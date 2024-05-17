import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import FavoritesPage from "../components/favorites/FavoritesPage";
import LoginForm from "../components/auth/LoginForm";
import ProfileForm from "../components/profiles/ProfileForm";
import SignupForm from "../components/auth/SignupForm";
import RecipeList from "../components/recipe/RecipeList";
import RecipeDetails from "../components/recipe/RecipeDetails";
import UserContext from "../components/auth/UserContext";

function AppRouter({ signup, login }) {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {!currentUser && (
        <>
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
        </>
      )}

      {currentUser && (
        <>
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
