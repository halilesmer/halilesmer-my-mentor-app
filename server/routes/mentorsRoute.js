import {
  allMentors,
  editMentor,
  getMentorsProfile,
  getSpecificMentorData,
  mentorsSignIn,
  signUp,
  uploadUserPicture,
} from "../controllers/mentorsController.js";

import express from "express";
import { jwtAuth } from "../util/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);


// router.post("/signup", signUp);
router.route("/signup").post(signUp);
router.post("/signin", mentorsSignIn);
router.get("/allmentors",allMentors);
router.get("/mentorsprofile", jwtAuth, getMentorsProfile);
router.post("/editmentor", jwtAuth, editMentor);
// router.get("/getonementor/:mentorId", jwtAuth, getSpecificMentorData);
router.post("/getonementor", jwtAuth, getSpecificMentorData);

;
export default router;
