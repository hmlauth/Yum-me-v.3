// import axios from "axios";
// import cheerio from "cheerio";
import $ from "jquery";
import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import Header from "../Header";
import { SearchCard, ResultsCard } from "../Card";
import { Input, FormBtn } from "../Form";
import { List, ListItem } from "../List";
import { SaveBtn, ViewBtn } from "../../components/Buttons"


class Search extends Component {

  // state
  state = {
    recipes: [],
    searchTerm: "",

  };

  // componentDidMount
  componentDidMount() {
    console.log("Mounted");
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
    console.log('searchterm', this.state.searchTerm)
    const corsURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'https://www.food2fork.com/api/search?key=f4f40279aca7dd14a4df19d4902cae70&q='

    $.ajax({
      url: corsURL + apiURL + this.state.searchTerm,
      method: 'GET'
    }).then(JSONresponse => {
      var response = JSON.parse(JSONresponse);
      this.setState({
        recipes: response.recipes
      })
      console.log("Recipe State", this.state.recipes)
    }
    )
  }

  saveRecipe = recipe => {
  
    console.log("...saving recipe", recipe);
    console.log('API:', API)
    const { recipe_id, title, image_url, source_url, publisher, publisher_url, social_rank } = recipe

      API.saveRecipe({
        recipe_id,
        title,
        image_url,
        source_url,
        publisher,
        publisher_url,
        social_rank
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
                  {this.state.recipes.map(recipe => (
                    <ListItem
                      key={recipe.recipe_id}
                      img={recipe.image_url}
                      title={recipe.title}>
                      <SaveBtn 
                      recipe={recipe}
                      onClick={this.saveRecipe}/>
                      <ViewBtn link={recipe.source_url} />
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
