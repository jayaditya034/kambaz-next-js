// app/(Kambaz)/Enrollments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = { _id: string; user: string; course: string };

type State = {
  enrollments: Enrollment[];
};

const initialState: State = {
  // We now let the server be the source of truth and load this via axios
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Replace the whole list from the server
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },

    // Local helper to add one enrollment (after server succeeds)
    enroll: (
      state,
      {
        payload,
      }: PayloadAction<{ user: string; course: string; _id?: string }>
    ) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        const newEnrollment: Enrollment = {
          _id:
            payload._id ??
            (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
          user: payload.user,
          course: payload.course,
        };
        state.enrollments.push(newEnrollment);
      }
    },

    // Local helper to remove one enrollment (after server succeeds)
    unenroll: (
      state,
      { payload }: PayloadAction<{ user: string; course: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
