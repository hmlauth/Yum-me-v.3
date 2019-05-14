import $ from "jquery";
import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import Header from "../Header";
import { ResultsCard } from "../Card";
import { Input, FormBtn } from "../Form";
import { List, ListItem } from "../List";
import { SaveBtn, ViewBtn } from "../../components/Buttons";
// import hannasAPI from "../../utils/recipes";
// console.log("hannasAPI", hannasAPI);


class Search extends Component {

  // state
  state = {
    recipes: [],
    searchTerm: "",
    showItems: 3
  };

  // componentDidMount
  componentDidMount() {
    console.log("Mounted", this.state.recipes);
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
    console.log('SEARCH TERM', this.state.searchTerm)

    API.searchRecipes(this.state.searchTerm)
      .then(res => {
        console.log('res', res.data);
            this.setState({
              recipes: res.data
            });
        })
        .catch(err => {
          console.log("ERR", err)
        })
  
  }

  saveRecipe = recipe => {
  
    console.log("...saving recipe", recipe);
    const { 
      id, 
      sourceUrl, 
      img, 
      title, 
      servings, 
      extendedIngredients, 
      extendedInstructions 
    } = recipe

      API.saveRecipe({
        id,
        sourceUrl,
        img,
        title,
        servings,
        extendedIngredients,
        extendedInstructions
      })
        .then(res => console.log('Recipe Saved!', res))
        .catch(err => console.log('errrrrrror', err));
    }
    
  render() {
    const recipes = this.state.recipes.slice(0, this.state.showItems).map(
      (recipe) => <List>
                <ListItem 
                  key={recipe.id}
                  img={recipe.img}
                      title={recipe.title}>
                      <SaveBtn 
                      recipe={recipe}
                      onClick={this.saveRecipe}/>
                      <ViewBtn link={recipe.sourceUrl} />
                  </ListItem>
              </List>
    )

    return (
      <Container fluid>
      <Row>
          <Col size="lg-10 md-6 sm-12">
            <ResultsCard>
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
              {this.state.recipes.length ? (
                {recipes}
              ) : (
                  <h5>No results to display</h5>
                )}
            </ResultsCard>
          </Col>
      </Row> 
      </Container>
    );
  }
}

export default Search;
