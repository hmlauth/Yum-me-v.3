import React from "react";
import API from "../../utils/API";
import SearchCard from "../Card/SearchCard";
import { Col, Row } from "../Grid";
import { Input, FormBtn } from "../Form";
import { Button, Icon } from 'semantic-ui-react'
import "./style.scss"


class SearchCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialIndex: 0,
            recipes: [],
            recipe: [],
            currIndex: 0,
            searchTerm: ""
        }
    }

    // componentDidMount
    componentDidMount() {
        console.log("SearchCarousel mounted");
    };

    // handleInputChange
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { value } = event.target;
        // Set the state for the appropriate input field
        this.setState({
            searchTerm: value,
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchRecipes();
    }

    searchRecipes = event => {
        API.searchRecipes(this.state.searchTerm)
            .then(res => {
                this.setState({
                    recipes: res.data,
                    recipe: res.data[0]
                })
            })
            .catch(err => console.log("ERR", err))
    }

    saveRecipe = recipe => {

        const {
            id,
            sourceUrl,
            img,
            title,
            servings,
            Ingredients,
            Instructions
        } = recipe;

        API.saveRecipe({
            id,
            sourceUrl,
            img,
            title,
            servings,
            Ingredients,
            Instructions
        })
        .then(res => {     
            const { id, _id } = res.data;
            API.logVersion({ id, _id })
            .then(res => console.log("Version logged!", res))
            .catch(err => console.log("Log Version ERRR", err))
        })
        .catch(err => console.log('errrrrrror', err));
    }

    nextRecipe = () => {
        const newIndex = this.state.currIndex + 1;
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

    render() {
        const { initialIndex, recipes, recipe, currIndex } = this.state;
        return (
            <div className="search-carousel-container">
            <Row>
                <Col size="col-12">
                    <form>
                        <Input
                            type="text"
                            required="true"
                            id="recipeTitle"
                            name="searchTerm"
                            placeholder="Keto Cupcakes"
                            onChange={this.handleInputChange}
                            value={this.state.searchTerm}
                        />
                        <FormBtn
                            disabled={!(this.state.searchTerm)}
                            onClick={this.handleFormSubmit}
                        >
                            Find Recipes!
                            </FormBtn>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col size="col-12">
                    <div className="carousel-search">
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

                        <div className="page">
                            <div className={`cards-slider active-slide-${recipe.id}`} id="search-card-slider">
                                <div className="cards-slider-wrapper" style={{ transform: `translateX(-${currIndex * (100 / recipes.length)}%)` }}>
                                    {
                                        recipes.map(recipe => <SearchCard 
                                            key={recipe.id}
                                            id={recipe.id} 
                                            recipe={recipe} 
                                            onClick={this.saveRecipe} 
                                            sourceUrl={recipe.sourceUrl}/>
                                            )
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
            </div>


        )
    }

}

export default SearchCarousel;