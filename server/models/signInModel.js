import mongoose from "mongoose";

const { Schema } = mongoose;

const signInSchema = new Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const signInModel = mongoose.model("signIn", signInSchema);
export default signInModel;
