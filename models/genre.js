const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GerneSchema = new Schema({
  name: { type: String, required: true,minLength:3,maxLength:100 },
  
});
GerneSchema.virtual("url").get(function () {
  return `/catalog/gerne/${this._id}`;
});
module.exports = mongoose.model("Genre", GerneSchema);
