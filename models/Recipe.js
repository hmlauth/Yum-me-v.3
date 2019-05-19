const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  id: {
    type: String, 
    required: true 
  },
  sourceUrl: {
    type: String,
    required: true,
  },
  img: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  servings: String,
    Ingredients: {
      type: Array
    },
    Instructions: {
      type: Array
    },
  dateSaved: { 
    type: Date, 
    default: Date.now 
  }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
