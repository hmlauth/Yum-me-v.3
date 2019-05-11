const router = require("express").Router();
const recipeRoutes = require("./recipes");
const userRoutes = require("./user");
const videoRoutes = require("./videos");

// Recipe routes
router.use("/recipes", recipeRoutes);

// User route
router.use("/user", userRoutes);

// Vido route
router.use("/videos", videoRoutes);

module.exports = router;
