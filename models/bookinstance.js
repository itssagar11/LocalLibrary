const mongoose = require("mongoose");
const {DateTime}=require("luxon");
const Schema = mongoose.Schema;
const option={ toJSON: { virtuals: true } };
const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
},option);

BookInstanceSchema.virtual("url").get(function () {

  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_date_formatted").get(function(){
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
