// app/(Kambaz)/Enrollments/client.ts
import axios from "axios";

const HTTP_SERVER =
  process.env.VITE_HTTP_SERVER ||
  process.env.NEXT_PUBLIC_HTTP_SERVER ||
  "http://localhost:4000";

const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// ------------------------------------------------------
// MY ENROLLMENTS FOR A GIVEN USER (uses /api/users/:uid/enrollments)
// ------------------------------------------------------
export const fetchMyEnrollments = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return response.data;
};

// ------------------------------------------------------
// ENROLL / UNENROLL (these still use /api/enrollments/:cid)
// ------------------------------------------------------
export const enrollInCourse = async (courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};
