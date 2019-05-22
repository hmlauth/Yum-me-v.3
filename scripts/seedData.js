var mongoose = require('mongoose');
var data = require("../client/src/utils/recipes")
// Connect to the Mongo DB - 'recipeScraper'
var databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/yummedb';
mongoose.connect(databaseUri);

var db = require('../models');

// add clear data base functionality first. 

db.SeedRecipe.collection.insert(data, function(err, res) {
    console.log("ERR", err);
    console.log("Res", res);
})

// where user Id is NULL, these are searchable
// this recipe belongs to this user
// for each user's saved recipes  