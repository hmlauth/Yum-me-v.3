const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VersionSchema = new Schema({
  recipeId: {
    type: String, 
    required: true 
  },
  // Every ObjectId given to all versions of the recipe from 1st - nth save
  recipeMongoId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe"
      }
    ],
  commentId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Version = mongoose.model("Version", VersionSchema);

module.exports = Version;
