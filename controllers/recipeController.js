// controller only requires the models file to dictate how information is added and retrieved to/from the database
const db = require("../models");

// Here is where we define all the methods called in the routes/api/recipes.js file that required this file.

module.exports = {
    searchRecipes: function(req, res) {
        db.SeedRecipe.find()
        .map(function(doc) {
            const searchArr = [];
            for (var i = 0; i < doc.length; i++) {
                for (var j = 0; j < doc[i].Ingredients.length; j++) {
                    if (doc[i].title.search(req.params.search) >= 0 || doc[i].Ingredients[j].search(req.params.search) >= 0) {
                        searchArr.push(doc[i]);
                        break;
                        }
                }
            }
            
            return searchArr

        })

        .then(dbModel => {
            res.json(dbModel) 
        })
        .catch(err => res.status(422).json(err))
    },

    // the findAll method accepts a request and response.
    findSaved: function(req, res) {
        // use the Recipes model as defined in the ../models directory
        // eventually need to update find method to include all those recipes for the specified user. 
        db.Recipe.find({})
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
        db.Recipe.create(req.body)
                .then(dbModel => {
                    console.log("Recipe Saved!", dbModel)
                        res.json(dbModel)
                    })
                .catch(err => res.status(422).json(err));
    },

    remove: function(req, res) {
        db.Recipe.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    
    updateRecipe: function(req, res) {
        console.log("INSIDE UPDATE CONTROLLER")
       
    },

    // Each recipe copy will reference the original recipe's ObjectId. This route will locate all recipe copies with the reference to the selected req.params.id
    getVersions: function(req, res) {
        console.log("Inside getVersions Controller", req.params.id)
        db.Recipe.find({_id: req.params.id})
        .then(versions => {
            res.json(versions)
        })
        .catch(err => res.status(422).json(err))
    }
}



//// CHICKEN SCRATCH FOR POSSIBLE UPDATE ////
// db.Recipe.find({_id: req.body._id})
        // .map(function(doc) {
        //     for (var d = 0; d < doc.length; d++) {
        //         if (doc[d].extendedIngredients.Ingredients) {
        //             console.log(doc[d].extendedIngredients.Ingredients)
        //             // for (var i = 0; i < doc[d].extendedIngredients.Ingredients.length; i++) {
        //                 for (var j = 0; j < req.body.textInput.length; j++) {
        //                     db.Recipe.update({originalString: req.body.textInput[j]}
        //                         // $set: {
        //                         //     originalString: req.body.textInput[j]
        //                         // }
        //                     )
        //                     console.log("\nreq.body.textInput[j]",req.body.textInput[j])
                            
        //                 }
        //             }
        //         }
        // })
        // .then(dbUpdate => console.log("\n--------------\nDB UPDATE\n", dbUpdate))