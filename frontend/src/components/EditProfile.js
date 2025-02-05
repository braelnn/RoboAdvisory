import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';
import Header from './Header';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    profilePicture: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch user profile data on page load
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('http://localhost:5000/api/profile'); // Replace with your API endpoint
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfile({ ...profile, profilePicture: file });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('password', profile.password);
      formData.append('bio', profile.bio);
      if (profile.profilePicture) {
        formData.append('profilePicture', profile.profilePicture);
      }

      await axios.put('http://localhost:5000/api/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className='profile'>
        <Header />
        <div className="edit-profile">
        
        <h2>Edit Profile</h2>
        {message && <p className="message">{message}</p>}
        
        <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="profile-picture-container">
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewImage || profile.profilePicture ? (
                <img src={previewImage || profile.profilePicture} alt="Profile" className="profile-preview" />
            ) : (
                <p>No profile picture uploaded</p>
            )}
            </div>

            {/* Name */}
            <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} required />
            </div>

            {/* Password */}
            <div className="form-group">
            <label>New Password:</label>
            <input type="password" name="password" value={profile.password} onChange={handleChange} />
            </div>

            {/* Bio */}
            <div className="form-group">
            <label>Bio:</label>
            <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit">Save Changes</button>
        </form>
        </div>
    </div>
  );
};

export default EditProfile;
