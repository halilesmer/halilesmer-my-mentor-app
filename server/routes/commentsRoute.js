import {
  editComment,
  getSpecificMentorsComments,
  postComments,
} from "../controllers/commentsController.js";

import express  from "express";
import { jwtAuth } from "../util/jwtAuth.js";

const router = express.Router();



router.post("/", jwtAuth, postComments);
router.post("/editComment", jwtAuth, editComment);
router.get("/getSpecificMentorsComments/:mentorsId", jwtAuth, getSpecificMentorsComments);

export default router;