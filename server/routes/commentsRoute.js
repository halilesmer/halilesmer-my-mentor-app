import { commentsController } from "../controllers/commentsController.js";
import express  from "express";
import { jwtAuth } from "../util/jwtAuth.js";

const router = express.Router();



router.post("/", jwtAuth, commentsController);

export default router;