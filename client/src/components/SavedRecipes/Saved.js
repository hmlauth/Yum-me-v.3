import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container"

class Saved extends Component {

    // state
    state = {
      recipes: [],
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
  }

//   deleteRecipe = id => {
//     console.log("...deleting recipe", id);

//       API.deleteRecipe(id)
//         .then(res => this.loadSavedRecipes())
//         .catch(err => console.log(err));
//     }
    
  render() {
    const items = this.state.recipes.map( recipe => 
        <p>{recipe.title}</p>     
    )

    return (
      <Container fluid>
        {items}  
      </Container>
    );

  }
}

export default Saved;
