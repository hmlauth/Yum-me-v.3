import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import LoginBtn from "../components/Buttons";
import Input from "../components/Form";


class Login extends Component {
  state = {
      name: ""
  }

  componentDidMount() {
    console.log("Page mounted");
  }

    // handleInputChange
    handleInputChange = event => {
      // Pull the name and value properties off of the event.target (the element which triggered the event)
      const { value } = event.target;
  
      // Set the state for the appropriate input field
      this.setState({
        name: value
      });
    }
  
handleClick(userData) {
    console.log("Click handled", userData)
    API.createUser(userData)
    .then(res => {
      console.log("handle click res", res);
      this.setState({ name: ""})

    })
    .catch(err => console.log(err));
}

  render() {
    return (
        <div>
      <Container fluid>
        <span>Yum(me)</span>
        <hr></hr>
        <span>{this.state.name}</span>
        <Input
            type="text"
            required="true"
            placeholder="Name"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
        <LoginBtn onClick={ () => this.handleClick(this.state.name)}/>
      </Container>
      </div>
    );
  }
}

export default Login;
