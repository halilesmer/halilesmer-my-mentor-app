import * as dotenv from "dotenv";

import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import commentsRoute from "./api/commentsRoute.js";
import { connectMDB } from "./util/connectMDB.js";
import cors from "cors";
import express from "express";
import filterRoute from "./api/filterRoute.js";
import menteesRoute from "./api/menteesRoute.js";
import mentorsRoute from "./api/mentorsRoute.js";
import passport from "passport";
import { passportConfig } from "./config/passport.js";

const port = process.env.PORT || 5001;

const app = express();
dotenv.config();
app.use(express.json({extended: false}));

const addMiddelWare = () => {
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);

  // Vercel
// app.use(express.static(path.join("./client/build")));
// app.use(express.static(path.join(__dirname, "./client/build")));

};

// Vercel
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });


const startServer = () => {
};

// ---------- connect to mongo db ----------
// mongoDbConnection();

const loadRoutes = () => {
  // app.use("/api/users", usersRoute);
  // app.use("/api/users", mentorsRoute);
  app.use("/api/mentors", mentorsRoute);
  app.use("/api/mentees", menteesRoute);
  app.use('/api/comments', commentsRoute)
  app.use("/api/filter", filterRoute);
};

(function controller() {
  addMiddelWare();
  startServer();
  connectMDB();
  loadRoutes();
})();

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port} port`);
});
export default app