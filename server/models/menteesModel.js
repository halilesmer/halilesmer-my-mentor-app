import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const menteesSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: false },
    language: { type: Array, required: false },
    couching_medium: { type: Array, required: false },
    skills: { type: Array, required: true },
    about: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // validate: [validator.isEmail, "Valid email is required"],
    },
    password: {
      type: String,
      required: [true, "Password are is required"],
      minLength: [4, "At least 4 charactars please."],
      trim: true,
    },
    user_type: { type: String, default: "mentee" },
    likes: { type: Array, required: false },

    avatar_picture: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const MenteesModel = mongoose.model("mentee", menteesSchema);
export default MenteesModel;

/* 
 first_name: { type: String, required: [true, "First name are is required"] },
    last_name: { type: String, required: [true, "Last name are is required"] },
    birthday: { type: Date, required: [true, "Birthday are is required"] },
    gender: { type: String, required: false },
    language: { type: Array, required: false },
    couching_medium: { type: Array, required: false },
    skills: { type: Array, required: [true, "Email area is required"] },
    about: { type: String, required: false },
    email: {
      type: String,
      required: [true, "Email area is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Valid email is required"],
    },
    password: {
      type: String,
      required: [true, "Password are is required"],
      minLength: [4, 'At least 4 charactars please.']
    },
    user_type: { type: String, default: "mentor" },
    likes: { type: Array, required: false },
    avatar_picture: { type: String, required: false },
  },
  {
    timestamps: true,
  }
   */
