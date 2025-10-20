"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../Database"; // from .../Courses/[cid]/People/Table

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId?: string;
  section?: string;
  role?: string;           // "STUDENT" | "TA" | "FACULTY"
  lastActivity?: string;   // e.g., "2025-10-04"
  totalActivity?: string;  // e.g., "10:21:32"
};

type Enrollment = {
  _id: string;
  user: string;    // User._id
  course: string;  // e.g., "CS5610"
};

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();

  const { users, enrollments } = db as unknown as {
    users: User[];
    enrollments: Enrollment[];
  };

  const usersInCourse = (users ?? []).filter((u) =>
    (enrollments ?? []).some((e) => e.user === u._id && e.course === cid)
  );

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {usersInCourse.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId ?? "-"}</td>
              <td className="wd-section">{user.section ?? "-"}</td>
              <td className="wd-role">{user.role ?? "STUDENT"}</td>
              <td className="wd-last-activity">{user.lastActivity ?? "-"}</td>
              <td className="wd-total-activity">{user.totalActivity ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
