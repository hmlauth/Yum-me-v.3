// controller only requires the models file to dictate how information is added and retrieved to/from the database
const db = require("../models");

// Here is where we define all the methods called in the routes/api/recipes.js file that required this file.

module.exports = {
    searchRecipes: function(req, res) {
        console.log("Inside controller search", req.params.search);
        db.Recipe.find({user: null})
        .map(function(doc) {
            const searchArr = [];
            for (var i = 0; i < doc.length; i++) {
                for (var j = 0; j < doc[i].extendedIngredients.Ingredients.length; j++) {
                    if (doc[i].extendedIngredients.Ingredients[j].name.search(req.params.search) >= 0) {
                        searchArr.push(doc[i]);
                        break;
                        }
                }
            }
            
            return searchArr

        })

        .then(dbModel => {
            console.log("Inside Controller RES", dbModel);
            res.json(dbModel) 
        })
        .catch(err => res.status(422).json(err))
    },
    // the findAll method accepts a request and response.
    findSaved: function(req, res) {
        console.log("Inside controller findAll");
        // use the Recipes model as defined in the ../models directory
        // eventually need to update find method to include all those recipes for the specified user. 
        db.Recipe.find()
            .sort({dateSaved: -1})
            // run mongoose method .find utilizing the req.query to retrieve all appropriate entries
            // return all documents and send it to front end in json
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err)
            });
    }, 
    create: function(req, res) {
        db.Recipe.find({$and : [ {id: req.body.id}, {user: {$ne: null}} ]})
            .then(dbModel => {
                if (dbModel.length === 0) {
                    db.Recipe.create(req.body)
                    .then(dbModel => {
                        res.json(dbModel)
                    })
                } 
            })
            .catch(err => res.status(422).json(err));
        },
    remove: function(req, res) {
        db.Recipe.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}

// Chicken Scratch for future check if recipe has been saved yet. 
// console.log("PARAMS", req.params.id);
// db.Recipe.find({_id: req.params.id}, (err, res) => {
//     console.log("Inside find _id", req.params.id);
//     if (err) {
//         console.log("ERR", err)
//     } 

//     if (res) {
//         console.log("This recipe has already been saved", res)
//     } else {