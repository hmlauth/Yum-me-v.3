import React, { Component } from "react";
import Saved from "../../components/SavedRecipes/Saved"
import Search from "../../components/FeaturedRecipes/Search";
import Youtube from "../../components/Youtube"



class Landing extends Component {

    render() {
        return (
            <div>
                <Saved />
                <Search />
                <Youtube />
            </div>
        )}

}

export default Landing;