import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Develop from "./pages/Develop";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import { Container } from 'reactstrap';
// import "./App.css";

function App() {
  return (
      <Router>
        <div>
          <TopNav />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/landing" component={Landing} />
              <Route exact path="/develop" component={Develop} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
  );
}

export default App;