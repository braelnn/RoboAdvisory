import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProfileServices from "../Services/profileService";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    financialGoals: "",
    riskTolerance: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    ProfileServices.getProfile()
      .then((response) => {
        setProfile(response);
        setUpdatedProfile(response);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    ProfileServices.updateProfile(updatedProfile)
      .then(() => {
        alert("Profile edited successfully!");

        // Send investment guidance email
        ProfileServices.sendInvestmentEmail(updatedProfile)
          .then(() => {
            console.log("Investment email sent successfully!");
            navigate("/home"); // ✅ Redirect after successful update
          })
          .catch((error) => {
            console.error("Error sending investment email:", error);
          });

      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChangePassword = () => setIsChangingPassword(true);
  const handleCancelChangePassword = () => setIsChangingPassword(false);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitPasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    ProfileServices.changePassword(passwordData)
      .then(() => {
        alert("Password changed successfully!");
        navigate("/home"); // ✅ Redirect after successful password change
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error changing password.");
      });
  };
  

  return (
    <div className="profile">
      <Header />
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-card">
          <div className="profile-info">
            <label>Full Name:</label>
            <p>{profile.fullname}</p> {/* ✅ Fullname is autofilled and CANNOT be edited */}
          </div>

          <div className="profile-info">
            <label>Email:</label>
            <p>{profile.email}</p>
          </div>

          <div className="profile-info">
            <label>Financial Goals:</label>
            {isEditing ? (
              <select name="financialGoals" value={updatedProfile.financialGoals} onChange={handleChange}>
                <option value="">Select a Financial Goal</option>
                {["Retirement Savings", "Buying a House", "Starting a Business", "Children's Education", "Emergency Fund"]
                  .map((goal, index) => (
                    <option key={index} value={goal}>{goal}</option>
                  ))}
              </select>
            ) : (
              <p>{profile.financialGoals}</p>
            )}
          </div>

          <div className="profile-info">
            <label>Risk Tolerance:</label>
            {isEditing ? (
              <select name="riskTolerance" value={updatedProfile.riskTolerance} onChange={handleChange}>
                <option value="">Select Risk Tolerance</option>
                {["Very Low", "Low", "Moderate", "High", "Very High", "Ultra High", "Elite Investor"].map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            ) : (
              <p>{profile.riskTolerance}</p>
            )}
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={handleEditClick}>
                Edit
              </button>
            )}
            <button className="change-password-btn" onClick={handleChangePassword}>
              Change Password
            </button>
          </div>
        </div>

        {isChangingPassword && (
          <div className="password-change-container">
            <h3>Change Password</h3>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              onChange={handlePasswordChange}
            />
            <button className="save-btn" onClick={handleSubmitPasswordChange}>
              Save Password
            </button>
            <button className="cancel-btn" onClick={handleCancelChangePassword}>
              Cancel
            </button>
          </div>
        )}
      </div>
      </div>
  );
};

export default ProfilePage;
