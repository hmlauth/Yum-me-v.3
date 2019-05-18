import React, { Component } from "react";
import API from "../../utils/API";
import SavedCarousel from "./SavedCarousel";
// import Header from "../Header"
import "./style.css";

class Saved extends Component {

  render() {

    return (
      <div className="saved-carousel-container">
        <h2>
          Continue Developing!
        </h2>
        <SavedCarousel />
      </div>
    );

  }
}

export default Saved;
