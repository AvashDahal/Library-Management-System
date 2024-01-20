import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Book",
  },
  issueDate: {
    type: Date,
    required: true,
    trim: true,
  },
  returnDate: {
    type: Date,
    required: true,
    trim: true,
  },
  returnStatus: {
    type: String,
    required: true,
    trim: true,
    default: "Pending",
  },
  fine: {
    type : Number,
    required: true,
    default: 0,
  }
});
export default mongoose.model("Transaction", transactionSchema);