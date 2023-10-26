import React from "react"
import { NavLink, useLocation } from "react-router-dom";

function NavBar({setUser, user}){

  const location = useLocation();
  const isSignUpPage = location.pathname === "/sign_up";

  const linkStyles = {
    display: "inline-block",
    padding: "10px 15px",
    textDecoration: "none",
    color: "black",
    background: "#e0e0e0",
    borderRadius: "5px",
    border: "1px solid black",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
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
         {user ? 

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

        !isSignUpPage && (
          <NavLink
            to="/sign_up"
            exact
            style={linkStyles}
          >
            Sign Up
          </NavLink>
        )

}
    </div>
  )

};

export default NavBar