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

        .then(searchResults => {
            res.json(searchResults) 
        })
        .catch(err => res.status(422).json(err))
    },

    // Currently locates all saved recipes regardless of user and returns found documents sort by most recently saved to oldest. Need to query using populate based on reference stored in User Model.
    getSavedRecipes: function(req, res) {
        // Find User
        db.User.findOne({_id: req.session.passport.user})
        // Specific that we want to populate the retrieved User with any associated recipes
        .populate({path: 'version', populate: {path: 'recipeMongoId'}})
        .then(dbUser => {
            let dbUserLength = dbUser.version.length;
            let newDbUser = [];
            let idCheck = [];
            // most recent data stored at end of array. Iterate backwards over array and push only those with unique "id"
            for (let i = dbUserLength - 1; i >= 0; --i) {
            let recipe = dbUser.version[i];
                if (newDbUser.length === 0) {
                    idCheck.push(recipe.recipeId)
                    newDbUser.push(recipe.recipeMongoId.slice(-1)[0])
                } else {
                    for (let j = 0; j < idCheck.length; j++) {
                        if (idCheck.includes(recipe.recipeId) === false) {
                            idCheck.push(recipe.recipeId)
                            newDbUser.push(recipe.recipeMongoId.slice(-1)[0])
                        }
                    }
                }
            }
            res.json(newDbUser)
        })
        .catch(err => console.log("Version ERRR", err))
    }, 

    // This function first checks if User has saved the recipe.
    // If recipe(id) does exist, don't save. 
    // If recipe(id) doesn't exist, save. 
    // If saved, push recipe(id) to User.recipe (reference). The recipe(_id) is also pushed for population of saved recipes.
    // NOTE: This function only applies for the first time save from 'seedDate Collection' into 'Recipe Collection'.
    create: function(req, res) {
        db.User.find({_id: req.session.passport.user})
        .then(dbUser => {
            // check if references to recipes exist or not.
            // if not, then save recipe and push id reference
            if (dbUser[0].recipeId.length === 0) {
                // Create recipe in database
                    db.Recipe.create(req.body)
                    // Then also, push the recipe(id) to User
                    .then(dbRecipe => {
                        
                        res.json(dbRecipe) // send created recipe back up to front end
                        return db.User.updateOne(
                            {_id: req.session.passport.user},
                            {$push: {recipeId: dbRecipe.id}}
                        )
                    })
                    .then(dbRecipe => {
                        // res.json(dbRecipe)
                    })
                } else if (dbUser[0].recipeId.length > 0) {
                    for (var i = 0; i < dbUser[0].recipeId.length; i++) {
                        if (req.body.id != dbUser[0].recipeId[i]) {
                            db.Recipe.create(req.body)
                                .then(dbRecipe => {
                                    res.json(dbRecipe)
                                    return db.User.updateOne(
                                        {_id: req.session.passport.user},
                                        {$push: {recipeId: dbRecipe.id}}
                                    )
                        })
                        .then(dbRecipe => {
                            res.json(dbRecipe)
                        })
                    } else {
                        console.log('Recipe with ' + req.body.id + " has already been saved!")
                    }
                }
            }
        })
    },

    // Delete from database (not functional yet)
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
        // Create new Version 
        db.Version.find({recipeId: req.body.id})
        .then(dbVersion => {
            console.log(dbVersion)
            // Create version if it hasn't been created already (identified by recipe 'id')
            if (dbVersion.length === 0 ) {
                db.Version.create({
                    recipeId: req.body.id,
                    recipeMongoId: req.body._id
                })
                .then(dbVersion => {
                    console.log("Version CREATED", dbVersion)
                    res.json(dbVersion)
                    return db.User.updateOne(
                        {_id: req.session.passport.user},
                        {$push: {version: dbVersion._id}}
                    )
                })
                .then(res => console.log(res))
            // Else, update the existing version model with the new recipe's _id (given by mongo)
            } else if (dbVersion.length > 0) {
                db.Version.updateOne(
                    {recipeId: req.body.id},
                    {$push: {recipeMongoId: req.body._id}}
                )
                .then(dbVersion => {
                    console.log("Version UPDATED", dbVersion); 
                    res.json(dbVersion)
                    }
                )
            }
        })
    },

    // Loads the most recently saved version to the develop page to be editted
    loadMostRecentlySavedVersion: function(req, res) {
        db.Recipe.find({_id: req.params.id})
        .then(dbRecipe => {
            res.json(dbRecipe)
        })
        .catch(err => res.status(422).json(err))
    },

    // From develop page, this function provides the information to list out versions in chronogical order
    listAllVersions: function(req, res) {

        // Find User
        db.User.findOne({_id: req.session.passport.user})
        // Specific that we want to populate the retrieved User with any associated recipes
        .populate({path: 'version', populate: {path: 'recipeMongoId'}})
        .then(dbUser => {
            var allVersions = [];
            for (let i = 0; i < dbUser.version.length; i++) {
                let recipe = dbUser.version[i];
                if (recipe.recipeId === req.params.id) {
                    console.log(recipe.recipeMongoId.length)
                    for (let i = recipe.recipeMongoId.length - 1; i >= 0 ; --i) {
                        allVersions.push(recipe.recipeMongoId[i])
                    }
                    
                }
            }
            res.json(allVersions)
        })
    }
}
