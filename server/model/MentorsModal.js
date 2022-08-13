import mongoose from "mongoose";

const { Schema } = mongoose;

const mentorSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true },
  pw: { type: String, required: true },
  gender: { type: Array, required: true },
  language: { type: Array, required: true },
  experience: Number,
  website: String,
  couching_medium: { type: Array, required: true },
  fee: { type: String, required: true },
  skills: { type: Array, required: true },
  likes: {type: Number, required: true},
});


const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;