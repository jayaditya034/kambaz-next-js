"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import type { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import * as db from "./Database";
import { Provider } from "react-redux";
import store from "./store";


// ---- Types shared across Kambaz pages ----
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

type KambazState = {
  courses: Course[];
  course: Course;
  setCourse: Dispatch<SetStateAction<Course>>;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
};

// ---- Context + hook ----
const KambazContext = createContext<KambazState | null>(null);

export function useKambaz() {
  const ctx = useContext(KambazContext);
  if (!ctx) throw new Error("useKambaz must be used within (Kambaz)/layout.tsx");
  return ctx;
}

// ---- Layout with lifted state (textbook 4.4.1/4.4.2) ----
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Courses are lifted to the parent (layout) and shared via context
  const [courses, setCourses] = useState<Course[]>(
    db.courses as unknown as Course[]
  );

  // The "course being edited" (same shape used by Dashboard form)
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "CS0000.00000",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Course Description",
  });

  // Textbook CRUD handlers
  const addNewCourse = () => {
    const newCourse: Course = {
      ...course,
      _id: String(Date.now()), // simple unique id (no extra deps)
      image: course.image ?? "/images/react.js.png",
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses((prev) =>
      prev.map((c) => (c._id === course._id ? { ...course } : c))
    );
  };

  const value = useMemo<KambazState>(
    () => ({
      courses,
      course,
      setCourse,
      addNewCourse,
      deleteCourse,
      updateCourse,
    }),
    [courses, course]
  );

  return (
  <div id="wd-kambaz">
    <div className="d-flex">
      <div>
        <KambazNavigation />
      </div>
      <div className="wd-main-content-offset p-3 flex-fill">
        <Provider store={store}>
          <KambazContext.Provider value={value}>
            {children}
          </KambazContext.Provider>
        </Provider>
      </div>
    </div>
  </div>
);
}
