const router = require("express").Router();
const recipeRoutes = require("./recipes");
const userRoutes = require("./user");

// Recipe routes
router.use("/recipes", recipeRoutes);

// User route
router.use("/user", userRoutes);

module.exports = router;
