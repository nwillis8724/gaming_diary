import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 


function Login({ setUser, user }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()


    function loginUser (e){
        e.preventDefault()
            fetch("/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
            .then((r) => {
                if (r.status === 401) {
                    setErrors("Authentication failed");
                } else if (!r.ok) {
                    setErrors("An error occurred.");
                } else {
                    r.json().then((response) => {
                        setUser(response);
                        console.log("Login successful");
                    });
                }
            })
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <h2>Welcome</h2>
                <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user"></input>
                <input id="password" value ={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"></input>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login