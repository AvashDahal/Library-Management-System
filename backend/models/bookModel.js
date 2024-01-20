import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    publishDate: {
      type: Date,
    },
    ISBN: {
      type: String,
      unique: true,
      trim: true,
    },
    noOfCopies: {
      type: Number,
      required: true,
      trim: true,
    },
    availableCopies: {
      type: Number,
      required: true,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },

  });
  export default mongoose.model("Book", bookSchema);