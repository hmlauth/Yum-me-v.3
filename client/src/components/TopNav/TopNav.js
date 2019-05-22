import React, { Component } from "react";
import "./TopNav.scss";
import API from "../../utils/API";
import { Button, Modal } from 'semantic-ui-react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

export default class Navigation extends Component {

    state = { open: false }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
      }
    
      close = () => this.setState({ open: false })

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }

    componentDidMount() {
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

    logout() {
        API.logout().then((data)=> {
            window.location.pathname = "/"
        }).catch((err)=> {
            console.log(err)
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    
    render() {
        const { open, closeOnDimmerClick } = this.state
        return (
            <div>
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand href="/" className="titleFont">
                    <img src="http://yum.me/images/logo.png" alt="logo"></img> </NavbarBrand>
                    <a
                    className="nav-link" href="#work" >
                    How it works
                    </a>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i class="fas fa-home light-text"></i></NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className="fas fa-user light-text"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.loggedIn ? (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/profile">Profile</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink href="/landing">Landing</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink href="/develop">Develop</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink onClick={this.closeConfigShow(true, false)}>Logout</NavLink>
                                                <Modal id="modal"
                                                    open={open}
                                                    closeOnDimmerClick={closeOnDimmerClick}
                                                    onClose={this.close}
                                                    >
                                                    <Modal.Header>Log Out</Modal.Header>
                                                    <Modal.Content>
                                                        <p>Are you sure you want to log out?</p>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button onClick={this.close} negative>
                                                        No
                                                        </Button>
                                                        <Button
                                                        onClick={this.logout}
                                                        positive
                                                        labelPosition='right'
                                                        icon='checkmark'
                                                        content='Yes'
                                                        />
                                                    </Modal.Actions>
                                                </Modal>
                                            </DropdownItem>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/login">Login</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink href="/signup">Sign Up</NavLink>
                                            </DropdownItem>
                                        </>
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}