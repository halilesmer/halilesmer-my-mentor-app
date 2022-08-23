import {
  allMentors,
  getProfile,
  mentorsSignIn,
  signUp,
  uploadUserPicture,
} from "../controllers/mentorsController.js";

import express from "express";
import { jwtAuth } from "../util/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/signin", mentorsSignIn);
router.get("/allmentors", allMentors);
router.get("/mentorsprofile", jwtAuth, getProfile);

export default router;
