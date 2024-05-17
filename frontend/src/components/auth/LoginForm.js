import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="LoginForm">
      <h1>Login</h1>
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={formData.username}
              autoComplete="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              autoComplete="password"
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
