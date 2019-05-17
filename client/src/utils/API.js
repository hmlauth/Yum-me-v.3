// this file is exported for use by the pages directory.
import axios from "axios";

export default {

  // Saves user 
  saveUser: function(userId) {
    console.log("Inside API route saveUser", userId)
  },

  // Searches all seed data recipes
  searchRecipes: function(searchTerm) {
    return axios.get("/api/recipes/" + searchTerm);
  },

  // Gets all saved OriginalRecipes
  getSavedRecipes: function() {
    return axios.get("/api/recipes");
  },

  // Gets all saved CopyRecipes and OriginalRecipes
  getVersions: function(id) {
    console.log("Inside getVersion route", id)
    return axios.get("/api/recipes/" + id);
  },

  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },

  // Saves a recipe to the database from front end "Get Inspired" different from saving updated version of an already saved recipe.
  saveRecipe: function(recipe) {
    return axios.post("/api/recipes", recipe)
  },

  // YouTube Search
  videoSearch: function(searchTerm) {
    return axios.get("/api/videos/" + searchTerm)
  }
  // copyRecipe: function() {
  //   console.log("Inside API routes copyRecipe");
  //   return axios.post("/api/recipes/")
  // },

  // saveComment: function() {
  //   console.log("Inside API routes saveComment");
  //   return axios.post("/api/recipes/")
  // }

};