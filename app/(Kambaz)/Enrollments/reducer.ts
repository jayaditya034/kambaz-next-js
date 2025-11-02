// app/(Kambaz)/Enrollments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database";

export type Enrollment = { _id: string; user: string; course: string };

type State = {
  enrollments: Enrollment[];
};

const initialState: State = {
  enrollments: (db.enrollments as unknown) as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }: PayloadAction<{ user: string; course: string }>) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        state.enrollments.push({
          _id: (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
          user: payload.user,
          course: payload.course,
        });
      }
    },
    unenroll: (state, { payload }: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
