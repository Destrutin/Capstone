import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserContext from "./components/auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/navbar/NavBar";
import MealDbApi from "./api/MealDbApi";
import "./App.css";

function App() {
  const [token, setToken] = useLocalStorage(null);
  const [currentUser, setCurrentUser] = useState(null);

  async function login(loginData) {
    try {
      let token = await MealDbApi.login(loginData);
      setToken(token);
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await MealDbApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          let currentUser = await MealDbApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error(err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [setCurrentUser, token]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <NavBar logout={logout} />
        <AppRouter signup={signup} login={login} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
