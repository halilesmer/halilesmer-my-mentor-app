import * as dotenv from "dotenv";

import cors from "cors";
import express from "express";
import mentorsRoute from "./routes/mentorsRoute.js";
import mongoose from "mongoose";
const port = process.env.PORT || 5071;


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
};

const startServer = () => {
  app.listen(port, (req, res) => {
    console.log(`Server is running on ${port} port`);
  });
};

// ---------- connect to mongo db ----------
const mongoDbConnection =  () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connection to mongo db established!"))
    .catch((error) => console.log("error", error));
};
// mongoDbConnection();

const loadRoutes = () => {
  // app.use("/api/users", mentorsRoute);
  app.use("/api/users", mentorsRoute);
};

(function controller(){
    addMiddelWare();
    startServer();
    mongoDbConnection();
    loadRoutes();
})()