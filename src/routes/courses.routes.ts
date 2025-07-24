import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { listCourses, createCourses, deleteCourses } from "../controllers/courses.controller";

const router = express.Router();

router.get("/", authenticateToken, listCourses);
router.post("/", authenticateToken, createCourses)
router.delete("/:id", authenticateToken, deleteCourses);

export default router;
