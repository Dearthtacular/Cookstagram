const mongoose = require("mongoose");

// One a user has many recipes 
// A recipe belongs to a User
const recipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ingredients: String,
  instructions: String,
  photoUrl: String,
  title: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);