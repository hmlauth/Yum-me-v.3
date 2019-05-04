// this file is exported for use by the pages directory.

import axios from "axios";

export default {
  // Gets all recipes
  getSavedRecipes: function() {
    console.log("Inside API route getSavedRecipes")
    return axios.get("/api/recipes");
  },
//   // Gets the recipe with the given id
//   getRecipe: function(id) {
//     return axios.get("/api/recipes/" + id);
//   },
//   // Deletes the recipe with the given id
  deleteRecipe: function(id) {
    console.log("id", id)
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeTitle) {
    return axios.post("/api/recipes", recipeTitle);
  }
};