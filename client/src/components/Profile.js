import React from "react";
import { useState, useEffect } from "react";

function Profile({ user }) {
  const legibleDate = new Date(user.created_at).toLocaleDateString();
  return (
    <div className="profile_container">
      <h1 className="profile_heading">{user.username}'s Profile</h1>
      <h2 className="profile_subheading">Created on {legibleDate}</h2>
        <div>
            <form className="username_form">
            <p>Change Username</p>
            <input placeholder="New Username..."></input>
            <button>Submit</button>
            </form>
        </div>
        <div>
            <form className="password_form">
            <p>Change Password</p>
            <input placeholder="Current Password..."></input>
            <input placeholder="New Password..."></input>
            <button>Submit</button>
            </form>
        </div>
    </div>
  );
}

export default Profile;