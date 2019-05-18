const router = require("express").Router();
const recipeRoutes = require("./recipes");
const userRoutes = require("./userRoutes");
const videoRoutes = require("./videos");

// Recipe routes
router.use("/recipes", recipeRoutes);

// User route
router.use("/users", userRoutes);

// Video route
router.use("/videos", videoRoutes);

module.exports = router;
