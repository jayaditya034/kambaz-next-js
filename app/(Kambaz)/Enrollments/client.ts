// app/(Kambaz)/Enrollments/client.ts
import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({ withCredentials: true });

const USERS_API = `${HTTP_SERVER}/api/users`;

export const enrollInCourse = async (courseId: string): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`);
};

export const unenrollFromCourse = async (courseId: string): Promise<void> => {
  await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`
  );
};

export const fetchMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};
