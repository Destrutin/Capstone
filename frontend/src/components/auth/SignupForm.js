import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="SignupForm">
      <h1>Sign Up</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              autoComplete="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              autoComplete="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              autoComplete="email"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
