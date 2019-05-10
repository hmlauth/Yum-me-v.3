import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div id="heading">
        <h2>Yum(Me)</h2>
        {isAuthenticated() ? (
          <Link to="/profile"> View Profile </Link>
        ) : (
          <button type="button" class="btn btn-primary" onClick={login}>Join Now!</button>
        )}
      </div>
    );
  }
}

export default Home;
