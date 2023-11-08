import React, { useState } from "react";

function SignUp({ inSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSignUp(e) {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          response.json().then((data) => {
            setErrors(data.errors);
            
            setTimeout(() => {
              setErrors([]);
            }, 5000);
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSignUp} className="signup_form">
        <h2>Sign Up</h2>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <p className="disclosure">please include a special character and capital in the password</p>
        <button>Submit</button>
        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, index) => (
              <p key={index} className="error">{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;
