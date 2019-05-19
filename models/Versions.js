const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VersionSchema = new Schema({
  recipeId: {
    type: String, 
    required: true 
  },
  mongoId: [
      {
        type: String,
        dateSaved: {
            type: Date,
            default: Date.now
        }
      }
    ]
});

const Version = mongoose.model("Version", VersionSchema);

module.exports = Version;
