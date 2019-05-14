import React, { Component } from "react";
import Saved from "../Develop/index"
import Search from "../../components/FeaturedRecipes/Search";
import Youtube from "../Youtube/index"


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