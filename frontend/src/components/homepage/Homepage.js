import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home">
      <header>
        <h1>Welcome to Chef's Recipe Book!</h1>
        <p>Discover and share delicious recipes from around the world.</p>
      </header>
      <section className="homepage-section">
        {currentUser ? (
          <h2>Welcome Back, {currentUser.firstName}!</h2>
        ) : (
          <div className="homepage-buttons">
            <Link to="/login" className="homepage-button">
              Log in
            </Link>
            <Link to="/signup" className="homepage-button">
              Sign up
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Homepage;
