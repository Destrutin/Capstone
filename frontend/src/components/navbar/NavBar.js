import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  const loggedOut = () => {
    return (
      <div className="NavBar">
        <NavLink className="nav-login" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-signup" to="/signup">
          Sign Up
        </NavLink>
      </div>
    );
  };

  const loggedIn = () => {
    return (
      <div className="NavBar">
        <NavLink className="nav-home" to="/">
          Home
        </NavLink>
        <NavLink className="nav-recipes" to="/recipes">
          Recipes
        </NavLink>
        <NavLink className="nav-favorites" to="/favorites">
          Favorites
        </NavLink>
        <NavLink className="nav-profile" to="/profile">
          Profile
        </NavLink>
        <NavLink className="nav-logout" to="/" onClick={logout}>
          Log out {currentUser.username}
        </NavLink>
      </div>
    );
  };

  return (
    <nav className="NavBar">
      <NavLink to="/" className="NavBar-brand">
        Chef's Recipe Book
      </NavLink>
      {currentUser ? loggedIn() : loggedOut()}
    </nav>
  );
}

export default NavBar;
