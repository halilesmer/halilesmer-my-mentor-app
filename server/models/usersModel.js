import mongoose from "mongoose";

const { Schema } = mongoose;

const mentorSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  language: { type: Array, required: true },
  experience: Number,
  website: String,
  fee: { type: String, required: true },
  couching_medium: { type: Array, required: true },
  skills: { type: Array, required: true },
  email: { type: String, required: true },
  pw: { type: String, required: true },
  likes: { type: Number, required: true },
  photo: { type: String, required: false },
  registerDate: {type: Date, required: false, default: Date.now},
});

const UserModel = mongoose.model("user", mentorSchema);
export default UserModel;
