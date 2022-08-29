import {
  getLikes,
} from "../controllers/likesController.js";

import express from "express";
import { jwtAuth } from "../util/jwtAuth.js";


const router = express.Router();


router.get("/signup", getLikes);

export default router;
