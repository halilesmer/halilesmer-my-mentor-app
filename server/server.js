import * as dotenv from "dotenv";

import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import cors from "cors";
import express from "express";
import mentorsRoute from "./routes/mentorsRoute.js";
// import mentorsRoute from "./routes/mentorsRoute.js";
import mongoose from "mongoose";

const port = process.env.PORT || 5001;

const app = express();
dotenv.config();

const addMiddelWare = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
};

const startServer = () => {
  app.listen(port, (req, res) => {
    console.log(`Server is running on ${port} port`);
  });
};

// ---------- connect to mongo db ----------
const mongoDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected on port ${port} `);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
// mongoDbConnection();

const loadRoutes = () => {
  // app.use("/api/users", mentorsRoute);
  // app.use("/api/users", mentorsRoute);
  app.use("/api/users/mentors", mentorsRoute);
};

(function controller() {
  addMiddelWare();
  startServer();
  mongoDbConnection();
  loadRoutes();
})();
