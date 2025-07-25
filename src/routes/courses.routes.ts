import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  listCourses,
  createCourses,
  deleteCourses,
  updateCourses,
  publicListCourses,
} from "../controllers/courses.controller";

const router = express.Router();

router.get("/", authenticateToken, listCourses);
router.get("/public", publicListCourses);
router.post("/", authenticateToken, createCourses);
router.put("/:id", authenticateToken, updateCourses);
router.delete("/:id", authenticateToken, deleteCourses);

export default router;
