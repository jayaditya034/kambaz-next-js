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

export type DetailedUser = User & {
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
};

export type NewDbUser = Omit<DetailedUser, "_id">;


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

export const updateUser = async (
  user: DetailedUser
): Promise<DetailedUser> => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data as DetailedUser;
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

export const findAllUsers = async (): Promise<User[]> => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data as User[];
};

export const findUserById = async (id: string): Promise<DetailedUser> => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data as DetailedUser;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

export const createUser = async (user: NewDbUser): Promise<DetailedUser> => {
  const response = await axiosWithCredentials.post(USERS_API, user);
  return response.data as DetailedUser;
};


/**
 * 6.2.6.3 – filter users by role (client)
 */
export const findUsersByRole = async (role: string): Promise<User[]> => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}?role=${encodeURIComponent(role)}`
  );
  return response.data as User[];
};

/**
 * 6.2.6.3 – filter users by partial first/last name (client)
 */
export const findUsersByPartialName = async (
  name: string
): Promise<User[]> => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}?name=${encodeURIComponent(name)}`
  );
  return response.data as User[];
};
