import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp({inSignUp}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // onSubmit post to /SignUp
    // navigate back to login


    function handleSignUp(e) {
        e.preventDefault()
        console.log("hello")

        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        
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