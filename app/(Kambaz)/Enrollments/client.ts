// app/(Kambaz)/Enrollments/client.ts
import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_VITE_HTTP_SERVER ??
  process.env.VITE_HTTP_SERVER ??
  "http://localhost:4000";

const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

// Shape must match your server's enrollment objects
export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

// Use a dedicated axios instance so we always send cookies
const api = axios.create({
  baseURL: ENROLLMENTS_API,
  withCredentials: true,
});

// GET /api/enrollments  -> current user's enrollments
export const fetchMyEnrollments = async (): Promise<Enrollment[]> => {
  const { data } = await api.get("/");
  return data as Enrollment[];
};

// POST /api/enrollments  { course: courseId } -> new enrollment
export const enrollInCourse = async (courseId: string): Promise<Enrollment> => {
  const { data } = await api.post("/", { course: courseId });
  return data as Enrollment;
};

// DELETE /api/enrollments/:courseId
export const unenrollFromCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/${courseId}`);
};
