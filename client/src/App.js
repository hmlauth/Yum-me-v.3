import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/landing" component={Landing} />
        {/* <Route exact path="/books/:id" component={Detail} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
