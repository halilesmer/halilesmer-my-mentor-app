import * as dotenv from 'dotenv';

import cors from 'cors';
import express from "express";
import mentorsRoute from "./routes/mentorsRoute.js";
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());

app.use("/mentors", mentorsRoute);

// ---------- connect to mongo db ----------
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Connection to mongo db established!'))
.catch(error => console.log('error', error))

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port} port`);
});
