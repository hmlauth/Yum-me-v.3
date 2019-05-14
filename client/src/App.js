import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
// import Develop from "./pages/Develop";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from "./Auth/Auth";
import Callback from "./Callback";
// import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            render={props =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
          path="/landing"
          render={props =>
            this.auth.isAuthenticated() ? (
              <Landing auth={this.auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
         {/* <Route
          path="/develop"
          render={props =>
            this.auth.isAuthenticated() ? (
              <Develop auth={this.auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        /> */}
        </div>
      </>
    );
  }
}

export default App;
