import mongoose from "mongoose";

const { Schema } = mongoose;

const signInSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const signInModel = mongoose.model("signIn", signInSchema);
export default signInModel;
