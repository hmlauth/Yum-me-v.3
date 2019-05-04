// controller only requires the models file to dictate how information is added and retrieved to/from the database
const db = require("../models");

// Here is where we define all the methods called in the routes/api/recipes.js file that required this file.
console.log("in controller file")
console.log('Recipe Model', db.Recipe.create())

module.exports = {
    // the findAll method accepts a request and response.
    findAll: function(req, res) {
        console.log("Inside controller findAll");
        // use the Recipes model as defined in the ../models directory
        db.Recipe.find()
            // run mongoose method .find utilizing the req.query to retrieve all appropriate entries
            // return all documents and send it to front end in json
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err)
            });
    }, 
    create: function(req, res) {
        console.log("Inside controller create", req.body);
        db.Recipe.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
    remove: function(req, res) {
        console.log("Inside controller delete", req.params.id);
        db.Recipe.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}