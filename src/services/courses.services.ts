import { openDb } from "../db/database";

export async function getCourses() {
  const db = await openDb();
  const courses = await db.all("SELECT * FROM courses");
  return courses;
}

export async function createCourse(course: { titulo: string; desc: string; horas: number; img: string; status: string; }) {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO courses (titulo, desc, horas, img, status) VALUES (?, ?, ?, ?, ?)`,
    [course.titulo, course.desc, course.horas, course.img, course.status]
  );
  return {
    id: result.lastID,
    ...course,
  };
}

export async function deleteCourse(id: number) {
  const db = await openDb();
  const result = await db.run("DELETE FROM courses WHERE id = ?", [id]);
  return result.changes; 
}