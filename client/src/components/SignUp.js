import { useState } from "react"

function SignUp({inSignUp}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function handleSignUp(e) {
        e.preventDefault()

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
                console.log("Signup failed. Please try again.");
            }
        })
        .catch((error) => {
            console.error("An error occurred:", error);
        });
    }
    
    return (
        <form onSubmit={handleSignUp} className="signup_form">
            <h2>Sign Up</h2>
            <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input placeholder="password" value ={password} onChange={(e) => setPassword(e.target.value)} type="password"></input>
            <button>Submit</button>
        </form>
    )
}

export default SignUp