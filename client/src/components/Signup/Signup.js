import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Header, Icon, Modal } from 'semantic-ui-react'
import "./style.css";

class Signup extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })
    
    state = {
        validUsername: false,
        validPassword: false,
        confirmPassword: false
    }
    
    componentDidUpdate() {
        this.validatePassword();
        this.confirmPassword();
        this.validateUsername();
    }

    validateUsername() {
        if (this.props.username.length > 1 && !this.state.validUsername) {
            this.setState({
                validUsername: true
            });
        }
        if (this.props.username.length < 1 && this.state.validUsername) {
            this.setState({
                validUsername: false
            });
        }
    }

    validatePassword() {
        let strongPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
        let valid = strongPassword.test(this.props.password);
        if (!this.state.validPassword && valid) {
            this.setState({
                validPassword: true
            });
        }
        if (this.state.validPassword && !valid) {
            this.setState({
                validPassword: false,
            });
        }
    }

    confirmPassword() {
        if (this.props.password === this.props.confirmPassword && !this.state.confirmPassword && this.props.password) {
            this.setState({
                confirmPassword: true
            });
        }
        if (this.props.password !== this.props.confirmPassword && this.state.confirmPassword) {
            this.setState({
                confirmPassword: false
            });
        }
    }

    render() {
        return (
            <div>
                <h2 className="loginTitle title-font">Sign Up</h2>
                <hr />
                {this.props.message?(
                    <Alert className="animated fadeIn" color="danger">{this.props.message}</Alert>
                ): (<></>)}
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" value={this.props.password} onChange={this.props.handleInputChange} valid={this.state.validPassword} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                        <FormText>At least 8 characters, including 1 capital & 1 number.</FormText>
                    </FormGroup>
                    {/* if all fields are valid, allow the user to submit the form */}
                    {(this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                        <Modal id="modalSignUp"
                            trigger={<Button onClick={this.props.handleOpen} onClick={this.props.handleSignup} color="success" block>Signup</Button>}
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            basic
                            size='small'
                        >
                            <Header icon='food' content='Welcome to Yum(Me)' />
                            <Modal.Content>
                            <h3>Thank you for signing up!</h3>
                            </Modal.Content>
                            <Modal.Actions>
                            {/* <Button color='green' onClick={this.handleClose} inverted>
                                <Icon name='checkmark' /> Let's go!
                            </Button> */}
                            </Modal.Actions>
                      </Modal>
                    ) : (
                        <Button onClick={this.props.handleSignup} color="danger" block disabled>Signup</Button>
                    )}
                    <p className="signupLink">
                        <Link to="/login">Already have an account? Sign in here.</Link>
                    </p>
                </Form>
            </div>
        );
    }
}

export default Signup;