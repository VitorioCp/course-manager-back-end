import prisma from "../db/prisma";
import { CourseCreateData, CourseUpdateData } from "../types/course";



export async function getCourses() {
  return prisma.courses.findMany();
}

export async function getCoursesPublic() {
  return prisma.courses.findMany({
    where: {
      status: 'ativo'
    }
  });
}

export async function createCourse(course: CourseCreateData) {
  return prisma.courses.create({
    data: course
  });
}

export async function deleteCourse(id: number) {
  return prisma.courses.delete({
    where: { id }
  });
}

export async function updateCourseById(id: number, data: CourseUpdateData) {
  const updateData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  ) as CourseUpdateData;

  return prisma.courses.update({
    where: { id },
    data: updateData
  });
}