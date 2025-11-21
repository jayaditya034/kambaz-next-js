// app/(Kambaz)/Courses/client.ts
import axios, { AxiosError } from "axios";
import type { Course } from "./[cid]/reducer";
import type { Module } from "./[cid]/Modules/reducer";


export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const COURSES_API = `${HTTP_SERVER}/api/courses`;

// This one doesn't *need* cookies, but it’s fine to leave it on
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// Fetch all courses
export const fetchAllCourses = async (): Promise<Course[]> => {
  const response = await axiosWithCredentials.get(COURSES_API);
  return response.data as Course[];
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
export const updateCourse = async (course: Course): Promise<Course> => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return response.data as Course;
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
