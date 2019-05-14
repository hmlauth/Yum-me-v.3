import React, { Component } from "react";
import API from "../../utils/API";
import SavedCarousel from "../Carousel/SavedCarousel"
// import { DeleteBtn, VersionBtn } from "../../components/Buttons";
import "./style.css";

class Saved extends Component {

    // state
    state = {
      recipes: [],
      showItems: 3
    };

  // componentDidMount
  componentDidMount() {
    console.log("SaveRecipes component mounted");
    this.loadSavedRecipes();
  };

  loadSavedRecipes = () => {
    console.log("...loading saved recipes")
    API.getSavedRecipes()
    .then(res => {
        console.log("Recipe Saved!", res.data)
        this.setState({ 
          recipes: res.data
        })
      }
    )
    .catch(err => console.log("ERR", err));
  };

  // viewAllVersions = id => {
  //   console.log("Getting all versions and notes");
  // }

  // deleteRecipe = id => {
  //   console.log("...deleting recipe", id);
  //     API.deleteRecipe(id)
  //       .then(res => this.loadSavedRecipes())
  //       .catch(err => console.log(err));
  //   }
    
  render() {

    return (
      <div className="saved-carousel-container">
          <SavedCarousel />
      </div>
    );

  }
}

export default Saved;
