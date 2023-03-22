const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const option={ toJSON: { virtuals: true } };
const GerneSchema = new Schema({
  name: { type: String, required: true,minLength:3,maxLength:100 },
  
},option);
GerneSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});
module.exports = mongoose.model("Genre", GerneSchema);
