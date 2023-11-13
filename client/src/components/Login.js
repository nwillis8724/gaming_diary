import React, { useState } from "react";


function Login({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);


    function loginUser(e) {
        e.preventDefault();
    
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
        .then((r) => {
            if (r.status === 401) {
              r.json().then((data) => {
                setErrors([data.error]);

                setTimeout(() => {
                  setErrors("");
                }, 5000);
              });
            } else if (!r.ok) {
              setErrors(["An error occurred."]);
            } else {
              r.json().then((response) => {
                onLogin(response);
                console.log("Login successful");
              });
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }

    return (
        <div className="login_container">
            <div className="login_card">
                <form onSubmit={loginUser}>
                    <h2>Log In</h2>
                    <input className="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user"></input>
                    <input className="password" value ={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"></input>
                    <button>Login</button>
                </form>
                {errors.length > 0 && (
                        <div className="error">
                            {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Login