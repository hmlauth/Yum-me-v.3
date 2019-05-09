import $ from "jquery";
import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import Header from "../Header";
import { SearchCard, ResultsCard } from "../Card";
import { Input, FormBtn } from "../Form";
import { List, ListItem } from "../List";
import { SaveBtn, ViewBtn } from "../../components/Buttons";
import hannasAPI from "../../utils/recipes";
console.log("hannasAPI", hannasAPI);


class Search extends Component {

  // state
  state = {
    recipes: [],
    searchTerm: "",

  };

  // componentDidMount
  componentDidMount() {
    if (this.state.recipes.length === 0) {
      this.searchRecipes();
    }
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
    hannasAPI.map(i => {
      // add logic here to query data before pushing
        this.state.recipes.push(i);
        console.log("RECIPE STATE", this.state.recipes);
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
    return (
      <Container fluid>
      <Row>
          <Col size="md-6">
            <Header />
          </Col>
        </Row>
      <Row>
        <Col size="md-3">

        </Col>
        <Col size="md-9">
        <Row>
          <Col size="lg-10 md-6 sm-12">
            <SearchCard>
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
            </SearchCard>
          </Col>
        </Row>
        <Row>
          <Col size="lg-10 md-6 sm-12">
            <ResultsCard>
              {this.state.recipes.length ? (
                <List>
                  {this.state.recipes.map(i => (
                    <ListItem
                      key={i.id}
                      img={i.img}
                      title={i.title}>
                      <SaveBtn 
                      recipe={i}
                      onClick={this.saveRecipe}/>
                      <ViewBtn link={i.sourceUrl} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h4>No results to display</h4>
                )}
            </ResultsCard>
          </Col>
        </Row>
        </Col>
      </Row>
        
      </Container>
    );
  }
}

export default Search;
