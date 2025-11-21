// app/(Kambaz)/Account/client.ts
import axios, { AxiosError } from "axios";
import type { User } from "./reducer";
import type { Course } from "../Courses/[cid]/reducer";

// Global default: always send cookies
axios.defaults.withCredentials = true;

// Base URLs
export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const USERS_API = `${HTTP_SERVER}/api/users`;

// Axios instance that ALWAYS sends cookies
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// Types
export type Credentials = {
  username: string;
  password: string;
};

export type NewUser = {
  username: string;
  password: string;
};

// --- API functions ---

export const signin = async (
  credentials: Credentials
): Promise<User | null> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data as User | null;
};

// ✅ Swallow 401 and just return null
export const profile = async (): Promise<User | null> => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data as User | null;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response && error.response.status === 401) {
      return null;
    }
    throw err;
  }
};

export const signup = async (user: NewUser): Promise<User> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return response.data as User;
};

export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data as User;
};

// ✅ Strongly typed, no `any`
export const findMyCourses = async (): Promise<Course[]> => {
  try {
    const response = await axiosWithCredentials.get(
      `${USERS_API}/current/courses`
    );
    return response.data as Course[];
  } catch (err) {
    const error = err as AxiosError;
    if (error.response && error.response.status === 401) {
      // Not signed in -> no courses
      return [];
    }
    throw err;
  }
};

// ✅ createCourse as in the book (no `any`)
export const createCourse = async (course: Course): Promise<Course> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return response.data as Course;
};
