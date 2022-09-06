import {
  deleteAccount,
  getMenteesProfile,
  menteesSignIn,
  signUp,
  uploadUserPicture,
} from "../controllers/menteesController.js";

import express from "express";
import { jwtAuth } from "../util/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";
import { postLikes, } from "../controllers/likesController.js";

const router = express.Router();

router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/signin", menteesSignIn);

router.get("/menteesprofile", jwtAuth, getMenteesProfile);
router.post("/postLikes", jwtAuth, postLikes, );
router.post("/delete-account", jwtAuth, deleteAccount);

export default router;
