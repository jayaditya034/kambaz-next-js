// app/(Kambaz)/Courses/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../Database"; // relative to (Kambaz)/Courses/

export type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
  department?: string;
  credits?: number;
  image?: string;
};

export type CoursesState = {
  courses: Course[];
};

const initialState: CoursesState = {
  // seed from Database JSON
  courses: (db.courses as unknown) as Course[],
};

type AddPayload = Omit<Course, "_id"> & { _id?: string };
type UpdatePayload = Course;

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload }: PayloadAction<AddPayload>) => {
      const _id = payload._id ?? (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
      state.courses.push({ ...payload, _id });
    },
    deleteCourse: (state, { payload }: PayloadAction<{ _id: string }>) => {
      state.courses = state.courses.filter((c) => c._id !== payload._id);
    },
    updateCourse: (state, { payload }: PayloadAction<UpdatePayload>) => {
      state.courses = state.courses.map((c) => (c._id === payload._id ? { ...c, ...payload } : c));
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
