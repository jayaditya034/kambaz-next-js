"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { FaUserCircle, FaPen, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import * as client from "../../../Account/client";
import type { DetailedUser } from "../../../Account/client";

type PeopleDetailsProps = {
  onUserDeleted?: (userId: string) => void;
  onUserUpdated?: (user: DetailedUser) => void;
};

export default function PeopleDetails({
  onUserDeleted,
  onUserUpdated,
}: PeopleDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  const [user, setUser] = useState<DetailedUser | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<DetailedUser["role"]>(undefined);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) {
        setUser(null);
        return;
      }
      const fetched = await client.findUserById(uid);
      setUser(fetched);

      const fullName = `${fetched.firstName ?? ""} ${
        fetched.lastName ?? ""
      }`.trim();
      setName(fullName);
      setEmail(fetched.email ?? "");
      setRole(fetched.role);
    };

    fetchUser();
  }, [uid]);

  const handleClose = () => {
    setEditing(false);
    router.push("/Account/Users");
  };

  const handleDelete = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    if (onUserDeleted) {
      onUserDeleted(uid);
    }
    handleClose();
  };

  const saveUser = async () => {
    if (!uid || !user) return;

    const trimmed = name.trim();
    let firstName = user.firstName ?? "";
    let lastName = user.lastName ?? "";

    if (trimmed.length > 0) {
      const parts = trimmed.split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    const updatedUser: DetailedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };

    const saved = await client.updateUser(updatedUser);
    setUser(saved);
    setEditing(false);

    if (onUserUpdated) {
      onUserUpdated(saved);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void saveUser();
    }
  };

  if (!uid || !user) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={handleClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>

      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <>
            <FaPen
              onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 me-2 wd-edit"
              role="button"
            />
            <div onClick={() => setEditing(true)}>{name || "Unnamed user"}</div>
          </>
        )}

        {editing && (
          <>
            <FaCheck
              onClick={saveUser}
              className="float-end fs-5 mt-2 me-2 wd-save"
              role="button"
            />
            <FormControl
              className="w-50 wd-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameKeyDown}
            />
          </>
        )}
      </div>

      <hr />

      <b>Roles:</b>{" "}
      {editing ? (
        <select
          className="form-select d-inline-block w-auto ms-2"
          value={role ?? ""}
          onChange={(e) =>
            setRole(e.target.value as DetailedUser["role"])
          }
        >
          <option value="STUDENT">STUDENT</option>
          <option value="TA">TA</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      ) : (
        <span className="wd-roles ms-2">{user.role}</span>
      )}
      <br />

      <b>Email:</b>{" "}
      {editing ? (
        <FormControl
          type="email"
          className="d-inline-block w-75 ms-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <span className="wd-email ms-2">{user.email ?? "-"}</span>
      )}
      <br />

      <b>Login ID:</b>{" "}
      <span className="wd-login-id">{user.loginId ?? "-"}</span> <br />
      <b>Section:</b>{" "}
      <span className="wd-section">{user.section ?? "-"}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">
        {user.totalActivity ?? "-"}
      </span>

      <hr />
      <button
        onClick={handleDelete}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={handleClose}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
