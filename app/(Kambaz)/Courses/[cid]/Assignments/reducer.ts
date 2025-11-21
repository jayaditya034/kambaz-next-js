// app/(Kambaz)/Courses/Assignments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // ✅ replace all assignments (from server)
    setAssignments: (state, { payload }: PayloadAction<Assignment[]>) => {
      state.assignments = payload;
    },
    // ✅ add one created assignment
    addAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments.push(payload);
    },
    // ✅ delete by id
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== payload
      );
    },
    // ✅ update one assignment
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
