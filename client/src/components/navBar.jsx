import React from "react";
import {Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand navbar-light ">
      <Link className="navbar-brand" to="/">
       <h4> Hi {user ? user.user : "Guest"} </h4>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
              <NavLink className="nav-item nav-link" to="/games">
                My Games
              </NavLink>
              <NavLink className="nav-item nav-link" to="/invitations">
              Friend's Games
              </NavLink>
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/signup">
                Sign-up
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
