// app/(Kambaz)/Courses/[cid]/layout.tsx
import type { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaBars } from "react-icons/fa"; // 👈 use fa, not fa6

type Props = {
  children: ReactNode;
  params: Promise<{ cid: string }>; // 👈 params is a Promise in your setup
};

export default async function CoursesLayout({ children, params }: Props) {
  const { cid } = await params;

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
  <span aria-hidden="true" className="me-3">
    <FaBars className="fs-4 mb-1" />
  </span>
  <span>Course {cid}</span>
</h2>
      <hr />
      <div className="d-flex">
        {/* Sidebar: hidden on < md */}
        <div className="d-none d-md-block me-3" style={{ minWidth: 220 }}>
          <CourseNavigation />
        </div>

        {/* Main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
