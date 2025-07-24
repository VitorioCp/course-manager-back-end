import { Request, Response } from "express";
import {
  createCourse,
  getCourses,
  deleteCourse,
} from "../services/courses.services";

export async function listCourses(req: Request, res: Response) {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cursos" });
  }
}

export async function createCourses(req: Request, res: Response) {
  try {
    const courseData = req.body;

    if (
      !courseData.titulo ||
      !courseData.desc ||
      !courseData.horas ||
      !courseData.img ||
      !courseData.status
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const newCourse = await createCourse(courseData);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    res.status(500).json({ error: "Erro ao criar curso" });
  }
}

export async function deleteCourses(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const changes = await deleteCourse(Number(id));
    if (changes === 0) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar curso" });
  }
}
