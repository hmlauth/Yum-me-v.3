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
  extendedIngredients: {
    Ingredients: {
      type: Array
    },
    Toppings: {
      type: Array
    }
  },
  extendedInstructions: {
    Instructions: {
      type: Array
    },
    Topping: {
      type: Array
    }
  },
  dateSaved: { 
    type: Date, 
    default: Date.now 
  }
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
