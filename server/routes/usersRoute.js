import express from 'express';
import { multerUploads } from "../middlewares/multer.js";
import { uploadUserPicture } from "../controllers/usersController.js";

const router = express.Router();



router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);

// router.post("/signup", signUp);

export default router;