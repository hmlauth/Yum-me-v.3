const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipe_id: {
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  image_url: { 
    type: String, 
    required: true 
  },
  source_url: {
    type: String,
    required: true,
  },
  social_rank: {
    type: Number,
    required: true
  },
  publisher: String,
  publisher_url: String,
  dateSaved: { 
    type: Date, 
    default: Date.now 
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;