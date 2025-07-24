import { openDb } from "../db/database";

export async function getCourses() {
  const db = await openDb();
  const courses = await db.all("SELECT * FROM courses");
  return courses;
}
