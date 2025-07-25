import { Request, Response } from "express";
import {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourseById,
  getCoursesPublic,
} from "../services/courses.services";
import { PrismaError } from "../types/course";



export async function listCourses(req: Request, res: Response) {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar cursos:", error.message);
    }
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
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const newCourse = await createCourse(courseData);
    res.status(201).json(newCourse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao criar curso:", error.message);
      
      const prismaError = error as PrismaError;
      if (prismaError.code === 'P2002') {
        return res.status(409).json({ error: "Curso já existe" });
      }
    }
    res.status(500).json({ error: "Erro ao criar curso" });
  }
}

export async function deleteCourses(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteCourse(Number(id));
    res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      const prismaError = error as PrismaError;
      
      if (prismaError.code === 'P2025') {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
      
      console.error("Erro ao deletar o curso:", error.message);
    }
    res.status(500).json({ error: "Erro ao deletar curso" });
  }
}

export async function updateCourses(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID do curso não fornecido" });
  }
  
  try {
    const updatedCourse = await updateCourseById(Number(id), updateData);
    res.json(updatedCourse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const prismaError = error as PrismaError;
      
      if (prismaError.code === 'P2025') {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
      
      console.error("Erro ao atualizar o curso:", error.message);
    }
    res.status(500).json({ error: "Erro ao atualizar o curso" });
  }
}

export async function publicListCourses(req: Request, res: Response) {
  try {
    const courses = await getCoursesPublic();
    res.json(courses);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar cursos públicos:", error.message);
    }
    res.status(500).json({ error: "Erro ao buscar cursos" });
  }
}