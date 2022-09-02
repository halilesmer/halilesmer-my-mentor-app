import mongoose from "mongoose";

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    first_name: { type: String, require: true, trim: true },
    last_name: { type: String, require: true, trim: true },
    menteeId: { type: String, require: true, trim: true },
    mentorId: { type: String, require: true, trim: true },
    commentText: { type: String, require: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const CommentsModel = mongoose.model("comments", commentsSchema);

export default CommentsModel;
