import React, { Component } from "react";
import API from "../../utils/API";

class Develop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipe: []
        }
    }

    componentDidMount() {
        const { id } = this.props.location.state
        console.log(id)
        API.getVersions(id)
        .then(res => {
            console.log("getVersions", res)
        })
    }

    render() {
        // const { id } = this.props.location.state
        return (
            <h1>Develop Page!</h1>
        )}

}

export default Develop;