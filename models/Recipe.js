const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

module.exports = mongoose.model("Recipe", recipeSchema)
