// controller only requires the models file to dictate how information is added and retrieved to/from the database
const db = require("../models");

// Here is where we define all the methods called in the routes/api/recipes.js file that required this file.

module.exports = {
    // This function finds all documents in SeedRecipe collection then returns only those documents with the searchTerm in the title or ingredient list of that document.
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

    // Currently locates all saved recipes regardless of user and returns found documents sort by most recently saved to oldest. Need to query using populate based on reference stored in User Model.
    findSaved: function(req, res) {
        console.log("\n*******************\n REQ.SESSION INFORMATION", req.session.passport.user)
        db.User.find({_id: req.session.passport.user})
        .populate('recipes')
        .sort({dateSaved: -1})
        .then(dbRecipe => console.log("\n********\tDBRECIPE per USER", dbRecipe))
        // db.Recipe.find({})
        //     .sort({dateSaved: -1})
        //     .then(dbModel => res.json(dbModel))
        .catch(err => {
            console.log(err);
            res.status(422).json(err)
        });
    }, 

    // This function first checks if User has saved the recipe.
    // If does exist, don't save. 
    // If doesn't exist, save. 
    // If saved, push _id of recipe to User.
    create: function(req, res) {
        console.log("\t******INSIDE CREATE CONTROLLER", req.session.passport.user)
        db.User.find({_id: req.session.passport.user})
        .then(dbUser => {
            console.log("DBUSER", dbUser[0].recipes)
            // check if references to recipes exist or not.
            // if not, then save recipe and push id reference
            if ( dbUser[0].recipes.length === 0) {
                    db.Recipe.create(req.body)
                    .then(dbRecipe => {
                        return db.User.updateOne({_id: req.session.passport.user},
                        {$push: {recipes: dbRecipe.id}
                        })
                    })
                    .then(result => console.log("RESULT", result))
                } else if (dbUser[0].recipes.length > 0) {
                    console.log("dbUser[0].recipes.length", dbUser[0].recipes.length)
                    for (var i = 0; i < dbUser[0].recipes.length; i++) {
                        console.log("REQ BODY ID", req.body.id);
                        console.log("dbUser[0].recipes[i]", dbUser[0].recipes[i])
                        if (req.body.id != dbUser[0].recipes[i]) {
                            console.log("dbUser[0].recipes[i]", dbUser[0].recipes[i])
                            db.Recipe.create(req.body)
                                .then(dbRecipe => {
                                    return db.User.updateOne({_id: req.session.passport.user},
                                    {$push: {recipes: dbRecipe.id}
                                    })
                        })
                        .then(result => console.log("RESULT", result))
                    } else {
                        console.log('Recipe with ' + req.body.id + " has already been saved!")
                    }
                }
            }
        })
        // db.Recipe.find({id: req.body.id})
        // .then(dbModel => {
        //     if (dbModel.length === 0) {
        //         db.Recipe.create(req.body)
        //         .then(dbModel => {
        //             console.log("Recipe Saved!", dbModel)
        //                 res.json(dbModel)
        //             })
        //     }
        // })
        // .catch(err => res.status(422).json(err));
    },

    remove: function(req, res) {
        db.Recipe.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    
    // From develop page, this function saves a copy of the recipe after updates have been made.
    saveVersion: function(req, res) {
        db.Recipe.create(req.body)
                .then(dbModel => {
                    console.log("\nRecipe Saved!\n", dbModel)
                    res.json(dbModel)
                    })
                .catch(err => res.status(422).json(err));
       
    },

    // Once the "copy" of the recipe has been saved in the database, we log the newly created _id in our Version Model organized by the "id" of that recipe. We use "id" not the title just in case the title is ever modified. 
    logVersion: function(req, res) {
        console.log("\n------\nINSIDE LOG VERSION CONTROLLER", req.body)
        db.Version.find({recipeId: req.body.id})
        .then(dbVersion => {
            console.log("\n------\ndbVersion", dbVersion)
            console.log("dbVersion", dbVersion.length)
            if (dbVersion.length === 0) {
                db.Version.create({
                    recipeId: req.body.id,
                    mongoId: req.body._id
                }).then(dbVersion => 
                    console.log("\nVersion created", dbVersion))
            } else if (dbVersion.length > 0) {
                db.Version.updateOne(
                    {recipeId: req.body.id},
                    {$push: {mongoId: req.body._id}
                }).then(dbVersion => {
                    console.log("\nVersion updated", dbVersion)
                })
            }
        })
    },

    // In process of loading most recently saved version of that particular recipe (identified by given id ('id'), not mongoid ('_id'))
    loadMostRecentlySavedVersion: function(req, res) {
        console.log("Inside loadMostRecentlySavedVersion Controller", req.params.id)
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