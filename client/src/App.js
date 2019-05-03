import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages";
console.log(Login)

const App = () => (
  
  <div>
    <Nav />
    <Login />
    {/* <Switch>
      <Route exact path="/" component={Books} />
      <Route exact path="/books" component={Books} />
      <Route exact path="/books/:id" component={Detail} />
      <Route component={NoMatch} />
    </Switch> */}
  </div>

);

export default App;