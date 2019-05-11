var mongoose = require('mongoose');
var data = require("../client/src/utils/recipes")
// Connect to the Mongo DB - 'recipeScraper'
var databaseUri = 'mongodb://localhost/yummev3';
mongoose.connect(databaseUri);

var db = require('../models');

// add clear data base functionality first. 

db.Recipe.collection.insert(data, function(err, res) {
    console.log("ERR", err);
    console.log("Res", res);
})

// where user Id is NULL, these are searchable
// this recipe belongs to this user
// for each user's saved recipes  