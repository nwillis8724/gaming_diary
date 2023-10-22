import React from "react"
import { NavLink } from "react-router-dom";

function NavBar({setUser, user}){

  const linkStyles = {
    display: "inline-block",
    width: "5%",
    height: "1%",
    padding: ".75%",
    background: "black",
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
  };

  function handleLogout(){
    fetch('/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(r => {
          if (r.ok) {
            setUser()
            console.log('Logout successful');
          } else {
            console.error('Logout failed');
          }
        })
        .catch(error => {
          console.error('An error occurred during the logout process:', error);
        });
    };
  


  return (
    <div id="navbar">
         {user? 

         <div>

          
         <NavLink 
         style={linkStyles}
         onClick={handleLogout} 
         >
             Profile
         </NavLink>

         <NavLink 
         style={linkStyles}
         onClick={handleLogout} 
         >
             Logout
         </NavLink>

         </div>

        :

        <NavLink
        to="/sign_up"
        exact
        style={linkStyles}
        >
           Sign Up
        </NavLink>

}
    </div>
  )

};

export default NavBar