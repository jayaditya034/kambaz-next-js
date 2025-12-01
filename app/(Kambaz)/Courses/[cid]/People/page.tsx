// app/(Kambaz)/Courses/[cid]/People/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PeopleTable from "./Table/page";
import type { User } from "../../../Account/reducer";
import * as courseClient from "../../client";

export default function CoursePeoplePage() {
  const params = useParams();
  const cidParam = (params as { cid?: string | string[] }).cid;

  const courseId =
    typeof cidParam === "string"
      ? cidParam
      : Array.isArray(cidParam)
      ? cidParam[0]
      : "";

  // 🔹 Debug log so we can see that this component is actually used
  // eslint-disable-next-line no-console
  console.log("CoursePeoplePage: render, courseId =", courseId);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!courseId) {
        // eslint-disable-next-line no-console
        console.warn("CoursePeoplePage: no courseId in URL");
        setUsers([]);
        return;
      }

      try {
        // eslint-disable-next-line no-console
        console.log(
          "CoursePeoplePage: loading users for courseId =",
          courseId
        );

        const enrolledUsers = await courseClient.findUsersForCourse(
          courseId
        );

        // eslint-disable-next-line no-console
        console.log(
          "CoursePeoplePage: server returned users =",
          enrolledUsers
        );

        setUsers(Array.isArray(enrolledUsers) ? enrolledUsers : []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          "CoursePeoplePage: failed to load users for course:",
          err
        );
        setUsers([]);
      }
    };

    void loadUsers();
  }, [courseId]);

  return <PeopleTable users={users} />;
}
