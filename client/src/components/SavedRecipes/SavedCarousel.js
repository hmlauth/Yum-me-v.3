import React from "react";
import API from "../../utils/API";
import CarouselCard from "../Card/CarouselCard";
import "./style.scss"


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
        this.loadSavedRecipes();
    };

    loadSavedRecipes = () => {
        API.getSavedRecipes()
            .then(res => {
                console.log("Loading Saved Recipes", res.data)
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

    deleteRecipe = (_id) => {
        console.log("Inside deleteRecipe _id", _id);
        API.deleteRecipe(_id)
            .then(res => this.loadSavedRecipes())
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.recipes.length)

        const { initialIndex, recipes, recipe, currIndex } = this.state;

        return (
                 <div className="carousel-saved">
                 
                    <button type="button" class="btn btn-outline-success"
                        onClick={() => this.prevRecipe()}
                        disabled={currIndex === initialIndex}>
                        Prev
                    </button>

                    <button type="button" class="btn btn-outline-success"
                        onClick={() => this.nextRecipe()}
                        disabled={currIndex === recipes.length - 1}>
                        Next
                    </button>

                {recipes.length  ? (
                <div className="page">
                    <div className={`cards-slider active-slide-${recipe.id}`}>
                        <div className="cards-slider-wrapper" style={{ transform: `translateX(-${currIndex * (100 / recipes.length)}%)` }}>
                            {
                                recipes.map(r => <CarouselCard 
                                    key={r._id} 
                                    _id={r._id}
                                    id={r.id}
                                    recipe={r} 
                                    isActive={r.id === recipe.id}
                                    onClick={this.deleteRecipe} 
                                />)
                            }

                        </div>
                    </div>
                </div>
                ) : (
                    <p> You have no saved recipes! </p>
                )}
            </div>

        )
    }

}

export default SavedCarousel;