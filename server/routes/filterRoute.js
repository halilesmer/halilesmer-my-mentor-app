import express from "express";
import {
 filterGender,
} from "../controllers/filterController.js";
import { jwtAuth } from "../util/jwtAuth.js";

const router = express.Router();



router.get("/filterGender/:gender/:fee", jwtAuth, filterGender);
export default router;



// router.post("/signup", signUp);
// router.post("/signin", mentorsSignIn);
// router.get("/allmentors",allMentors);
// router.get("/mentorsprofile", jwtAuth, getMentorsProfile);
// router.post("/editmentor", jwtAuth, editMentor);
// router.get("/getonementor/:mentorId", jwtAuth, getSpecificMentorData);
// router.post("/delete-account", jwtAuth, deleteAccount);
// router.post("/getonementor", jwtAuth, getSpecificMentorData);


