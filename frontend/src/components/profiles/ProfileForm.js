import React, { useContext, useState } from "react";
import MealDbApi from "../../api/MealDbApi";
import UserContext from "../auth/UserContext";
import "./ProfileForm.css";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: currentUser.password,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });
  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await MealDbApi.saveChanges(username, profileData);
      setUpdateSuccessful(true);
    } catch (err) {
      console.error(err);
    }

    setFormData((data) => ({ ...data }));
    setCurrentUser(updatedUser);
  };

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div className="profile-card">
        <div className="profile-input">
          <label htmlFor="username">Username</label>
          <input id="username" value={formData.username} disabled />
        </div>

        <div className="profile-input">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="profile-input">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="profile-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {updateSuccessful && <p>Updated successfully.</p>}

        <button className="profile-submit" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
