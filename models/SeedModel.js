const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeedRecipeSchema = new Schema({
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
  user: String
});

const SeedRecipe = mongoose.model("SeedRecipe", SeedRecipeSchema);

module.exports = SeedRecipe;
