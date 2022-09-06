import {
  deleteOneComment,
  editComment,
  getAllComments,
  getSpecificMentorsComments,
  postComments,
} from "../controllers/commentsController.js";

import express  from "express";
import { jwtAuth } from "../util/jwtAuth.js";

const router = express.Router();



router.post("/", jwtAuth, postComments);
router.post("/editComment", jwtAuth, editComment);
router.get("/getAllComments", jwtAuth, getAllComments);
// router.get("/getSpecificMentorsComments/:mentorsId", jwtAuth, getSpecificMentorsComments);
router.get(
  "/getSpecificMentorsComments/:mentorsId",
  getSpecificMentorsComments
);

router.put("/delete-one-comment", jwtAuth, deleteOneComment);


export default router;