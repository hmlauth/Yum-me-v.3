import React, { Component } from "react";
import API from "../../utils/API";
import SavedCarousel from "./SavedCarousel";
import Header from "../Header"
import "./style.css";

class Saved extends Component {

  render() {

    return (
      <div className="saved-carousel-container">
        <Header>
          Continue Developing!
        </Header>
        <SavedCarousel />
      </div>
    );

  }
}

export default Saved;
