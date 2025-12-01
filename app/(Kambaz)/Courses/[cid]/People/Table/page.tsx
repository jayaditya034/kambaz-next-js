// app/(Kambaz)/Courses/[cid]/People/Table/page.tsx
"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import PeopleDetails from "../Details";
import type { DetailedUser } from "../../../../Account/client";

type PeopleUser = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
};

type PeopleTableProps = {
  users?: PeopleUser[];
  onUserDeleted?: (userId: string) => void;
  onUserUpdated?: (user: DetailedUser) => void;
};

export default function PeopleTable({
  users = [],
  onUserDeleted,
  onUserUpdated,
}: PeopleTableProps) {

    console.log("PeopleTable: received users prop =", users);

  const displayUsers = users.filter(
    (u) => u.firstName && u.lastName
  );

  return (
    <div id="wd-people-table">
      {/* slide-out details drawer */}
      <PeopleDetails
        onUserDeleted={onUserDeleted}
        onUserUpdated={onUserUpdated}
      />

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
          {displayUsers.map((user) => {
            const key =
              user._id ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`;

            return (
              <tr key={key}>
                <td className="wd-full-name text-nowrap">
                  <Link
                    href={
                      user._id
                        ? `/Account/Users?uid=${user._id}`
                        : "/Account/Users"
                    }
                    className="text-decoration-none"
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                </td>
                <td className="wd-login-id">{user.loginId ?? "-"}</td>
                <td className="wd-section">{user.section ?? "-"}</td>
                <td className="wd-role">{user.role ?? "USER"}</td>
                <td className="wd-last-activity">
                  {user.lastActivity ?? "-"}
                </td>
                <td className="wd-total-activity">
                  {user.totalActivity ?? "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
