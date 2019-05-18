// this file is exported for use by the pages directory.
import axios from "axios";

export default {

  saveUser: function(userId) {
    console.log("Inside API route saveUser", userId)
  },
  searchRecipes: function(searchTerm) {
    console.log("Inside API route searchRecipes", searchTerm);
    return axios.get("/api/recipes/" + searchTerm);
  },
  // Gets all recipes
  getSavedRecipes: function() {
    console.log("Inside API route getSavedRecipes")
    return axios.get("/api/recipes");
  },

  deleteRecipe: function(id) {
    console.log("id", id)
    return axios.delete("/api/recipes/" + id);
  },

  // Saves a recipe to the database from front end "Get Inspired" different from saving updated version of an already saved recipe.
  saveRecipe: function(recipe) {
    console.log("Inside API route saveRecipe", recipe)
    return axios.post("/api/recipes", recipe)
  },

  // YouTube Search
  videoSearch: function(searchTerm) {
    console.log("Inside API route YTSearch", searchTerm);
    return axios.get("/api/videos/" + searchTerm)
  },

    // logs in user
    login: function(loginInfo) {
      return axios.post("/api/users/login", loginInfo);
    },
  
    // signs up user, then logs them in
    signup: function(signupInfo) {
      return axios.post("/api/users/signup", signupInfo);
    },
  
    // checks to see if user is logged in, then returns the user
    isLoggedIn: function() {
      return axios.get("/api/users/profile");
    },
  
    // checks to see if the user is logged in and and admin, then returns the user
    isAdmin: function() {
      return axios.get("/api/users/logout")
    },
  
    // logs out the user
    logout: function() {
      return axios.get("/api/users/logout")
    },
};