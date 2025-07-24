import { Request, Response } from "express";
import { getCourses } from "../services/courses.services";

export async function listCourses(req: Request, res: Response) {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cursos" });
  }
}
