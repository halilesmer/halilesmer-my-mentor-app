import mongoose from "mongoose";

const { Schema } = mongoose;

const mentorSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true, trim: true, lowercase: false },
    language: { type: Array, required: true },
    experience: { type: Number },
    website: { type: String, trim: true },
    fee: { type: Number, required: true },
    couching_medium: { type: Array, required: true },
    skills: { type: Array, required: true },
    about: { type: String, required: false, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    user_type: { type: String, default: "mentor" },
    likes: { type: Array, required: false },
    avatar_picture: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const MentorsModel = mongoose.model("mentor", mentorSchema);
export default MentorsModel;
