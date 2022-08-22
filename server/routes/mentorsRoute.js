import {
  allMentors,
  mentorsSignIn,
  signUp,
  uploadUserPicture,
} from "../controllers/mentorsController.js";

import express from "express";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/signin", mentorsSignIn);
router.get("/allmentors", allMentors);

export default router;
