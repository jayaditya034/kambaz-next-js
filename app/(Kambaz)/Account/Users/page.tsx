"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import type { User } from "../reducer";
import type { DetailedUser, NewDbUser } from "../client";
import * as client from "../client";
import PeopleTable from "../../Courses/[cid]/People/Table/page";


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

    const handleCreateUser = async () => {
    const newUserPayload: NewDbUser = {
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      loginId: undefined,
      lastActivity: undefined,
      totalActivity: undefined,
    };

    const createdUser = await client.createUser(newUserPayload);
    setUsers((prev) => [...prev, createdUser]);
  };


  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      const filtered = await client.findUsersByRole(selectedRole);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (partialName: string) => {
    setName(partialName);
    if (partialName) {
      const filtered = await client.findUsersByPartialName(partialName);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  // When a user is deleted from the drawer, remove from local state
  const handleUserDeleted = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  // 🔁 NEW: when a user is updated from the drawer, update them in local state
  const handleUserUpdated = (updated: DetailedUser) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === updated._id ? { ...u, ...updated } : u
      )
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>

            <button
        onClick={handleCreateUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <div className="d-flex mb-3">
        <FormControl
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name"
        />
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      <PeopleTable
        users={users}
        onUserDeleted={handleUserDeleted}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
}
