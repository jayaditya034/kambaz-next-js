// app/(Kambaz)/Courses/client.ts
import axios, { AxiosError } from "axios";
import type { Course } from "./[cid]/reducer";
import type { Module } from "./[cid]/Modules/reducer";
import type { User } from "../Account/reducer";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// This one doesn't *need* cookies, but it’s fine to leave it on
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// Fetch all courses
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get<Course[]>(COURSES_API);
  return data;
};

// Delete one course by id, swallow 401 just in case
export const deleteCourse = async (id: string): Promise<void> => {
  try {
    await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  } catch (err) {
    const error = err as AxiosError;
    if (error.response && error.response.status === 401) {
      // Not authorized to delete – just ignore on client
      // (server behavior is still correct)
      return;
    }
    throw err;
  }
};

// Update an existing course on the server
export const updateCourse = async (course: Course): Promise<void> => {
  await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
};

// ✅ NEW: enroll current user (or given user) into a course
export const enrollIntoCourse = async (
  userId: string,
  courseId: string
): Promise<unknown> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data as unknown;
};

// ✅ NEW: unenroll current user (or given user) from a course
export const unenrollFromCourse = async (
  userId: string,
  courseId: string
): Promise<unknown> => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data as unknown;
};

// ✅ NEW: get *courses* the user is enrolled in
export const findCoursesForEnrolledUser = async (
  userId: string
): Promise<Course[]> => {
  const response = await axiosWithCredentials.get<Course[]>(
    `${USERS_API}/${userId}/courses`
  );
  return response.data;
};

// ✅ Already added earlier: get users in a course
export const findUsersForCourse = async (
  courseId: string
): Promise<User[]> => {
  const response = await axiosWithCredentials.get<User[]>(
    `${COURSES_API}/${courseId}/users`
  );
  return response.data;
};

// ✅ NEW: create a module on the server for a given course
export const createModuleForCourse = async (
  courseId: string,
  moduleData: { name: string; course?: string }
): Promise<Module> => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    moduleData
  );
  return response.data as Module;
};

// Fetch modules for a given course
export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return response.data as Module[];
};

// Delete a module for a given course
export const deleteModule = async (
  courseId: string,
  moduleId: string
): Promise<void> => {
  await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
};

// Update a module for a given course
export const updateModule = async (
  courseId: string,
  module: Module
): Promise<Module> => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return response.data as Module;
};
