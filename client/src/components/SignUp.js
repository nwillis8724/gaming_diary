import React, { useState } from "react";

function SignUp({ inSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

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
            setErrors(data.errors.join(", "));
            
            setTimeout(() => {
              setErrors("");
            }, 3000);
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
        ></input>
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        ></input>
        <p className="disclosure">please include a special character and capital in the password</p>
        <button>Submit</button>
      {errors && <p className="error">{errors}</p>}
      </form>
    </div>
  );
}

export default SignUp;