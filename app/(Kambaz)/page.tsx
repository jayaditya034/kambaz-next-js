// app/(Kambaz)/page.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Session from "./Account/Session";
import ProtectedRoute from "./Account/ProtectedRoute";
import Dashboard from "./Dashboard/page";

import type { RootState } from "./store";
import { setCourses, type Course } from "./Courses/[cid]/reducer";
import * as courseClient from "./Courses/client";

export default function KambazHome() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  useEffect(() => {
    const loadCourses = async () => {
      if (!currentUser) {
        // Not logged in -> no courses in Redux
        dispatch(setCourses([]));
        return;
      }

      try {
        // ✅ Per-user courses from the new enrollments-backed endpoint
        const serverCourses = await courseClient.findCoursesForEnrolledUser(
          "current"
        );

        // ✅ Always work with an array
        const list: Course[] = Array.isArray(serverCourses)
          ? (serverCourses as Course[])
          : [];

        // 🔹 De-duplicate by _id in case the server returns duplicates
        const byId = new Map<string, Course>();
        for (const c of list) {
          if (c && c._id) {
            byId.set(c._id, c);
          }
        }
        const uniqueCourses = Array.from(byId.values());

        dispatch(setCourses(uniqueCourses));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load courses:", err);
        dispatch(setCourses([]));
      }
    };

    void loadCourses();
  }, [currentUser, dispatch]);

  return (
    <Session>
      <div id="wd-kambaz">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    </Session>
  );
}
