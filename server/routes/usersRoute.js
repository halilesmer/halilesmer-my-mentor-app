import { signUp, uploadUserPicture } from "../controllers/usersController.js";

import express from 'express';
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();



router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);

export default router;