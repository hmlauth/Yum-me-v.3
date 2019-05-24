import React, { Component } from "react";
import SavedCarousel from "./SavedCarousel";
import "./style.scss";

class Saved extends Component {

  render() {

    return (
      <div className="saved-carousel-container">
        <h2 id='titleHeader'>
          Continue Developing!
        </h2>
        <SavedCarousel />
      </div>
    );

  }
}

export default Saved;
