// this file is exported for use by the pages directory.
import axios from "axios";

export default {

  // Searches all seed data recipes
  searchRecipes: function(searchTerm) {
    return axios.get("/api/recipes/search/" + searchTerm);
  },
  // Gets all saved OriginalRecipes
  getSavedRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets all saved CopyRecipes and OriginalRecipes
  loadMostRecentlySavedVersion: function(_id) {
    return axios.get("/api/recipes/" + _id);
  },
  listAllVersions: function(id) {
    return axios.get('/api/recipes/listallversions/' + id)
  },
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database from front end "Get Inspired" different from saving updated version of an already saved recipe.
  saveRecipe: function(recipe) {
    return axios.post("/api/recipes", recipe)
  },
  saveVersion: function(version) {
    return axios.post("api/recipes/saveversion", version)
  },
  logVersion: function(version) {
    return axios.post("api/recipes/logversion", version)
  },
  // YouTube Search
  videoSearch: function(searchTerm) {
    return axios.get("/api/videos/" + searchTerm)
  },
  // Save comment
  saveComment: function(comment) {
    console.log("Inside API routes saveComment", comment);
    return axios.post("/api/recipes/savecomment", comment)
  },

  getComments: function(id) {
    console.log("Inside API routes getComments", id);
    return axios.get('/api/recipes/comments/' + id)
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