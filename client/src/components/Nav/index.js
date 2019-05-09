import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";


class Nav extends Component {
    render() {
      const { isAuthenticated, logout, login } = this.props.auth;
  
      return (
        <nav>
          <ul>
            <li>
            <Link to="/"><img src="http://yum.me/images/logo.png" alt="logo"></img></Link>
            </li>

            <li className="navButton"  class="btn btn-primary btn-sm">
            <Link to="/profile">Profile</Link>
            </li>
            <li className="navButton" class="btn btn-primary btn-sm">
            <Link to="/landing">Landing</Link>
            </li>
            
            <div id="loginButton">
              <button type="button" class="btn btn-primary" onClick={isAuthenticated() ? logout : login}>
                {isAuthenticated() ? "Log out" : "Log In"} 
              </button>
            </div>
          
          </ul>
        </nav>
      );
    }
  }
  
  export default Nav;