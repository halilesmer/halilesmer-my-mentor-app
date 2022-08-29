import mongoose from "mongoose";

const { Schema } = mongoose;

const likesSchema = new Schema({
  likes: { type: Array, required: true },
});

const likesModel = mongoose.model("likes", likesSchema);
export default likesModel;
