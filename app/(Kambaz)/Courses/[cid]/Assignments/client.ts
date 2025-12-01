// app/(Kambaz)/Courses/Assignments/client.ts
import axios from "axios";
import type { Assignment } from "./reducer";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (
  courseId: string
): Promise<Assignment[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );

  // Normalize the id field so `_id` is always present and a string
  const raw = data as unknown as Array<Record<string, unknown>>;

  return raw.map((a) => ({
    ...a,
    _id: String(a._id ?? a.id ?? a.assignmentId ?? ""),
  })) as Assignment[];
};


export const findAssignmentById = async (
  assignmentId: string
): Promise<Assignment> => {
  const { data } = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data as Assignment;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data as Assignment;
};

export const deleteAssignmentOnServer = async (
  assignmentId: string
): Promise<void> => {
  await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

export const updateAssignmentOnServer = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data as Assignment;
};
