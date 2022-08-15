import express from "express";
import { mentorsController } from "../controller/mentorsController.js";
const router = express.Router();

router.get("/mentors", mentorsController);

export default router;
