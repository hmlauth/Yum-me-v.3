import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import API from "../../utils/API";
import chef from '../../assets/images/chef.png';
import "./Home.scss";

class Home extends Component {

  state = {
    loggedIn: false,
  };

  componentDidMount() {
    this.loggedIn();
  }


  loggedIn = () => {
    API.isLoggedIn().then(user => {
      if (user.data.loggedIn) {
        this.setState({
          loggedIn: true
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="homeBox">
      <h1 id="userTitle"> <img src="http://yum.me/images/logo.png" alt="logo"></img></h1>
        <div className="spriteBox">
          <img src={chef} className="sprite-bounce" alt="chef"></img>
        </div>
        <h2 id="homeAccount">Make it your own!</h2>
        {this.state.loggedIn ? (

          <Button color="danger" className="cookBtn" block size= "lg"><a href="/landing" style={{color: "white"}}>Let's start cooking!</a></Button>
        ) : (<></>)}
        <br></br>
      </div>
    );
  }
}

export default Home;