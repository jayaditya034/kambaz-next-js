// app/(Kambaz)/page.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Session from "./Account/Session";
import ProtectedRoute from "./Account/ProtectedRoute";
import Dashboard from "./Dashboard/page";

import * as userClient from "./Account/client";
import type { RootState } from "./store";
import { setCourses, type Course } from "./Courses/[cid]/reducer";

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
        // 🔹 Per-user courses from the server
        const serverCourses = (await userClient.findMyCourses()) as Course[];

        // 🔹 De-duplicate by _id in case the server returns duplicates
        const byId = new Map<string, Course>();
        for (const c of serverCourses) {
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
