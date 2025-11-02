// app/(Kambaz)/Courses/Assignments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database"; // relative to (Kambaz)/Courses/Assignments/

export type Assignment = {
  _id: string;
  title: string;
  course: string;          // course id (cid)
  description?: string;
  points?: number;
  due?: string;            // free-form display text
  availableFrom?: string;  // free-form
  available?: string;      // short banner if you use it
};

export type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: (db as { assignments: Assignment[] }).assignments as Assignment[],
};

type AddPayload = Omit<Assignment, "_id"> & { _id?: string };
type UpdatePayload = Assignment;

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<AddPayload>) => {
      const _id = payload._id ?? crypto.randomUUID();
      state.assignments.push({ ...payload, _id });
    },
    deleteAssignment: (state, { payload }: PayloadAction<{ _id: string }>) => {
      state.assignments = state.assignments.filter(a => a._id !== payload._id);
    },
    updateAssignment: (state, { payload }: PayloadAction<UpdatePayload>) => {
      state.assignments = state.assignments.map(a =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
