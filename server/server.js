import * as dotenv from "dotenv";

import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import { connectMDB } from "./util/connectMDB.js";
import cors from "cors";
import express from "express";
import mentorsRoute from "./routes/mentorsRoute.js";

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
// mongoDbConnection();

const loadRoutes = () => {
  // app.use("/api/users", usersRoute);
  // app.use("/api/users", mentorsRoute);
  app.use("/api/mentors", mentorsRoute);
};

(function controller() {
  addMiddelWare();
  startServer();
  connectMDB();
  loadRoutes();
})();
