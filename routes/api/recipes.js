const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");
const API_KEY = process.env.API_KEY

// Matches "/api/recipes" 
router.route("/")
    .get(recipeController.findSaved)
    .post(recipeController.create)

router.route("/saveversion")
    .post(recipeController.saveVersion)

router.route("/logversion")
    .post(recipeController.logVersion)

// Matches "/api/recipes"
router.route("/search/:search")
    .get(recipeController.searchRecipes)


// Matches "/api/recipes"
router.route("/:id")
    .delete(recipeController.remove)
    .get(recipeController.getVersions)



// finally we need to export all of this information so that the information is sent back through the calling channels. If we did not have this export, all information retrieved through these controller methods would be stuck, not broadcast back out.
module.exports = router;