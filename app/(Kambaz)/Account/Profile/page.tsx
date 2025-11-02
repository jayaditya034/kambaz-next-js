// app/(Kambaz)/Account/Profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setCurrentUser, type User } from "../reducer";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ get current user from Redux
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // ✅ local editable copy of the profile (per textbook)
  const [profile, setProfile] = useState<User | null>(null);

  // ✅ on mount / when user changes: redirect if none, otherwise load form
  useEffect(() => {
    if (!currentUser) {
      router.replace("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, router]);

  // ✅ sign out: clear user and navigate to Signin
  const signout = () => {
    dispatch(setCurrentUser(null));
    router.replace("/Account/Signin");
  };

  // While redirecting or not signed in, render nothing
  if (!profile) return null;

  return (
    <div id="wd-profile-screen" style={{ maxWidth: 420 }}>
      <h3>Profile</h3>

      <Form>
        <Form.Control
          id="wd-username"
          className="mb-2"
          placeholder="username"
          value={profile.username}
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
        />

        <Form.Control
          id="wd-password"
          className="mb-2"
          placeholder="password"
          type="password"
          value={profile.password}
          onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })
          }
        />

        <Form.Control
          id="wd-firstname"
          className="mb-2"
          placeholder="First Name"
          value={profile.firstName ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />

        <Form.Control
          id="wd-lastname"
          className="mb-2"
          placeholder="Last Name"
          value={profile.lastName ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
        />

        <Row className="mb-2">
          <Col>
            <Form.Control
              id="wd-dob"
              type="date"
              value={profile.dob ?? ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </Col>
        </Row>

        <Form.Control
          id="wd-email"
          className="mb-2"
          type="email"
          placeholder="email"
          value={profile.email ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />

        <Form.Select
          id="wd-role"
          className="mb-2 wd-role"
          value={profile.role ?? "USER"}
          onChange={(e) =>
            setProfile({
              ...profile,
              role: e.target.value as NonNullable<User["role"]>,
            })
          }
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>

        <Button
          id="wd-signout-btn"
          className="w-100 mb-2"
          variant="danger"
          onClick={signout}
        >
          Sign out
        </Button>
      </Form>
    </div>
  );
}
