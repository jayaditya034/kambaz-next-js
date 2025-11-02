// app/(Kambaz)/Courses/[cid]/layout.tsx
"use client";

import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useParams, useRouter } from "next/navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses as dbCourses } from "../../Database";
import Breadcrumb from "./Breadcrumb";
import { useEffect, useMemo } from "react";

type Props = { children: ReactNode };

export default function CoursesLayout({ children }: Props) {
  const router = useRouter();
  const { cid } = useParams<{ cid: string }>();

  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { enrollments } = useSelector((s: RootState) => s.enrollmentsReducer);

  const course = useMemo(
    () => dbCourses.find((c: { _id: string }) => c._id === cid),
    [cid]
  );

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isEnrolled =
    !!currentUser &&
    enrollments.some((e) => e.user === currentUser._id && e.course === cid);

  useEffect(() => {
    if (!currentUser) return; // Account flow handles redirect to Signin
    if (!isFaculty && !isEnrolled) {
      router.replace("/Dashboard");
    }
  }, [currentUser, isFaculty, isEnrolled, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        <span aria-hidden="true" className="me-3">
          <FaAlignJustify className="fs-4 mb-1" />
        </span>
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-3" style={{ minWidth: 220 }}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
