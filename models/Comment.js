const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: String,
    dateSaved: { 
        type: Date, 
        default: Date.now 
      }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
