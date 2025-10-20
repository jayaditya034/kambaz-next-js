"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  const last = decodeURIComponent(pathname.split("/").pop() || "");

  // Map segment to a nice label exactly like the left nav
  const labelMap: Record<string, string> = {
    Home: "Home",
    Modules: "Modules",
    Piazza: "Piazza",
    Zoom: "Zoom",
    Assignments: "Assignments",
    Quizzes: "Quizzes",
    Grades: "Grades",
    People: "People",
    Table: "People", // if route ends in /People/Table
  };

  const rightLabel =
    labelMap[last] ??
    (last.charAt(0).toUpperCase() + last.slice(1).toLowerCase());

  return (
    <span>
      {course?.name} &gt; {rightLabel}
    </span>
  );
}
