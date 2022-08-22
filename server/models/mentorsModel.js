import mongoose from "mongoose";

const { Schema } = mongoose;

const mentorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  language: { type: Array, required: true },
  experience: Number,
  website: String,
  fee: { type: Number, required: true },
  couching_medium: { type: Array, required: true },
  skills: { type: Array, required: true },
  about: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, default: "mentor" },
  likes: { type: Number, required: false },
  avatar_picture: { type: String, required: false },
  register_Date: { type: Date, default: Date.now },
});

const MentorsModel = mongoose.model("mentor", mentorSchema);
export default MentorsModel;
