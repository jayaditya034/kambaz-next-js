import { redirect } from "next/navigation";

export default function CoursesPage({ params }: { params: { cid: string } }) {
  const { cid } = params;
  redirect(`/Courses/${cid}/Home`);
  return null; // ensure it’s a valid React component
}
