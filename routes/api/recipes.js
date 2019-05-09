const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

console.log("inside recipes get and post routes");

// Matches "/api/recipes" 
router.route("/")
    .get(recipeController.findAll)
    .post(recipeController.create);

router.route("/:id")
    .delete(recipeController.remove);
//     .get(recipesController.findById)
//     .put(recipesController.update)


// finally we need to export all of this information so that the information is sent back through the calling channels. If we did not have this export, all information retrieved through these controller methods would be stuck, not broadcast back out.
module.exports = router;