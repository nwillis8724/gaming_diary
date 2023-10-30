import React from "react";
import { useState, useEffect } from "react";
import bcrypt from 'bcryptjs'; 

function Profile({ user }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const legibleDate = new Date(user.created_at).toLocaleDateString();

  

  function handlePasswordChange(e) {
    e.preventDefault();
  
    bcrypt.compare(currentPassword, user.password_digest, (err, result) => {
      if (err) {
        console.error("An error occurred:", err);
      } else if (result) {
        console.log("Password is correct");
        const newPasswordData = {
          password: newPassword,
        };
    
        fetch(`/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPasswordData),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Password changed successfully.");
            } else {
              console.log("Password change failed. Please try again.");
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });

      } else {
        console.log("Wrong password");
      }
    });
  }

  return (
    <div className="profile_container">
      <h1 className="profile_heading">{user.username}'s Profile</h1>
      <h2 className="profile_subheading">Created on {legibleDate}</h2>
        <div>
            <form className="password_form" onSubmit={(e) => handlePasswordChange(e)}>
            <p>Change Password</p>
            <input placeholder="Current Password..." type="password" value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)}></input>
            <input placeholder="New Password..." type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}></input>
            <button>Submit</button>
            </form>
        </div>
    </div>
  );
}

export default Profile;