import express from "express";
import {
 filterMentors,
} from "../controllers/filterController.js";
import { jwtAuth } from "../util/jwtAuth.js";

const router = express.Router();



router.post("/filter-mentors", filterMentors);
// router.get("/filterMentors/:gender/:fee", filterMentors);

export default router;






