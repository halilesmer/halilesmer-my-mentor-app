import * as dotenv from 'dotenv';

import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 5001;

const connectMDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected on port ${port} `);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
export { connectMDB };
