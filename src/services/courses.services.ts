import { openDb } from "../db/database";

interface CourseUpdateData {
  titulo?: string;
  desc?: string;
  horas?: number;
  img?: string;
  status?: string;
}

export async function getCourses() {
  const db = await openDb();
  const courses = await db.all("SELECT * FROM courses");
  return courses;
}

export async function createCourse(course: {
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: string;
}) {
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

export async function updateCourseById(id: string, data: CourseUpdateData) {
  const db = await openDb();

  const keys = Object.keys(data).filter(
    (key) => data[key as keyof CourseUpdateData] !== undefined
  );

  if (keys.length === 0) return null;

  const fields = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => data[key as keyof CourseUpdateData]);
  values.push(id);

  const query = `UPDATE courses SET ${fields} WHERE id = ?`;
  const result = await db.run(query, values);

  if (result.changes === 0) return null;

  const updatedCourse = await db.get("SELECT * FROM courses WHERE id = ?", id);
  return updatedCourse;
}
