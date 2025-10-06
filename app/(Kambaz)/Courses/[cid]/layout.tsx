// app/(Kambaz)/Courses/[cid]/layout.tsx
import type { ReactNode } from "react";
import CourseNavigation from "./Navigation";

type Props = {
  children: ReactNode;
  params: Promise<{ cid: string }>; // 👈 params is a Promise in your setup
};

export default async function CoursesLayout({ children, params }: Props) {
  const { cid } = await params;

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
