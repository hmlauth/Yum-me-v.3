import React, { Component } from "react";
import API from "../../utils/API";
import CarouselCard from "../Card/CarouselCard";
import Container from "../Container"
import "./style.css"


class SavedCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialIndex: 0,
            recipes: [],
            recipe: [],
            currIndex: 0
        }
    }

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
                    recipes: res.data,
                    recipe: res.data[0],
                    currIndex: 0
                })
            }
            )
            .catch(err => console.log("ERR", err));
    };

    nextRecipe = () => {
        const newIndex = this.state.currIndex + 1
        this.setState({
            recipe: this.state.recipes[newIndex],
            currIndex: newIndex
        })
    }

    prevRecipe = () => {
        const newIndex = this.state.currIndex - 1;
        this.setState({
            recipe: this.state.recipes[newIndex],
            currIndex: newIndex
        })
    }

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
        const { initialIndex, recipes, recipe, currIndex } = this.state;
        return (
                 <div className="carousel-saved">
                <button
                    onClick={() => this.prevRecipe()}
                    disabled={currIndex === initialIndex}>
                    Prev
                </button>
                <button
                    onClick={() => this.nextRecipe()}
                    disabled={currIndex === recipes.length - 1}>
                    Next
                </button>

                <div className="page">
                    <div className={`cards-slider active-slide-${recipe.id}`}>
                        <div className="cards-slider-wrapper" style={{ transform: `translateX(-${currIndex * (100 / recipes.length)}%)` }}>
                            {
                                recipes.map(recipe => <CarouselCard key={recipe._id} recipe={recipe} />)
                            }

                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default SavedCarousel;