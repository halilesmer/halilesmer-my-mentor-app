import express  from "express";
import { jwtAuth } from "../util/jwtAuth.js";
import { postComments } from "../controllers/commentsController.js";

const router = express.Router();



router.post("/", jwtAuth, postComments);

export default router;