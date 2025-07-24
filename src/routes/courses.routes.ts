import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { listCourses } from "../controllers/courses.controller";

const router = express.Router();

router.get("/", authenticateToken, listCourses);

export default router;
