import type { ReactNode } from "react";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const { cid } = params;

  return (
    <div id="wd-courses">
      <h2 className="text-danger">Course {cid}</h2>
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
