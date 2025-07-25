"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = getCourses;
exports.getCoursesPublic = getCoursesPublic;
exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.updateCourseById = updateCourseById;
const prisma_1 = __importDefault(require("../db/prisma"));
function getCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.default.courses.findMany();
    });
}
function getCoursesPublic() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.default.courses.findMany({
            where: {
                status: 'ativo'
            }
        });
    });
}
function createCourse(course) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.default.courses.create({
            data: course
        });
    });
}
function deleteCourse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.default.courses.delete({
            where: { id }
        });
    });
}
function updateCourseById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
        return prisma_1.default.courses.update({
            where: { id },
            data: updateData
        });
    });
}
