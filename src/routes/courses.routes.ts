import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { listCourses, createCourses, deleteCourses, updateCourses } from "../controllers/courses.controller";

const router = express.Router();

router.get("/", authenticateToken, listCourses);
router.post("/", authenticateToken, createCourses)
router.put("/:id", authenticateToken, updateCourses)
router.delete("/:id", authenticateToken, deleteCourses);

export default router;
