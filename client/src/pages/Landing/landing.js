import React, { Component } from "react";
import Saved from "../../components/SavedRecipes/Saved";
import Search from "../../components/FeaturedRecipes/Search";
import Youtube from "../../components/Youtube";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API"
import "./landing.scss";
import loading from '../../assets/images/loading.gif';


class Landing extends Component {

    state = {
        loggedIn: false,
        user: null,
        loading: true
    }

    componentDidMount() {

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });

        console.log(this.props)
    }

    loading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }

    render() {
        return (
            <div className="landingPage">
                {this.state.loggedIn ? (
                     <div>
                        <Saved />
                        <Search />
                        <Youtube />
                    </div>
                    
                ) : (
                        <div className="noUser">
                            {!this.state.loading ? (
                                <>
                                    <h1>Please log in.</h1>
                                    <Link className="loginLink" to="/login">
                                    <Button className="loginBtn" color="info" block>Login</Button>
                                    </Link>
                               <br></br>
                                </>
                            ) : (

                                <img src={loading} className="loadingIcon" alt="loading"></img>

                                )}
                        </div>
                    )}
            </div>
        )
    }

}

export default Landing;