// this file is exported for use by the pages directory.
import axios from "axios";

export default {

  // Saves user 
  saveUser: function(userId) {
    console.log("Inside API route saveUser", userId)
  },

  // Searches all seed data recipes
  searchRecipes: function(searchTerm) {
    console.log("SEARCH TERM", searchTerm)
    return axios.get("/api/recipes/search/" + searchTerm);
  },
  // Gets all saved OriginalRecipes
  getSavedRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets all saved CopyRecipes and OriginalRecipes
  loadMostRecentlySavedVersion: function(id) {
    console.log("Inside loadMostRecentlySavedVersion route", id)
    return axios.get("/api/recipes/" + id);
  },
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database from front end "Get Inspired" different from saving updated version of an already saved recipe.
  saveRecipe: function(recipe) {
    console.log("RECIPE", recipe)
    return axios.post("/api/recipes", recipe)
  },
  saveVersion: function(version) {
    console.log("version", version)
    return axios.post("api/recipes/saveversion", version)
  },
  logVersion: function(version) {
    console.log("Version Route", version);
    return axios.post("api/recipes/logversion", version)
  },
  // YouTube Search
  videoSearch: function(searchTerm) {
    return axios.get("/api/videos/" + searchTerm)
  },
  // saveComment: function() {
  //   console.log("Inside API routes saveComment");
  //   return axios.post("/api/recipes/")
  // }

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