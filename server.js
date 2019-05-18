require("dotenv").config();
const express = require("express");

const parser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(parser())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// --------Database configuration with Mongoose------------
// Connect to the Mongo DB - 'yummev3'
var databaseUri = 'mongodb://localhost/yummev3';

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseUri)
}
// --------End database configuration with Mongoose------------


app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API"
  });
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!` + process.env.REACT_APP_AUTH0_AUDIENCE);
});
