import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div className="homepage">
        <div className="dark-overlay homepage-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="title mb-4">Yum(Me)</h1>
                <p className="lead">
                  {' '}
                  Make it your own!
                </p>
                <hr />

                {isAuthenticated() ? (
                  <Link to="/profile" class="btn btn-primary">View Profile </Link>
                  ) : (
                    <button type="button" class="btn btn-primary" onClick={login}>Join Now!</button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;


